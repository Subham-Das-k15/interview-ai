import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db.js';
import User from '../models/User.js';
import Interview from '../models/Interview.js';
import Resume from '../models/Resume.js';

dotenv.config();

const seed = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await connectDB();

    console.log('[Seed] Cleaning existing test collections...');
    await User.deleteMany({ email: 'demo@interviewai.dev' });

    console.log('[Seed] Creating demo candidate account...');
    const demoUser = await User.create({
      name: 'Alex Johnson',
      email: 'demo@interviewai.dev',
      password: 'password123',
      targetRole: 'Full Stack Engineer',
      experienceLevel: 'Mid Level (1-3 yrs)',
      skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AlexJohnson',
      bookmarkedQuestions: [
        {
          question: 'How does React\'s Virtual DOM reconciliation diffing algorithm work?',
          topic: 'React',
          difficulty: 'Medium',
          expectedConcepts: ['VDOM tree comparison', 'Heuristic O(N)', 'Keys', 'Fiber Architecture'],
          suggestedAnswer: 'React diffs previous and next virtual DOM trees in O(N) using element type comparison and stable key matching.',
        },
        {
          question: 'Explain the difference between process and thread in operating systems.',
          topic: 'Operating Systems',
          difficulty: 'Easy',
          expectedConcepts: ['Virtual address space', 'Context switching', 'Shared memory heap vs stack'],
          suggestedAnswer: 'A process has its own isolated memory space, while threads within a process share the heap and code segment.',
        },
      ],
    });

    console.log(`[Seed] Demo user created with ID: ${demoUser._id}`);

    // Clean any prior interviews for this user
    await Interview.deleteMany({ userId: demoUser._id });

    // Seed 5 realistic past interview sessions for analytics
    const pastInterviews = [
      {
        userId: demoUser._id,
        topic: 'React',
        difficulty: 'Medium',
        questionCount: 5,
        score: 88,
        durationSeconds: 740,
        isFavorite: true,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        feedback: {
          overallSummary: 'Outstanding performance on React architectural patterns, Hooks lifecycle, and state optimization.',
          strengths: ['Precise explanation of useEffect dependency array nuances', 'Clear grasp of React Fiber reconciliation', 'Good communication structure'],
          weaknesses: ['Could detail memoization overhead trade-offs more explicitly'],
          technicalAccuracy: 90,
          completeness: 85,
          communicationQuality: 89,
          actionableTips: ['Consider reviewing React 19 Server Actions and useOptimistic hook.'],
        },
        questions: [
          {
            question: 'Explain React Hooks, specifically useState and useEffect.',
            expectedConcepts: ['Functional components', 'Reactive state', 'Side effects cleanup'],
            suggestedAnswer: 'Hooks enable functional components to retain state and perform lifecycle effects.',
          },
          {
            question: 'Why do we need keys in React lists?',
            expectedConcepts: ['Reconciliation', 'Stable identity', 'Index key caveats'],
            suggestedAnswer: 'Keys give list elements a stable identity across renders for efficient diffing.',
          },
        ],
        answers: [
          {
            questionIndex: 0,
            question: 'Explain React Hooks, specifically useState and useEffect.',
            userAnswer: 'useState lets us keep state inside functional components. useEffect handles side-effects like fetching data from APIs and allows returning a cleanup function to prevent memory leaks.',
            score: 9,
            technicalScore: 9,
            completenessScore: 9,
            communicationScore: 9,
            strengths: ['Accurately mentioned the cleanup function for memory leaks.'],
            weaknesses: [],
            suggestedAnswer: 'useState manages reactive state; useEffect coordinates asynchronous tasks and subscriptions.',
          },
        ],
      },
      {
        userId: demoUser._id,
        topic: 'JavaScript',
        difficulty: 'Medium',
        questionCount: 5,
        score: 92,
        durationSeconds: 610,
        isFavorite: true,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        feedback: {
          overallSummary: 'Exceptional mastery of core JavaScript runtime, closures, event loop microtasks, and prototypes.',
          strengths: ['Accurate distinction between Microtask and Macrotask execution queues', 'Strong grasp of closure lexical scope'],
          weaknesses: ['Minor stutter when explaining prototypal chaining edge cases'],
          technicalAccuracy: 94,
          completeness: 90,
          communicationQuality: 92,
          actionableTips: ['Practice implementing custom Promise polyfills.'],
        },
        questions: [],
        answers: [],
      },
      {
        userId: demoUser._id,
        topic: 'DSA',
        difficulty: 'Hard',
        questionCount: 5,
        score: 74,
        durationSeconds: 1200,
        isFavorite: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        feedback: {
          overallSummary: 'Good algorithmic baseline with strong time complexity analysis, though dynamic programming space optimization needs work.',
          strengths: ['Identified optimal two-pointer and hash map approaches promptly', 'Accurate Big-O notation'],
          weaknesses: ['Missed corner cases on empty and single-element graphs in Dijkstra logic'],
          technicalAccuracy: 76,
          completeness: 72,
          communicationQuality: 74,
          actionableTips: ['Solve 10 medium graph and DP problems on LeetCode.'],
        },
        questions: [],
        answers: [],
      },
      {
        userId: demoUser._id,
        topic: 'Node.js',
        difficulty: 'Medium',
        questionCount: 5,
        score: 84,
        durationSeconds: 830,
        isFavorite: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        feedback: {
          overallSummary: 'Solid comprehension of libuv, event loop phases, Express middleware chaining, and streams.',
          strengths: ['Clear explanation of backpressure in readable and writable streams', 'Good understanding of async error propagation'],
          weaknesses: ['Could elaborate on clustering vs worker threads'],
          technicalAccuracy: 85,
          completeness: 82,
          communicationQuality: 85,
          actionableTips: ['Explore PM2 process manager and Node.js native test runner.'],
        },
        questions: [],
        answers: [],
      },
      {
        userId: demoUser._id,
        topic: 'HR Interview',
        difficulty: 'Easy',
        questionCount: 5,
        score: 86,
        durationSeconds: 520,
        isFavorite: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        feedback: {
          overallSummary: 'Great behavioral storytelling using the STAR method with clear impact metrics and teamwork emphasis.',
          strengths: ['Structured answers using Situation-Task-Action-Result', 'Strong alignment with software team values'],
          weaknesses: ['Keep introduction under 90 seconds for tighter impact'],
          technicalAccuracy: 88,
          completeness: 85,
          communicationQuality: 85,
          actionableTips: ['Prepare 2 questions to ask the interviewer at the end of each session.'],
        },
        questions: [],
        answers: [],
      },
    ];

    await Interview.insertMany(pastInterviews);
    console.log(`[Seed] Seeded ${pastInterviews.length} past interview sessions.`);

    // Seed sample Resume Analysis
    await Resume.deleteMany({ userId: demoUser._id });
    await Resume.create({
      userId: demoUser._id,
      originalFileName: 'Alex_Johnson_FullStack_Resume.pdf',
      fileUrl: '/uploads/sample-resume.pdf',
      atsScore: 86,
      extractedSkills: [
        'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express',
        'MongoDB', 'Tailwind CSS', 'Git', 'REST APIs', 'Docker'
      ],
      categorizedSkills: {
        frontend: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
        backend: ['Node.js', 'Express', 'REST APIs'],
        database: ['MongoDB', 'Mongoose'],
        cloudDevOps: ['Docker', 'Git', 'GitHub Actions'],
        tools: ['VS Code', 'Postman', 'Vite'],
        softSkills: ['Agile Development', 'Team Collaboration', 'Communication'],
      },
      missingSkills: ['AWS / Cloud Services', 'Kubernetes', 'Redis / In-Memory Caching', 'Jest / Testing'],
      strengths: [
        'Modern MERN stack technical stack well aligned with current hiring trends.',
        'High skill density with clear project evidence.',
        'Well-formatted and readable layout with clear section demarcations.'
      ],
      weaknesses: [
        'Add quantifiable metrics: quantify user traffic, latency improvements, or test coverage.',
        'Missing automated unit testing tools (Jest, React Testing Library).',
        'Cloud infrastructure and container orchestration could be highlighted further.'
      ],
      recommendations: [
        'Build a project incorporating Redis for API response caching.',
        'Write automated integration tests and mention CI/CD pipeline automation.',
        'Use bullet points starting with strong action verbs (Architected, Engineered, Optimized).'
      ],
      projectHighlights: [
        'InterviewAI: Full-stack MERN AI mock interview platform with Gemini integration.',
        'E-Commerce Microservices: Express and MongoDB backend with JWT auth and Stripe checkout.'
      ],
      parsedText: 'Alex Johnson - Full Stack Engineer. Skills: JavaScript, React, Node.js, MongoDB, TypeScript, Tailwind CSS, Docker, Git. Experience in building scalable REST APIs and modern SPAs.',
    });

    console.log('[Seed] Sample resume seeded successfully.');
    console.log('\n==========================================');
    console.log(' SEEDING COMPLETE!');
    console.log(' Demo Login Credentials:');
    console.log(' Email:    demo@interviewai.dev');
    console.log(' Password: password123');
    console.log('==========================================\n');

    process.exit(0);
  } catch (err) {
    console.error(`[Seed Error]: ${err.message}`);
    process.exit(1);
  }
};

seed();
