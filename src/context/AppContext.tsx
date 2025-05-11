import React, { createContext, useContext, useState, useEffect } from 'react';
import { Word, DailyLesson, UserProgress } from '../types';
import { sampleWords } from '../data/sampleWords';
import { dailyLessons } from '../data/dailyLessons';

interface AppContextType {
  words: Word[];
  dailyLessons: DailyLesson[];
  currentDay: number;
  userProgress: UserProgress;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  completeLesson: (dayNumber: number) => void;
  markWordAsMastered: (wordId: string) => void;
  saveExamScore: (examId: string, score: number) => void;
  getCurrentLesson: () => DailyLesson | undefined;
  getCompletionPercentage: () => number;
}

const defaultUserProgress: UserProgress = {
  completedLessons: [],
  masteredWords: [],
  examScores: [],
  streak: 0,
  lastActivity: new Date().toISOString(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [words, setWords] = useState<Word[]>(sampleWords);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : defaultUserProgress;
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Check streak and update last activity
  useEffect(() => {
    const lastDate = new Date(userProgress.lastActivity);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // User was active yesterday, increment streak
      setUserProgress(prev => ({
        ...prev,
        streak: prev.streak + 1,
        lastActivity: today.toISOString()
      }));
    } else if (diffDays > 1) {
      // User missed days, reset streak
      setUserProgress(prev => ({
        ...prev,
        streak: 1,
        lastActivity: today.toISOString()
      }));
    }
  }, []);

  const completeLesson = (dayNumber: number) => {
    if (!userProgress.completedLessons.includes(dayNumber)) {
      setUserProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, dayNumber]
      }));
      
      // Automatically advance to next day if completing current day
      if (dayNumber === currentDay) {
        setCurrentDay(prev => prev + 1);
      }
    }
  };

  const markWordAsMastered = (wordId: string) => {
    if (!userProgress.masteredWords.includes(wordId)) {
      setUserProgress(prev => ({
        ...prev,
        masteredWords: [...prev.masteredWords, wordId]
      }));
    }
  };

  const saveExamScore = (examId: string, score: number) => {
    setUserProgress(prev => ({
      ...prev,
      examScores: [...prev.examScores, {
        examId,
        score,
        date: new Date().toISOString()
      }]
    }));
  };

  const getCurrentLesson = () => {
    return dailyLessons.find(lesson => lesson.day === currentDay);
  };

  const getCompletionPercentage = () => {
    return (userProgress.completedLessons.length / dailyLessons.length) * 100;
  };

  return (
    <AppContext.Provider
      value={{
        words,
        dailyLessons,
        currentDay,
        userProgress,
        isDarkMode,
        setIsDarkMode,
        completeLesson,
        markWordAsMastered,
        saveExamScore,
        getCurrentLesson,
        getCompletionPercentage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};