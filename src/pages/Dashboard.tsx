import React from 'react';
import { useAppContext } from '../context/AppContext';
import { BookOpen, Award, CheckCircle, Calendar } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import { Link } from 'react-router-dom';
import WordCard from '../components/WordCard';

const Dashboard: React.FC = () => {
  const { 
    currentDay, 
    dailyLessons, 
    userProgress, 
    words, 
    getCurrentLesson,
    getCompletionPercentage
  } = useAppContext();

  const currentLesson = getCurrentLesson();
  const completionPercentage = getCompletionPercentage();
  
  // Get random words for the quick review section
  const getRandomWords = (count: number) => {
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomWords = getRandomWords(3);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">مرحبًا بك في رحلة تعلم اللغة العربية</h1>
        <p className="text-blue-200">Your 90-day Arabic learning journey</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-3">
            <Calendar className="h-5 w-5 text-blue-300 mr-2" />
            <h3 className="text-lg font-semibold text-white">Current Day</h3>
          </div>
          <p className="text-3xl font-bold text-white">{currentDay}</p>
          <p className="text-sm text-blue-300">out of 90 days</p>
          <ProgressBar progress={currentDay} total={90} showPercentage={false} />
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-3">
            <BookOpen className="h-5 w-5 text-blue-300 mr-2" />
            <h3 className="text-lg font-semibold text-white">Lessons</h3>
          </div>
          <p className="text-3xl font-bold text-white">{userProgress.completedLessons.length}</p>
          <p className="text-sm text-blue-300">completed lessons</p>
          <ProgressBar progress={userProgress.completedLessons.length} total={dailyLessons.length} showPercentage={false} />
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-3">
            <CheckCircle className="h-5 w-5 text-blue-300 mr-2" />
            <h3 className="text-lg font-semibold text-white">Words</h3>
          </div>
          <p className="text-3xl font-bold text-white">{userProgress.masteredWords.length}</p>
          <p className="text-sm text-blue-300">mastered words</p>
          <ProgressBar progress={userProgress.masteredWords.length} total={5000} showPercentage={false} />
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-3">
            <Award className="h-5 w-5 text-blue-300 mr-2" />
            <h3 className="text-lg font-semibold text-white">Streak</h3>
          </div>
          <p className="text-3xl font-bold text-white">{userProgress.streak}</p>
          <p className="text-sm text-blue-300">days in a row</p>
          <div className="mt-2 h-2.5 bg-blue-900 rounded-full">
            <div 
              className="bg-yellow-400 h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${Math.min(100, userProgress.streak * 10)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-blue-950 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Current Lesson</h2>
            <Link 
              to={`/lesson/${currentDay}`} 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
            >
              Start Learning
            </Link>
          </div>

          {currentLesson ? (
            <>
              <h3 className="text-lg font-semibold text-white mb-1">Day {currentLesson.day}: {currentLesson.title}</h3>
              <p className="text-blue-200 mb-4">{currentLesson.description}</p>
              
              <div className="space-y-2">
                <p className="text-sm text-blue-300">Words to learn:</p>
                <div className="flex flex-wrap gap-2">
                  {currentLesson.words.map((wordId) => {
                    const word = words.find((w) => w.id === wordId);
                    return word ? (
                      <span 
                        key={wordId} 
                        className="px-3 py-1 bg-blue-900 rounded-full text-sm text-white"
                      >
                        {word.arabic}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </>
          ) : (
            <p className="text-blue-200">You've completed all available lessons!</p>
          )}
        </div>

        <div className="bg-blue-950 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Your Progress</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-blue-300 mb-2">Overall Completion</p>
              <ProgressBar 
                progress={completionPercentage} 
                total={100}
                label="90-Day Challenge" 
              />
            </div>
            
            <div>
              <p className="text-sm text-blue-300 mb-2">Words Mastered</p>
              <ProgressBar 
                progress={userProgress.masteredWords.length} 
                total={5000}
                label="Vocabulary" 
              />
            </div>

            <div>
              <p className="text-sm text-blue-300 mb-2">Exams Passed</p>
              <ProgressBar 
                progress={userProgress.examScores.length} 
                total={30}
                label="Evaluations" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Quick Review</h2>
          <Link 
            to="/practice" 
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            See all flashcards
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {randomWords.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;