import React, { useState } from 'react';
import { Word } from '../types';
import { Volume as VolumeUp, Star, StarOff } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface WordCardProps {
  word: Word;
  showTranslation?: boolean;
}

const WordCard: React.FC<WordCardProps> = ({ word, showTranslation = false }) => {
  const [flipped, setFlipped] = useState(showTranslation);
  const [isRotating, setIsRotating] = useState(false);
  const { userProgress, markWordAsMastered } = useAppContext();

  const isWordMastered = userProgress.masteredWords.includes(word.id);

  const handleFlip = () => {
    if (!isRotating) {
      setIsRotating(true);
      setFlipped(!flipped);
      setTimeout(() => setIsRotating(false), 300);
    }
  };

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA'; // Set language to Arabic
    window.speechSynthesis.speak(utterance);
  };

  const toggleMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    markWordAsMastered(word.id);
  };

  return (
    <div 
      className={`relative select-none cursor-pointer h-40 w-full max-w-md mx-auto bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 ${
        isRotating ? 'scale-95' : 'scale-100'
      }`}
      onClick={handleFlip}
    >
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
        flipped ? 'opacity-0' : 'opacity-100'
      }`}>
        <h3 className="text-3xl font-bold text-white text-center mb-2">{word.arabic}</h3>
        <button 
          onClick={(e) => { e.stopPropagation(); handleSpeak(word.arabic); }}
          className="mt-2 text-blue-200 hover:text-white transition-colors"
        >
          <VolumeUp className="w-6 h-6" />
        </button>
      </div>

      <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
        flipped ? 'opacity-100' : 'opacity-0'
      }`}>
        <h3 className="text-xl font-bold text-white mb-1">{word.bangla}</h3>
        <p className="text-sm text-blue-200">{word.english}</p>
        {word.example && (
          <p className="mt-3 text-sm text-blue-300 text-center">{word.example}</p>
        )}
      </div>

      <button 
        onClick={toggleMastered} 
        className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-300 transition-colors"
      >
        {isWordMastered ? (
          <Star className="w-5 h-5 fill-current" />
        ) : (
          <StarOff className="w-5 h-5" />
        )}
      </button>

      <div className="absolute bottom-2 left-2">
        <span className={`text-xs px-2 py-1 rounded-full ${
          word.difficulty === 'easy' ? 'bg-green-700 text-green-100' : 
          word.difficulty === 'medium' ? 'bg-yellow-700 text-yellow-100' : 
          'bg-red-700 text-red-100'
        }`}>
          {word.difficulty}
        </span>
      </div>
    </div>
  );
};

export default WordCard;