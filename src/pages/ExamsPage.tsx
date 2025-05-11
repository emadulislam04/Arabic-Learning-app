import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Award, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

const exams = [
  {
    id: 'exam1',
    title: 'Week 1 Evaluation',
    description: 'Test your knowledge of the first week of vocabulary',
    difficulty: 'easy',
    availableDay: 7,
    requiredLessons: [1, 2, 3, 4, 5, 6, 7],
    passingScore: 70
  },
  {
    id: 'exam2',
    title: 'Week 2 Evaluation',
    description: 'Test your knowledge of the second week of vocabulary',
    difficulty: 'medium',
    availableDay: 14,
    requiredLessons: [8, 9, 10, 11, 12, 13, 14],
    passingScore: 70
  },
  {
    id: 'exam3',
    title: 'Week 3 Evaluation',
    description: 'Test your knowledge of the third week of vocabulary',
    difficulty: 'medium',
    availableDay: 21,
    requiredLessons: [15, 16, 17, 18, 19, 20, 21],
    passingScore: 75
  },
  {
    id: 'exam4',
    title: 'Month 1 Comprehensive Exam',
    description: 'A comprehensive evaluation of your first month of learning',
    difficulty: 'hard',
    availableDay: 30,
    requiredLessons: Array.from({ length: 30 }, (_, i) => i + 1),
    passingScore: 80
  }
];

const ExamsPage: React.FC = () => {
  const { currentDay, userProgress } = useAppContext();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  // Check if an exam is available based on current day and completed lessons
  const isExamAvailable = (exam: typeof exams[0]) => {
    if (currentDay < exam.availableDay) {
      return false;
    }

    const hasCompletedRequiredLessons = exam.requiredLessons.every(lesson => 
      userProgress.completedLessons.includes(lesson)
    );

    return hasCompletedRequiredLessons;
  };

  // Check if an exam has been taken
  const getExamStatus = (examId: string) => {
    const examTaken = userProgress.examScores.find(score => score.examId === examId);
    if (!examTaken) {
      return {
        taken: false,
        passed: false,
        score: 0
      };
    }

    const exam = exams.find(e => e.id === examId);
    return {
      taken: true,
      passed: examTaken.score >= (exam?.passingScore || 0),
      score: examTaken.score
    };
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Evaluations</h1>
        <p className="text-blue-200">Test your knowledge with regular evaluations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {exams.map(exam => {
              const available = isExamAvailable(exam);
              const status = getExamStatus(exam.id);

              return (
                <div 
                  key={exam.id}
                  className={`bg-blue-950 rounded-lg p-6 shadow-lg border-2 ${
                    status.taken && status.passed
                      ? 'border-green-600'
                      : status.taken && !status.passed
                        ? 'border-red-600'
                        : available
                          ? 'border-blue-700 hover:border-blue-500 cursor-pointer'
                          : 'border-blue-900 opacity-75'
                  }`}
                  onClick={() => available && !status.taken && setSelectedExam(exam.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-semibold text-white">{exam.title}</h2>
                    {status.taken ? (
                      status.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      )
                    ) : (
                      <span className={`px-2 py-1 rounded text-xs ${
                        exam.difficulty === 'easy' 
                          ? 'bg-green-800 text-green-200' 
                          : exam.difficulty === 'medium'
                            ? 'bg-yellow-800 text-yellow-200'
                            : 'bg-red-800 text-red-200'
                      }`}>
                        {exam.difficulty}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-blue-300 mb-3">{exam.description}</p>

                  <div className="flex justify-between items-center text-xs text-blue-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Available Day {exam.availableDay}
                    </div>
                    
                    {status.taken ? (
                      <div className="font-medium">
                        Score: <span className={status.passed ? 'text-green-400' : 'text-red-400'}>
                          {status.score}%
                        </span>
                      </div>
                    ) : (
                      <div>
                        Passing Score: {exam.passingScore}%
                      </div>
                    )}
                  </div>

                  {!available && !status.taken && (
                    <div className="mt-3 text-sm text-yellow-400 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {currentDay < exam.availableDay 
                        ? `Available on day ${exam.availableDay}` 
                        : 'Complete required lessons first'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-blue-950 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Award className="h-6 w-6 text-yellow-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Your Progress</h2>
          </div>

          <div className="mb-6">
            <p className="text-sm text-blue-300 mb-2">Exams Completed</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">
                {userProgress.examScores.length}
              </p>
              <p className="text-blue-400 text-sm mb-1">/ {exams.length}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-blue-300 mb-2">Exams Passed</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">
                {userProgress.examScores.filter(score => {
                  const exam = exams.find(e => e.id === score.examId);
                  return score.score >= (exam?.passingScore || 0);
                }).length}
              </p>
              <p className="text-blue-400 text-sm mb-1">/ {exams.length}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-blue-300 mb-2">Average Score</p>
            <p className="text-3xl font-bold text-white">
              {userProgress.examScores.length > 0 
                ? Math.round(userProgress.examScores.reduce((sum, score) => sum + score.score, 0) / userProgress.examScores.length) 
                : 0}%
            </p>
          </div>

          {userProgress.examScores.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Recent Results</h3>
              <div className="space-y-2">
                {userProgress.examScores.slice(-3).reverse().map(score => {
                  const exam = exams.find(e => e.id === score.examId);
                  return (
                    <div key={score.examId} className="flex justify-between items-center p-2 bg-blue-900 rounded">
                      <span className="text-blue-200">{exam?.title}</span>
                      <span className={score.score >= (exam?.passingScore || 0) ? 'text-green-400' : 'text-red-400'}>
                        {score.score}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-blue-950 rounded-lg p-6 shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">
              {exams.find(e => e.id === selectedExam)?.title}
            </h2>
            <p className="text-blue-200 mb-6">
              {exams.find(e => e.id === selectedExam)?.description}
            </p>
            <p className="text-blue-300 mb-6">
              This evaluation will test your knowledge of the vocabulary you've learned so far. 
              You need to score at least {exams.find(e => e.id === selectedExam)?.passingScore}% to pass.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedExam(null)}
                className="px-4 py-2 bg-blue-800 rounded text-white hover:bg-blue-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Here you would normally start the exam
                  // For our demo, we'll just show a message
                  alert("In a complete implementation, this would start the exam with the actual questions.");
                  setSelectedExam(null);
                }}
                className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500 transition-colors"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamsPage;