 export type UserRole = "student";
export type Difficulty = "easy" | "medium" | "hard";
export type InterviewType = "hr" | "technical" | "dsa" | "system-design" | "behavioural";
export type InterviewMode = "text" | "voice" | "both";
export type InputMode = "text" | "voice";
export type TestStatus = "not-started" | "in-progress" | "completed";
export type Recommendation = "strong-yes" | "yes" | "maybe" | "no";

export interface User {
  id: string;
  email: string;
  name: string;
  college?: string;
  branch?: string;
  graduation_year?: number;
  avatar_url?: string;
  streak: number;
  total_interviews: number;
  total_tests: number;
  created_at: string;
}

export interface MockInterviewSession {
  id: string;
  user_id: string;
  type: InterviewType;
  company?: string;
  mode: InputMode;
  status: "active" | "completed";
  score?: number;
  feedback?: string;
  recommendation?: Recommendation;
  messages: InterviewMessage[];
  created_at: string;
  completed_at?: string;
}

export interface InterviewMessage {
  id: string;
  role: "ai" | "user";
  content: string;
  score?: number;
  feedback?: string;
  timestamp: string;
}

export interface PeerRoom {
  id: string;
  created_by: string;
  joined_by?: string;
  status: "waiting" | "active" | "ended";
  language: string;
  current_question?: string;
  created_at: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  topics: string[];
  companies: string[];
  examples: Example[];
  constraints: string[];
  starter_code: Record<string, string>;
  test_cases: TestCase[];
  hints: string[];
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

export interface CodingSubmission {
  id: string;
  user_id: string;
  problem_id: string;
  code: string;
  language: string;
  status: "accepted" | "wrong-answer" | "time-limit" | "error";
  runtime_ms?: number;
  score: number;
  created_at: string;
}

export interface PrepTopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: "dsa" | "hr" | "aptitude" | "system-design" | "company";
  company?: string;
  article_count: number;
  question_count: number;
}

export interface PrepQuestion {
  id: string;
  topic_id: string;
  question: string;
  answer: string;
  difficulty: Difficulty;
  tags: string[];
}

export type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "cpp"
  | "go";

export const LANGUAGE_LABELS: Record<Language, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python:     "Python",
  java:       "Java",
  cpp:        "C++",
  go:         "Go",
};

export const INTERVIEW_TYPE_LABELS: Record<InterviewType, string> = {
  hr:             "HR Interview",
  technical:      "Technical Interview",
  dsa:            "DSA Round",
  "system-design":"System Design",
  behavioural:    "Behavioural Round",
};

export const COMPANY_LIST = [
  { id: "tcs",       name: "TCS",       logo: "🔵", tier: "mass"    },
  { id: "infosys",   name: "Infosys",   logo: "🟣", tier: "mass"    },
  { id: "wipro",     name: "Wipro",     logo: "🟡", tier: "mass"    },
  { id: "amazon",    name: "Amazon",    logo: "🟠", tier: "product" },
  { id: "flipkart",  name: "Flipkart",  logo: "🔷", tier: "product" },
  { id: "swiggy",    name: "Swiggy",    logo: "🟠", tier: "product" },
  { id: "google",    name: "Google",    logo: "🔴", tier: "faang"   },
  { id: "microsoft", name: "Microsoft", logo: "🟦", tier: "faang"   },
  { id: "meta",      name: "Meta",      logo: "🔵", tier: "faang"   },
  { id: "startup",   name: "Startups",  logo: "🚀", tier: "startup" },
];