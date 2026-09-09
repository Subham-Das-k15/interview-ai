# 🚀 InterviewAI — Full-Stack AI Technical Interview & Resume Platform

**InterviewAI** is a production-grade, AI-powered mock interview and career readiness platform built on the **MERN** stack (MongoDB Atlas, Express.js, React.js with Vite & Tailwind CSS, Node.js) and powered by **Google Gemini AI**.

Candidates can generate dynamic mock interviews across 11 technical subjects, answer questions using text or real-time voice speech-to-text, receive instant multi-metric rubric evaluations, analyze their resumes for ATS keywords, and track their preparation progress with interactive charts.

---

## ✨ Key Features

- **🧠 Google Gemini AI Integration**: Generates structured, contextual technical questions and delivers rubric feedback covering Technical Accuracy, Completeness, and Communication Quality.
- **📄 ATS Resume Analyzer**: Upload PDF resumes to extract categorized technical skills, discover missing keywords demanded by hiring managers, and calculate an ATS readiness score.
- **🎯 Resume-Tailored Mock Interviews**: One-click generation of interview questions specifically targeting the skills and projects found on your uploaded resume.
- **🎙️ Voice Dictation (Speech-to-Text)**: Answer interview questions verbally using browser Web Speech recognition to simulate realistic vocal interviews.
- **⏱️ Timed Practice Sessions**: Question timer and elapsed session tracking to train pacing under realistic constraints.
- **📊 Recharts Analytics Engine**: Interactive visualizations tracking performance over time, topic mastery radar, difficulty distributions, and weekly momentum.
- **⭐ Question Bank & Bookmarking**: Save tricky questions with model answers to a personal vault for pre-interview revision.
- **📑 Printable PDF Scorecards**: Export comprehensive evaluation scorecards as clean PDFs for portfolios or mentorship reviews.
- **⚡ 1-Click Demo Login**: Pre-seeded demo candidate account (`demo@interviewai.dev`) loaded with 5 completed interviews and resume analytics.

---

## 🏗️ Architecture & Folder Structure

```
interview-ai/
├── client/                               # React + Vite + Tailwind CSS Frontend
│   ├── public/
│   │   └── favicon.svg                  # Modern branded SVG favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                  # Button, Card, Badge, Modal, Toast, Skeleton, EmptyState
│   │   │   ├── dashboard/               # MetricCard, AnalyticsCharts, RecentInterviewsTable
│   │   │   ├── interview/               # QuestionCard, Timer, ProgressBar, SpeechInput
│   │   │   ├── layout/                  # Navbar, Footer, ProtectedRoute
│   │   │   └── resume/                  # ResumeUploader, SkillBadgeCloud, GapRadar
│   │   ├── context/
│   │   │   ├── AuthContext.jsx          # JWT state, session persistence & auto-refresh
│   │   │   └── ThemeContext.jsx         # Dark mode theme state
│   │   ├── hooks/
│   │   │   ├── useSpeechRecognition.js  # Voice-to-text dictation hook
│   │   │   └── useTimer.js              # Session timer hook
│   │   ├── pages/                       # 11 full-featured application pages
│   │   ├── services/                    # Axios API services (auth, interview, resume)
│   │   ├── utils/                       # Date/score formatters & PDF printing
│   │   ├── App.jsx                      # App router & layout providers
│   │   ├── index.css                    # Tailwind CSS glassmorphism & typography
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                              # Node.js + Express REST API Backend
│   ├── config/
│   │   └── db.js                        # MongoDB Atlas + zero-config in-memory fallback
│   ├── controllers/
│   │   ├── authController.js            # Register, login, profile, bookmarks
│   │   ├── interviewController.js       # Generation, evaluation, analytics, history
│   │   └── resumeController.js          # PDF parsing, ATS analysis, tailored interviews
│   ├── middleware/
│   │   ├── authMiddleware.js            # JWT protection & req.user attachment
│   │   ├── errorMiddleware.js           # Centralized JSON error handling
│   │   └── uploadMiddleware.js          # Multer storage for PDF resumes
│   ├── models/
│   │   ├── User.js                      # User schema with bcrypt password hashing
│   │   ├── Interview.js                 # Interview schema with question & answer rubrics
│   │   └── Resume.js                    # Resume schema with ATS score & categorized skills
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── interviewRoutes.js
│   │   └── resumeRoutes.js
│   ├── services/
│   │   ├── geminiService.js             # Google Generative AI SDK with structured JSON prompts
│   │   ├── fallbackAiService.js         # Curated 11-topic question bank & offline heuristic evaluator
│   │   └── resumeParserService.js       # pdf-parse text extractor
│   ├── seed/
│   │   └── seedData.js                  # Database seeder with demo candidate & past sessions
│   ├── utils/
│   │   └── generateToken.js             # JWT signer
│   ├── validations/
│   │   └── authValidation.js            # Request body validators
│   ├── server.js                        # Express app entrypoint
│   └── package.json
│
├── InterviewAI.postman_collection.json  # Comprehensive Postman test collection
├── render.yaml                          # Render infrastructure as code
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18 (Vite)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom glassmorphism design system & Outfit typography
- **Data Visualizations**: Recharts (Area, Bar, and Pie Charts)
- **Icons**: Lucide React
- **HTTP Client**: Axios with JWT interceptors
- **Voice Recognition**: Web Speech API (`SpeechRecognition`)
- **Effects**: Canvas Confetti

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB Atlas via Mongoose (with automated In-Memory fallback for zero-config local testing)
- **Authentication**: JWT (JSON Web Tokens) with `bcryptjs` password hashing
- **File Uploads**: Multer (PDF & text files)
- **PDF Extraction**: `pdf-parse`
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)

---

## 🚦 Getting Started Locally

### Prerequisites
- Node.js (v18+ or v22+)
- npm (v9+)
- (Optional) MongoDB Atlas connection string (or local MongoDB)
- (Optional) Google Gemini API Key ([Get one free here](https://aistudio.google.com/app/apikey))

### 1. Clone & Set Up Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/interviewai
# Or MongoDB Atlas: mongodb+srv://<user>:<password>@cluster.mongodb.net/interviewai?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

CLIENT_URL=http://localhost:5173
```

