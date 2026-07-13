import { create } from "zustand";

interface Unit {
  id: number;
  title: string;
}

interface Lesson {
  id: number;
  title: string;
}

interface LessonContent {
  id: number;
  title: string;
  words: { lingala: string; english: string }[];
  quiz: { question: string; answer: string }[];
}

interface CourseState {
  units: Unit[];
  lessons: Lesson[];
  lessonContent: LessonContent | null;

  loading: boolean;
  error: string | null;

  fetchUnits: () => Promise<void>;
  fetchLessons: (unitId: number) => Promise<void>;
  fetchLessonContent: (lessonId: number) => Promise<void>;
  submitAttempt: (lessonId: number, correct: boolean) => Promise<void>;
}

export const useCourse = create<CourseState>((set) => ({
  units: [],
  lessons: [],
  lessonContent: null,

  loading: false,
  error: null,

  fetchUnits: async () => {
    try {
      set({ loading: true });

      // Later: replace with API call
      const data = [
        { id: 1, title: "Unit 1: Greetings" },
        { id: 2, title: "Unit 2: Family" },
        { id: 3, title: "Unit 3: Food" },
      ];

      set({ units: data, loading: false });
    } catch {
      set({ error: "Failed to load units", loading: false });
    }
  },

  fetchLessons: async (unitId) => {
    try {
      set({ loading: true });

      // Later: replace with API call
      const data = [
        { id: 1, title: "Lesson 1: Basic Greetings" },
        { id: 2, title: "Lesson 2: Responding to Greetings" },
      ];

      set({ lessons: data, loading: false });
    } catch {
      set({ error: "Failed to load lessons", loading: false });
    }
  },

  fetchLessonContent: async (lessonId) => {
    try {
      set({ loading: true });

      // Later: replace with API call
      const data = {
        id: lessonId,
        title: "Basic Greetings",
        words: [
          { lingala: "Mbote", english: "Hello" },
          { lingala: "Sango nini?", english: "How are you?" },
        ],
        quiz: [
          { question: "What does 'Mbote' mean?", answer: "Hello" },
        ],
      };

      set({ lessonContent: data, loading: false });
    } catch {
      set({ error: "Failed to load lesson content", loading: false });
    }
  },

  submitAttempt: async (lessonId, correct) => {
    try {
      // Later: replace with API call
      console.log("Submitted attempt:", { lessonId, correct });
    } catch {
      set({ error: "Failed to submit attempt" });
    }
  },
}));