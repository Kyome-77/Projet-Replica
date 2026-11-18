export type User = {
  id: string;
  email: string;
  name: string | null;
  provider: "email" | "google";
  plan: "free" | "pro";
  grade_level: string | null;
  created_at: string;
};

export type Material = {
  id: string;
  user_id: string;
  file_url: string;
  file_type: "pdf" | "image" | "text";
  title: string;
  page_count: number | null;
  status: "uploaded" | "processed" | "failed";
  created_at: string;
};

export type Step = {
  id: string;
  lesson_id: string;
  order_index: number;
  content: string;
  diagram_url: string | null;
  explanation: string | null;
  status: "pending" | "done" | "failed";
};

export type Lesson = {
  id: string;
  material_id: string;
  user_id: string;
  topic: string;
  steps: Step[];
  status: "pending" | "done" | "failed";
  generation_job_id: string | null;
  created_at: string;
};

export type Message = {
  id: string;
  lesson_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

export type Question = {
  id: string;
  lesson_id: string;
  user_id: string;
  prompt: string;
  options: string[];
  correct_answer: string;
  explanation: string | null;
  status: "unanswered" | "answered";
};

export type Upload = {
  id: string;
  user_id: string;
  storage_key: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  status: "pending" | "completed" | "failed";
};