> **Note**: If `MONGODB_URI` is left default or local MongoDB is not running, the server automatically starts an in-memory MongoDB instance so you can develop immediately!
> If `GEMINI_API_KEY` is not provided, the platform automatically utilizes its high-yield offline question bank and heuristic evaluator.

### 2. Seed Demo Candidate Data

Populate the database with a pre-configured candidate account, 5 diverse interview sessions, and resume analysis:

```bash
cd server
npm run seed
```

**Demo Credentials**:
- **Email**: `demo@interviewai.dev`
- **Password**: `password123`

### 3. Run the Backend Server

```bash
cd server
npm start
# Or for live reload during development:
npm run dev
```
Backend runs on `http://localhost:5000`. Test the health check at `http://localhost:5000/api/health`.

### 4. Set Up & Run Frontend

In a separate terminal:

```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`. Open your browser and explore!

---

## 📡 REST API Documentation

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new candidate | Public |
| `POST` | `/api/auth/login` | Login candidate & return JWT | Public |
| `GET` | `/api/auth/profile` | Get current candidate profile | Private |
| `PUT` | `/api/auth/profile` | Update profile, role, skills, avatar | Private |
| `POST` | `/api/auth/bookmark` | Toggle question bookmark | Private |
| `POST` | `/api/interviews/generate` | Generate mock interview questions | Private |
| `POST` | `/api/interviews/evaluate` | Evaluate answers & save session | Private |
| `GET` | `/api/interviews/history` | List candidate interview history | Private |
| `GET` | `/api/interviews/analytics` | Aggregate Recharts analytics | Private |
| `GET` | `/api/interviews/:id` | Get single interview details | Private |
| `PATCH` | `/api/interviews/:id/favorite` | Toggle interview favorite star | Private |
| `DELETE` | `/api/interviews/:id` | Delete interview session | Private |
| `POST` | `/api/resume/upload` | Upload PDF resume & analyze with AI | Private |
| `POST` | `/api/resume/analyze` | Analyze pasted resume text | Private |
| `GET` | `/api/resume/latest` | Get latest parsed resume | Private |
| `POST` | `/api/resume/generate-interview` | Generate resume-tailored interview | Private |

---

## 🚀 Deployment Guide

### Deploying Backend to Render
1. Push this repository to GitHub.
2. Log into [Render](https://render.com/) and create a **New Web Service**.
3. Connect your repository.
4. Set **Root Directory** to `server`.
5. Set **Build Command** to `npm install`.
6. Set **Start Command** to `npm start`.
7. In the **Environment Variables** section, add:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random 32-character string.
   - `JWT_EXPIRE`: `30d`
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `CLIENT_URL`: Your Vercel frontend URL (e.g. `https://interviewai.vercel.app`).
8. Deploy the service.

### Deploying Frontend to Vercel
1. Log into [Vercel](https://vercel.com/) and import the repository.
2. Set **Root Directory** to `client`.
3. Set **Framework Preset** to `Vite`.
4. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Environment Variables:
   - If deploying separately, configure your API base URL or set up `vercel.json` rewrites pointing `/api/(.*)` to your Render backend URL.
6. Deploy!

---

## 📮 Postman Collection

Import `InterviewAI.postman_collection.json` into Postman.
- The collection uses `{{baseUrl}}` (defaults to `http://localhost:5000/api`).
- The **Login Candidate** request includes a test script that automatically sets `{{token}}` for subsequent requests.

---

## 📄 License
MIT License. Created for technical interview preparation, university placements, and engineering portfolios.
