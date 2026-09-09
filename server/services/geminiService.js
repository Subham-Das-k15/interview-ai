import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  getFallbackQuestions,
  fallbackEvaluateAnswers,
  fallbackAnalyzeResume,
} from './fallbackAiService.js';

// Helper to strip markdown code fences and parse JSON safely
const extractJSON = (text) => {
  if (!text) return null;
  try {
    // Direct parse
    return JSON.parse(text);
  } catch (err) {
    // Attempt markdown json extraction
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch (innerErr) {
        console.warn('Failed to parse matched JSON block:', innerErr.message);
      }
    }
    // Attempt finding first [ or {
    const firstBracket = text.indexOf('[');
    const firstBrace = text.indexOf('{');
    let startIdx = -1;
    let endIdx = -1;

    if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
      startIdx = firstBracket;
      endIdx = text.lastIndexOf(']');
    } else if (firstBrace !== -1) {
      startIdx = firstBrace;
      endIdx = text.lastIndexOf('}');
    }

    if (startIdx !== -1 && endIdx > startIdx) {
      try {
        const jsonSlice = text.slice(startIdx, endIdx + 1);
        return JSON.parse(jsonSlice);
      } catch (sliceErr) {
        console.warn('Failed to parse sliced JSON:', sliceErr.message);
      }
    }
    return null;
  }
};

