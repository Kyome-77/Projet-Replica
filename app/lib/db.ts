import type { Lesson, Material, Message, Question, Step, Upload, User } from "@/types";

export const db = {
  async getUser(_id: string) {
    return Promise.resolve<User | null>(null);
  },
  async getMaterials(_userId: string) {
    return Promise.resolve<Material[]>([]);
  },
  async getLesson(_id: string) {
    return Promise.resolve<Lesson | null>(null);
  },
  async getSteps(_lessonId: string) {
    return Promise.resolve<Step[]>([]);
  },
  async getMessages(_lessonId: string) {
    return Promise.resolve<Message[]>([]);
  },
  async getQuestions(_lessonId: string) {
    return Promise.resolve<Question[]>([]);
  },
  async createUpload(_data: Partial<Upload>) {
    return Promise.resolve<Upload | null>(null);
  },
  async createMaterial(_data: Partial<Material>) {
    return Promise.resolve<Material | null>(null);
  },
  async createLesson(_data: Partial<Lesson>) {
    return Promise.resolve<Lesson | null>(null);
  },
};
