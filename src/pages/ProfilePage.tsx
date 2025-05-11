import React from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Calendar, Award, BookOpen, Star } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

const ProfilePage: React.FC = () => {
  const { userProgress, words, dailyLessons } = useAppContext();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate statistics
  const totalWords = words.length;
  const masteredWords = userProgress.masteredWords.length;
  const masteredPercentage = Math.round((masteredWords / totalWords) * 100);
  
  const totalLessons = dailyLessons.length;
  const completedLessons = userProgress.completedLessons.length;
  const completedPercentage = Math.round((completedLessons / totalLessons) * 100);
  
  const totalExams = userProgress.examScores.length;
  const averageScore = totalExams > 0 
    ? Math.round(userProgress.examScores.reduce((sum, score) => sum + score.score, 0) / totalExams) 
    : 0;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Your Profile</h1>
        <p className="text-blue-200">Track your Arabic learning journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-950 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="bg-blue-800 rounded-full p-3 mr-4">
              <User className="w-8 h-8 text-blue-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">User</h2>
              <p className="text-blue-300">Arabic Learner</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-blue-400 mb-1">Learning since:</p>
            <p className="text-white">{formatDate(userProgress.lastActivity)}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-blue-400 mb-1">Current Streak:</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-white mr-2">{userProgress.streak}</p>
              <p className="text-blue-300">consecutive days</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-blue-400 mb-1">Last Activity:</p>
            <p className="text-white">{formatDate(userProgress.lastActivity)}</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-blue-950 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6">Learning Progress</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-900 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <BookOpen className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Lessons</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{completedLessons}</p>
              <p className="text-sm text-blue-400">of {totalLessons} completed</p>
              <ProgressBar progress={completedLessons} total={totalLessons} showPercentage={false} />
            </div>
            
            <div className="bg-blue-900 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Vocabulary</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{masteredWords}</p>
              <p className="text-sm text-blue-400">of {totalWords} words mastered</p>
              <ProgressBar progress={masteredWords} total={totalWords} showPercentage={false} />
            </div>
            
            <div className="bg-blue-900 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Award className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Exams</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{averageScore}%</p>
              <p className="text-sm text-blue-400">average score ({totalExams} taken)</p>
              <ProgressBar progress={averageScore} total={100} showPercentage={false} />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Overall Progress</h3>
            <ProgressBar 
              progress={(completedPercentage + masteredPercentage) / 2} 
              total={100}
              label="90-Day Challenge" 
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">90-Day Goal Tracker</h3>
            <div className="grid grid-cols-9 gap-1">
              {Array.from({ length: 90 }, (_, i) => i + 1).map(day => (
                <div 
                  key={day}
                  className={`aspect-square rounded-sm ${
                    userProgress.completedLessons.includes(day)
                      ? 'bg-blue-500'
                      : day <= completedLessons
                        ? 'bg-blue-700'
                        : 'bg-blue-900'
                  }`}
                  title={`Day ${day}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-950 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-6">Learning Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-blue-400 mb-1">Words Mastered:</p>
            <p className="text-2xl font-bold text-white">{masteredWords} / {totalWords}</p>
            <ProgressBar 
              progress={masteredWords} 
              total={totalWords}
              label="Mastery Rate" 
            />
          </div>
          
          <div>
            <p className="text-sm text-blue-400 mb-1">Lessons Completed:</p>
            <p className="text-2xl font-bold text-white">{completedLessons} / {totalLessons}</p>
            <ProgressBar 
              progress={completedLessons} 
              total={totalLessons}
              label="Completion Rate" 
            />
          </div>
          
          <div>
            <p className="text-sm text-blue-400 mb-1">Current Streak:</p>
            <p className="text-2xl font-bold text-white">{userProgress.streak} days</p>
            <ProgressBar 
              progress={userProgress.streak} 
              total={30}
              label="Monthly Goal" 
            />
          </div>
          
          <div>
            <p className="text-sm text-blue-400 mb-1">Average Exam Score:</p>
            <p className="text-2xl font-bold text-white">{averageScore}%</p>
            <ProgressBar 
              progress={averageScore} 
              total={100}
              label="Test Performance" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;