import { DailyLesson } from '../types';

export const dailyLessons: DailyLesson[] = [
  {
    day: 1,
    title: 'Basic Nouns',
    description: 'Learn essential everyday nouns to build your vocabulary foundation.',
    words: ['w1', 'w2', 'w3', 'w5', 'w14'],
    exercises: [
      {
        id: 'ex1',
        type: 'multiple-choice',
        question: 'What is the Arabic word for "book"?',
        options: ['كتاب', 'قلم', 'باب', 'ماء'],
        correctAnswer: 'كتاب'
      },
      {
        id: 'ex2',
        type: 'matching',
        question: 'Match the Arabic words with their Bangla translations',
        options: ['كتاب-বই', 'قلم-কলম', 'باب-দরজা', 'ماء-পানি', 'بيت-বাড়ি'],
        correctAnswer: 'All correct matches'
      }
    ]
  },
  {
    day: 2,
    title: 'Common Verbs',
    description: 'Master essential verbs for daily communication.',
    words: ['w7', 'w8', 'w9', 'w10'],
    exercises: [
      {
        id: 'ex3',
        type: 'matching',
        question: 'Match these verbs with their meanings',
        options: ['يأكل-খাওয়া', 'يشرب-পান করা', 'يقرأ-পড়া', 'يكتب-লেখা'],
        correctAnswer: 'All correct matches'
      }
    ]
  },
  // Add more daily lessons here...
];