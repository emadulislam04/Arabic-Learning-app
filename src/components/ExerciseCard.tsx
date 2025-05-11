import React, { useState } from 'react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onComplete: (isCorrect: boolean) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onComplete }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [matchPairs, setMatchPairs] = useState<{ [key: string]: string }>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSubmit = () => {
    if (submitted) return;

    const correct = checkAnswer();
    setIsCorrect(correct);
    setSubmitted(true);
    
    setTimeout(() => {
      onComplete(correct);
    }, 1500);
  };

  const checkAnswer = () => {
    if (exercise.type === 'multiple-choice') {
      return userAnswer === exercise.correctAnswer;
    } else if (exercise.type === 'fill-in-blank') {
      return userAnswer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();
    } else if (exercise.type === 'translation') {
      return userAnswer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();
    } else if (exercise.type === 'matching') {
      if (!exercise.options) return false;
      const correctPairs = new Map(exercise.options.map(pair => {
        const [item1, item2] = pair.split('-');
        return [item1, item2];
      }));

      return Object.entries(matchPairs).every(([key, value]) => 
        correctPairs.get(key) === value
      ) && Object.keys(matchPairs).length === exercise.options.length;
    }
    return false;
  };

  const handleMatchItem = (item: string) => {
    if (!exercise.options) return;

    if (selectedItem === null) {
      setSelectedItem(item);
    } else {
      const [first, second] = exercise.options.find(pair => 
        pair.split('-').includes(item) && pair.split('-').includes(selectedItem)
      )?.split('-') || [];

      if (first && second) {
        setMatchPairs(prev => ({
          ...prev,
          [first]: second
        }));
      }
      setSelectedItem(null);
    }
  };

  const isItemMatched = (item: string) => {
    if (!exercise.options) return false;
    return Object.entries(matchPairs).some(([key, value]) => 
      key === item || value === item
    );
  };

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {exercise.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={submitted}
                  className="mr-2"
                />
                <label 
                  htmlFor={`option-${index}`}
                  className={`${
                    submitted && option === exercise.correctAnswer ? 'text-green-400' : ''
                  } ${
                    submitted && userAnswer === option && option !== exercise.correctAnswer ? 'text-red-400' : ''
                  }`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      
      case 'fill-in-blank':
        return (
          <div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={submitted}
              className="w-full p-2 mt-2 bg-blue-900 border border-blue-700 rounded text-white"
              placeholder="Your answer..."
              dir={exercise.question.includes('__') ? 'auto' : 'rtl'}
            />
          </div>
        );
      
      case 'translation':
        return (
          <div>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={submitted}
              className="w-full p-2 mt-2 bg-blue-900 border border-blue-700 rounded text-white"
              placeholder="Your translation..."
              rows={3}
              dir={exercise.question.includes('Arabic') ? 'rtl' : 'auto'}
            />
          </div>
        );
      
      case 'matching':
        if (!exercise.options) return null;
        
        const items = exercise.options.flatMap(pair => pair.split('-'));
        const leftItems = exercise.options.map(pair => pair.split('-')[0]);
        const rightItems = exercise.options.map(pair => pair.split('-')[1]);

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {leftItems.map((item, index) => (
                  <div
                    key={`left-${index}`}
                    onClick={() => !isItemMatched(item) && handleMatchItem(item)}
                    className={`p-3 rounded border ${
                      isItemMatched(item)
                        ? 'bg-green-800 border-green-700'
                        : selectedItem === item
                        ? 'bg-blue-700 border-blue-600'
                        : 'bg-blue-900 border-blue-800 cursor-pointer hover:bg-blue-800'
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {rightItems.map((item, index) => (
                  <div
                    key={`right-${index}`}
                    onClick={() => !isItemMatched(item) && handleMatchItem(item)}
                    className={`p-3 rounded border ${
                      isItemMatched(item)
                        ? 'bg-green-800 border-green-700'
                        : selectedItem === item
                        ? 'bg-blue-700 border-blue-600'
                        : 'bg-blue-900 border-blue-800 cursor-pointer hover:bg-blue-800'
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {Object.keys(matchPairs).length === exercise.options.length && !submitted && (
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500 transition-colors"
              >
                Check Answers
              </button>
            )}
          </div>
        );
      
      default:
        return <p>Unknown exercise type</p>;
    }
  };

  return (
    <div className="bg-blue-950 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">{exercise.question}</h3>
      
      {renderExerciseContent()}
      
      {exercise.type !== 'matching' && (
        <div className="mt-6 flex justify-between items-center">
          {submitted && (
            <div className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct! Well done.' : `Incorrect. The correct answer is: ${exercise.correctAnswer}`}
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            disabled={submitted || userAnswer === ''}
            className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            {submitted ? 'Submitted' : 'Submit Answer'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;