import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import WordCard from '../components/WordCard';
import ExerciseCard from '../components/ExerciseCard';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

enum LessonSteps {
  INTRODUCTION = 'introduction',
  VOCABULARY = 'vocabulary',
  EXERCISES = 'exercises',
  COMPLETION = 'completion'
}

const LessonPage: React.FC = () => {
  const { dayId } = useParams<{ dayId: string }>();
  const dayNumber = parseInt(dayId || '1', 10);
  const navigate = useNavigate();
  
  const { 
    dailyLessons, 
    words, 
    completeLesson,
    userProgress
  } = useAppContext();
  
  const [currentStep, setCurrentStep] = useState<LessonSteps>(LessonSteps.INTRODUCTION);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);
  
  const lesson = dailyLessons.find(l => l.day === dayNumber);
  
  useEffect(() => {
    if (!lesson) {
      navigate('/');
    } else {
      // Initialize completedExercises array
      setCompletedExercises(new Array(lesson.exercises.length).fill(false));
    }
  }, [lesson, navigate]);
  
  if (!lesson) {
    return null;
  }
  
  const lessonWords = lesson.words.map(id => words.find(w => w.id === id)).filter(Boolean) as typeof words;
  
  const handleNextWord = () => {
    if (currentWordIndex < lessonWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentStep(LessonSteps.EXERCISES);
    }
  };
  
  const handlePrevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };
  
  const handleExerciseComplete = (isCorrect: boolean) => {
    const newCompletedExercises = [...completedExercises];
    newCompletedExercises[currentExerciseIndex] = true;
    setCompletedExercises(newCompletedExercises);
    
    setTimeout(() => {
      if (currentExerciseIndex < lesson.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      } else {
        setCurrentStep(LessonSteps.COMPLETION);
      }
    }, 500);
  };
  
  const handleFinishLesson = () => {
    completeLesson(dayNumber);
    navigate('/');
  };
  
  const isLessonCompleted = userProgress.completedLessons.includes(dayNumber);
  
  const renderStepContent = () => {
    switch (currentStep) {
      case LessonSteps.INTRODUCTION:
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Day {lesson.day}: {lesson.title}</h1>
            <p className="text-lg text-blue-200 mb-6">{lesson.description}</p>
            
            <div className="mb-8 bg-blue-950 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-3">In this lesson, you'll learn:</h2>
              <ul className="space-y-2 text-blue-200">
                {lessonWords.map((word, index) => (
                  <li key={word.id} className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>{word.arabic} ({word.english})</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={() => setCurrentStep(LessonSteps.VOCABULARY)}
              className="px-6 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-500 transition-colors"
            >
              Start Learning
            </button>
          </div>
        );
      
      case LessonSteps.VOCABULARY:
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Vocabulary</h2>
              <div className="text-sm text-blue-300">
                Word {currentWordIndex + 1} of {lessonWords.length}
              </div>
            </div>
            
            <div className="mb-8">
              {lessonWords[currentWordIndex] && (
                <WordCard word={lessonWords[currentWordIndex]} showTranslation={false} />
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handlePrevWord}
                disabled={currentWordIndex === 0}
                className="flex items-center px-4 py-2 bg-blue-800 rounded text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
              
              <button
                onClick={handleNextWord}
                className="flex items-center px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500 transition-colors"
              >
                {currentWordIndex < lessonWords.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Go to Exercises
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        );
      
      case LessonSteps.EXERCISES:
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Practice Exercises</h2>
              <div className="text-sm text-blue-300">
                Exercise {currentExerciseIndex + 1} of {lesson.exercises.length}
              </div>
            </div>
            
            {lesson.exercises[currentExerciseIndex] && (
              <ExerciseCard
                exercise={lesson.exercises[currentExerciseIndex]}
                onComplete={handleExerciseComplete}
              />
            )}
          </div>
        );
      
      case LessonSteps.COMPLETION:
        return (
          <div className="text-center">
            <div className="mb-6 flex flex-col items-center">
              <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">Lesson Completed!</h1>
              <p className="text-lg text-blue-200">
                You've successfully completed Day {lesson.day}: {lesson.title}
              </p>
            </div>
            
            <div className="mb-8 bg-blue-950 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-3">Summary of what you learned:</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {lessonWords.map(word => (
                  <div key={word.id} className="bg-blue-900 p-3 rounded">
                    <p className="font-semibold text-white">{word.arabic}</p>
                    <p className="text-sm text-blue-200">{word.bangla} ({word.english})</p>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleFinishLesson}
              className="px-6 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-500 transition-colors"
            >
              Complete and Return to Dashboard
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      {isLessonCompleted && currentStep !== LessonSteps.COMPLETION && (
        <div className="mb-6 bg-blue-900 text-white p-4 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
          <p>You've already completed this lesson. Reviewing it again will help reinforce your learning.</p>
        </div>
      )}
      
      {renderStepContent()}
    </div>
  );
};

export default LessonPage;