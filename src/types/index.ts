export interface Word {
  id: string;
  arabic: string;
  bangla: string;
  english: string;
  example?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface DailyLesson {
  day: number;
  title: string;
  description: string;
  words: string[]; // IDs of words
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-in-blank' | 'matching' | 'translation';
  question: string;
  options?: string[];
  correctAnswer: string;
}

export interface UserProgress {
  completedLessons: number[];
  masteredWords: string[];
  examScores: {
    examId: string;
    score: number;
    date: string;
  }[];
  streak: number;
  lastActivity: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  questions: Exercise[];
  passingScore: number;
}