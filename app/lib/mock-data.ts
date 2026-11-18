import type { Lesson, Material, Message, Question, Step, User } from "@/types";

export const mockUser: User = {
  id: "user_00000000-0000-0000-0000-000000000001",
  email: "eleve@example.com",
  name: "Alex Riley",
  provider: "email",
  plan: "free",
  grade_level: "Terminale",
  created_at: "2026-01-10T08:00:00Z",
};

export const mockMaterial: Material = {
  id: "mat_00000000-0000-0000-0000-000000000001",
  user_id: mockUser.id,
  file_url: "/uploads/maths_notes.pdf",
  file_type: "pdf",
  title: "Mathématiques — Fonctions et dérivées",
  page_count: 12,
  status: "processed",
  created_at: "2026-01-11T09:00:00Z",
};

export const mockSteps: Step[] = [
  {
    id: "step_1",
    lesson_id: "lesson_1",
    order_index: 1,
    content: "Comprendre la notion de dérivée d'une fonction.",
    diagram_url: null,
    explanation: "La dérivée mesure la vitesse de variation de la fonction en un point.",
    status: "done",
  },
  {
    id: "step_2",
    lesson_id: "lesson_1",
    order_index: 2,
    content: "Appliquer la règle de dérivation des puissances.",
    diagram_url: null,
    explanation: "Si f(x) = x^n, alors f'(x) = n·x^(n-1).",
    status: "done",
  },
  {
    id: "step_3",
    lesson_id: "lesson_1",
    order_index: 3,
    content: "Calculer l'équation de la tangente en un point donné.",
    diagram_url: null,
    explanation: "La tangente en x=a a pour équation y = f'(a)(x-a) + f(a).",
    status: "pending",
  },
];

export const mockLesson: Lesson = {
  id: "lesson_1",
  material_id: mockMaterial.id,
  user_id: mockUser.id,
  topic: "Fonctions et dérivées",
  steps: mockSteps,
  status: "done",
  generation_job_id: null,
  created_at: "2026-01-11T09:30:00Z",
};

export const mockMessages: Message[] = [
  {
    id: "msg_1",
    lesson_id: "lesson_1",
    user_id: mockUser.id,
    role: "assistant",
    content: "Voici ton cours étape par étape sur les dérivées. Quelle étape veux-tu approfondir ?",
    created_at: "2026-01-11T09:31:00Z",
  },
  {
    id: "msg_2",
    lesson_id: "lesson_1",
    user_id: mockUser.id,
    role: "user",
    content: "Peux-tu expliquer la deuxième étape avec un exemple ?",
    created_at: "2026-01-11T09:35:00Z",
  },
  {
    id: "msg_3",
    lesson_id: "lesson_1",
    user_id: mockUser.id,
    role: "assistant",
    content: "Bien sûr. Prenons f(x) = x^3. Sa dérivée est f'(x) = 3x^2.",
    created_at: "2026-01-11T09:36:00Z",
  },
];

export const mockQuestions: Question[] = [
  {
    id: "q_1",
    lesson_id: "lesson_1",
    user_id: mockUser.id,
    prompt: "Quelle est la dérivée de f(x) = x^3 ?",
    options: ["3x^2", "x^2", "3x^3", "x^3/3"],
    correct_answer: "3x^2",
    explanation: "Règle des puissances : on fait descendre l'exposant et on le diminue de 1.",
    status: "unanswered",
  },
];
