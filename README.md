<div align="center">

<img src="https://resume2roles.vercel.app/logo.jpeg" width="80px" alt="Resume2Role Logo"/>

# Resume2Role

### AI-Powered Campus Placement Preparation Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-resume2roles.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://resume2roles.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on%20Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

**Built for B.Tech final-year students · 100% Free · No install required**

[🚀 Try it Live](https://resume2roles.vercel.app/) · [📄 Resume Analyzer](https://resume2roles.vercel.app/resume) · [🎤 Mock Interview](https://resume2roles.vercel.app/register)

</div>

---

## 🎯 What is Resume2Role?

Resume2Role is a full-stack SaaS platform that covers the **complete campus placement lifecycle** in a single application — from ATS resume scoring to AI voice mock interviews to DSA practice.

Built solo and deployed on Vercel. Serving B.Tech students preparing for product companies like Amazon, Google, Microsoft, Flipkart, and mass recruiters like TCS, Infosys, Wipro.

---

## ✨ Features

### 📄 ATS Resume Analyzer
- Scores your resume **0–100** with section-wise breakdown
- Detects missing keywords for your target role
- **JD-to-resume cosine similarity** matching — replicates real recruiter ATS logic
- Role prediction from skill mapping
- Actionable improvement tips per section

### 🤖 AI Mock Interviews
- HR, Technical, and DSA rounds powered by **GPT-4o-mini**
- **Voice-to-text** via Web Speech API — speak naturally, get transcribed instantly
- Per-question scoring with real-time feedback
- Auto-generated performance report at end of session
- Reduces interview prep time by **60%**

### 💻 Coding Practice
- 100+ curated DSA problems in a real in-browser code editor
- Problems tagged by company — TCS, Amazon, Google, Microsoft
- Auto-evaluation with test cases

### 🏢 Company-wise Prep Tracks
- Dedicated tracks for 9+ companies: TCS · Infosys · Wipro · Amazon · Flipkart · Google · Microsoft · Swiggy · Meta
- HR question banks, topic patterns, and interview tips per company

### 📚 Placement Resources
- DSA roadmap · HR question bank · Aptitude shortcuts
- System design guides · Placement tips curated for Indian campuses

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Auth | Supabase — OTP email auth with resend flow |
| Database | Supabase with Row-Level Security (RLS) |
| AI / LLM | GPT-4o-mini via OpenRouter · Gemini AI |
| Voice | Web Speech API (voice-to-text transcription) |
| Animations | Framer Motion |
| Styling | Tailwind CSS · Light/Dark theme system |
| Deployment | Vercel |
| Mobile | Full mobile responsiveness · Bottom navigation |

---

## 🏗️ Architecture Highlights

- **Supabase RLS** — Row-Level Security enforces user data isolation at the database level
- **OTP-based auth** — Email OTP with resend flow, no passwords stored
- **LLM prompt pipeline** — Structured prompts for consistent per-question evaluation and report generation
- **Cosine similarity matcher** — JD text vs resume text vectorized and compared for ATS scoring
- **Streaming UI** — Framer Motion animated transitions throughout for production-grade feel

---

## 🚀 Getting Started
```bash
# Clone the repo
git clone https://github.com/HariJakku/Resume 2Role.git
cd Resume2Role

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase URL, Supabase anon key, OpenRouter API key, Gemini API key

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_key
GEMINI_API_KEY=your_gemini_key
```

---

## 📊 Stats

| Metric | Value |
|--------|-------|
| Company prep tracks | 9+ |
| DSA problems | 100+ |
| Interview questions | 1000+ |
| Cost to users | 100% Free |

---

## 👨‍💻 Author

**Jakku Kumarswami**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hari-jakku-189921278/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/HariJakku)
[![Portfolio](https://img.shields.io/badge/Portfolio-000?style=flat&logo=vercel&logoColor=white)](https://kumarswamijakku.netlify.app/)

---

<div align="center">

**⭐ Star this repo if it helped you — it takes 2 seconds and means a lot**

</div>
