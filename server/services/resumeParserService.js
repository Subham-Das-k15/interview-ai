import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

export const parseResumeFile = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.txt') {
      const text = fs.readFileSync(filePath, 'utf-8');
      return text;
    }

    // PDF extraction
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    
    // Clean up excessive whitespace
    const cleanText = data.text
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return cleanText;
  } catch (error) {
    console.error(`[Resume Parser Error]: ${error.message}`);
    // If parsing throws an error, return best-effort text
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return raw.replace(/[^\x20-\x7E\n]/g, ' ').slice(0, 5000);
    } catch (e) {
      return 'Resume file content could not be read as binary text.';
    }
  }
};
