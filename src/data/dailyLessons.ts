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
      id: 'ex4',
      type: 'multiple-choice',
      question: 'Which word means "pen" in Arabic?',
      options: ['قلم', 'بيت', 'ماء', 'باب'],
      correctAnswer: 'قلم'
    },
    {
      id: 'ex2',
      type: 'matching',
      question: 'Match the Arabic words with their Bangla translations',
      options: ['كتاب-বই', 'قلم-কলম', 'باب-দরজা', 'ماء-পানি', 'بيت-বাড়ি'],
      correctAnswer: 'All correct matches'
    },
    {
      id: 'ex3',
      type: 'fill-in-the-blank',
      question: 'Fill in the blank: The Arabic word for water is ___.',
      options: [],
      correctAnswer: 'ماء'
    },
    
    {
      id: 'ex5',
      type: 'true-false',
      question: 'بيت means "book" in Arabic.',
      options: ['true', 'false'],
      correctAnswer: 'false'
    },
    {
      id: 'ex6',
      type: 'multiple-choice',
      question: 'What is the Arabic word for "house"?',
      options: ['باب', 'بيت', 'قلم', 'كتاب'],
      correctAnswer: 'بيت'
    },
    {
      id: 'ex7',
      type: 'matching',
      question: 'Match each Arabic noun with its correct English meaning',
      options: ['كتاب - Book', 'ماء - Water', 'بيت - House', 'باب - Door', 'قلم - Pen'],
      correctAnswer: 'All correct matches'
    },
    {
      id: 'ex8',
      type: 'true-false',
      question: 'قلم is used for writing.',
      options: ['true', 'false'],
      correctAnswer: 'true'
    },
    {
      id: 'ex9',
      type: 'fill-in-the-blank',
      question: '____ means "house" in Arabic.',
      options: [],
      correctAnswer: 'بيت'
    },
    {
      id: 'ex10',
      type: 'multiple-choice',
      question: 'Which Arabic word means "door"?',
      options: ['بيت', 'باب', 'ماء', 'قلم'],
      correctAnswer: 'باب'
    }
  ]
},

  {
  day: 2,
  title: 'Common Verbs',
  description: 'Learn essential verbs that are commonly used in daily conversations.',
  words: ['w6', 'w7', 'w8', 'w9', 'w10'],
  exercises: [
    {
      id: 'ex1',
      type: 'multiple-choice',
      question: 'What is the Arabic word for "run"?',
      options: ['جري', 'أكل', 'شرب', 'نام'],
      correctAnswer: 'جري'
    },
    {
      id: 'ex2',
      type: 'matching',
      question: 'Match the Arabic verbs with their English meanings',
      options: ['جري - Run', 'أكل - Eat', 'شرب - Drink', 'نام - Sleep'],
      correctAnswer: 'All correct matches'
    },
    {
      id: 'ex3',
      type: 'fill-in-the-blank',
      question: 'Fill in the blank: The Arabic word for "eat" is ___.',
      options: [],
      correctAnswer: 'أكل'
    },
    {
      id: 'ex4',
      type: 'multiple-choice',
      question: 'Which verb means "sleep" in Arabic?',
      options: ['أكل', 'جري', 'شرب', 'نام'],
      correctAnswer: 'نام'
    },
    {
      id: 'ex5',
      type: 'true-false',
      question: 'شرب means "drink" in Arabic.',
      options: ['true', 'false'],
      correctAnswer: 'true'
    }
  ]
}

  // Add more daily lessons here...
];