export const generateInterviewQuestionsAI = async ({
  topic,
  difficulty = 'Medium',
  count = 5,
  resumeSkills = [],
  apiKey = process.env.GEMINI_API_KEY,
}) => {
  const activeKey = apiKey || process.env.GEMINI_API_KEY;

  if (!activeKey) {
    console.log(`[AI] GEMINI_API_KEY not configured. Generating curated questions for ${topic} (${difficulty}).`);
    return getFallbackQuestions(topic, difficulty, count);
  }

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let contextPrompt = `Generate exactly ${count} professional mock technical interview questions for the topic: "${topic}" at difficulty level: "${difficulty}".`;
    if (resumeSkills && resumeSkills.length > 0) {
      contextPrompt += ` The candidate has the following background skills: ${resumeSkills.join(', ')}. Tailor some questions to test practical knowledge related to these skills.`;
    }

    const prompt = `
${contextPrompt}

You MUST respond ONLY with a valid JSON array of objects. Do NOT include markdown text outside the JSON.
Each object must have this exact structure:
[
  {
    "question": "Clear, direct interview question",
    "expectedConcepts": ["concept1", "concept2", "concept3"],
    "suggestedAnswer": "Comprehensive, concise model answer explaining the principles and best practices"
  }
]
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsed = extractJSON(responseText);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.slice(0, count);
    }

    console.warn('[Gemini AI] JSON parse failed, returning curated fallback questions.');
    return getFallbackQuestions(topic, difficulty, count);
  } catch (error) {
    console.error(`[Gemini AI Error]: ${error.message}. Using fallback question bank.`);
    return getFallbackQuestions(topic, difficulty, count);
  }
};

export const evaluateInterviewAI = async ({
  topic,
  difficulty = 'Medium',
  questions,
  answers,
  apiKey = process.env.GEMINI_API_KEY,
}) => {
  const activeKey = apiKey || process.env.GEMINI_API_KEY;

  if (!activeKey) {
    console.log('[AI] GEMINI_API_KEY not set. Using heuristic fallback evaluation.');
    return fallbackEvaluateAnswers({ topic, difficulty, questions, answers });
  }

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const qnaPairs = questions.map((q, idx) => ({
      index: idx,
      question: q.question,
      expectedConcepts: q.expectedConcepts || [],
      userAnswer: answers[idx]?.userAnswer || answers[idx] || 'No answer provided.',
      suggestedAnswer: q.suggestedAnswer || ''
    }));

    const prompt = `
You are an expert Senior Technical Interviewer evaluating a candidate's mock interview on the topic "${topic}" (${difficulty} level).

Here are the questions and the candidate's answers:
${JSON.stringify(qnaPairs, null, 2)}

Evaluate the submission thoroughly based on:
1. Technical Accuracy (correctness, algorithmic understanding, syntax & edge cases)
2. Completeness (depth, coverage of expected concepts)
3. Communication Quality (clarity, structure, conciseness)

Respond ONLY with a valid JSON object matching this exact schema:
{
  "score": 85,
  "feedback": {
    "overallSummary": "High-level summary of candidate's overall performance...",
    "strengths": ["Strength 1...", "Strength 2..."],
    "weaknesses": ["Weakness 1...", "Weakness 2..."],
    "technicalAccuracy": 85,
    "completeness": 80,
    "communicationQuality": 90,
    "actionableTips": ["Tip 1...", "Tip 2..."]
  },
  "answers": [
    {
      "questionIndex": 0,
      "question": "string",
      "userAnswer": "string",
      "score": 8,
      "technicalScore": 8,
      "completenessScore": 7,
      "communicationScore": 9,
      "strengths": ["string"],
      "weaknesses": ["string"],
      "suggestedAnswer": "Detailed ideal answer"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsed = extractJSON(responseText);

    if (parsed && typeof parsed.score === 'number' && parsed.feedback && Array.isArray(parsed.answers)) {
      return parsed;
    }

    console.warn('[Gemini AI] Invalid evaluation schema from model, using fallback evaluator.');
    return fallbackEvaluateAnswers({ topic, difficulty, questions, answers });
  } catch (error) {
    console.error(`[Gemini AI Error during evaluation]: ${error.message}. Using fallback evaluation.`);
    return fallbackEvaluateAnswers({ topic, difficulty, questions, answers });
  }
};

export const analyzeResumeAI = async ({
  resumeText,
  apiKey = process.env.GEMINI_API_KEY,
}) => {
  const activeKey = apiKey || process.env.GEMINI_API_KEY;

  if (!activeKey) {
    console.log('[AI] GEMINI_API_KEY not configured. Using local resume skills parser.');
    return fallbackAnalyzeResume(resumeText);
  }

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are a Senior Tech Recruiter and ATS Resume Expert. Analyze this candidate resume text:

--- RESUME START ---
${resumeText.slice(0, 10000)}
--- RESUME END ---

Extract technical skills, assess readiness for Software Engineer / Full Stack roles, and provide actionable critique.

Respond ONLY with a valid JSON object matching this exact schema:
{
  "atsScore": 84,
  "extractedSkills": ["React", "Node.js", "MongoDB", "TypeScript", "..."],
  "categorizedSkills": {
    "frontend": ["React", "HTML5", "CSS3", "..."],
    "backend": ["Node.js", "Express", "..."],
    "database": ["MongoDB", "PostgreSQL", "..."],
    "cloudDevOps": ["Docker", "AWS", "Git", "..."],
    "tools": ["Git", "Postman", "Jest", "..."],
    "softSkills": ["Problem Solving", "Collaboration", "..."]
  },
  "missingSkills": ["TypeScript", "Docker", "CI/CD", "..."],
  "strengths": [
    "Highlight 1...",
    "Highlight 2..."
  ],
  "weaknesses": [
    "Critique 1...",
    "Critique 2..."
  ],
  "recommendations": [
    "Actionable tip 1...",
    "Actionable tip 2...",
    "Actionable tip 3..."
  ],
  "projectHighlights": [
    "Project 1 summary and tech",
    "Project 2 summary and tech"
  ]
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsed = extractJSON(responseText);

    if (parsed && Array.isArray(parsed.extractedSkills) && parsed.categorizedSkills) {
      return parsed;
    }

    console.warn('[Gemini AI] Invalid resume analysis schema, using fallback resume analyzer.');
    return fallbackAnalyzeResume(resumeText);
  } catch (error) {
    console.error(`[Gemini AI Resume Error]: ${error.message}. Using fallback resume analysis.`);
    return fallbackAnalyzeResume(resumeText);
  }
};
