import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import WordCard from '../components/WordCard';
import { FilterX, Filter, Search, ArrowLeft, ArrowRight } from 'lucide-react';

const PracticePage: React.FC = () => {
  const { words, userProgress } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showMasteredOnly, setShowMasteredOnly] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    words.forEach(word => {
      word.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [words]);

  // Filter words based on search and filters
  const filteredWords = useMemo(() => {
    return words.filter(word => {
      // Search term filter
      const matchesSearch = 
        !searchTerm ||
        word.arabic.includes(searchTerm) ||
        word.bangla.includes(searchTerm) ||
        word.english.toLowerCase().includes(searchTerm.toLowerCase());

      // Tags filter
      const matchesTags = 
        selectedTags.length === 0 ||
        selectedTags.some(tag => word.tags.includes(tag));

      // Difficulty filter
      const matchesDifficulty = 
        selectedDifficulty === 'all' ||
        word.difficulty === selectedDifficulty;

      // Mastered filter
      const matchesMastered = 
        !showMasteredOnly ||
        userProgress.masteredWords.includes(word.id);

      return matchesSearch && matchesTags && matchesDifficulty && matchesMastered;
    });
  }, [words, searchTerm, selectedTags, selectedDifficulty, showMasteredOnly, userProgress.masteredWords]);

  const handleNextWord = () => {
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0); // Loop back to the first word
    }
  };

  const handlePrevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    } else {
      setCurrentWordIndex(filteredWords.length - 1); // Loop to the last word
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setCurrentWordIndex(0); // Reset index when changing filters
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSelectedDifficulty('all');
    setShowMasteredOnly(false);
    setCurrentWordIndex(0);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Vocabulary Practice</h1>
        <p className="text-blue-200">Review and practice your Arabic vocabulary</p>
      </div>

      <div className="bg-blue-950 rounded-lg p-6 shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Search words in Arabic, Bangla, or English"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentWordIndex(0);
              }}
              className="w-full pl-10 pr-4 py-2 bg-blue-900 border border-blue-800 rounded text-white placeholder-blue-400"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value);
                setCurrentWordIndex(0);
              }}
              className="px-4 py-2 bg-blue-900 border border-blue-800 rounded text-white"
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button
              onClick={() => setShowMasteredOnly(!showMasteredOnly)}
              className={`px-4 py-2 border rounded ${
                showMasteredOnly 
                  ? 'bg-yellow-700 border-yellow-600 text-white' 
                  : 'bg-blue-900 border-blue-800 text-white'
              }`}
            >
              Mastered
            </button>

            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-800 border border-blue-700 rounded text-white hover:bg-blue-700 transition-colors"
            >
              <FilterX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Filter className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-blue-200">Filter by tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-900 text-blue-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-blue-300">
          Showing {filteredWords.length} {filteredWords.length === 1 ? 'word' : 'words'}
        </div>
      </div>

      {filteredWords.length > 0 ? (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Flashcards</h2>
            <div className="text-sm text-blue-300">
              Card {currentWordIndex + 1} of {filteredWords.length}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <WordCard word={filteredWords[currentWordIndex]} />
            
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handlePrevWord}
                className="flex items-center px-4 py-2 bg-blue-800 rounded text-white hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
              
              <button
                onClick={handleNextWord}
                className="flex items-center px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-blue-300">No words match your search criteria</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-blue-700 rounded text-white hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {filteredWords.length > 0 && (
        <div className="bg-blue-950 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">All Words</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWords.slice(0, 9).map((word) => (
              <div key={word.id} className="bg-blue-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white">{word.arabic}</h3>
                <p className="text-blue-200">{word.bangla}</p>
                <p className="text-sm text-blue-300">{word.english}</p>
              </div>
            ))}
            {filteredWords.length > 9 && (
              <div className="bg-blue-900 p-4 rounded-lg flex items-center justify-center">
                <span className="text-blue-200">+{filteredWords.length - 9} more words</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticePage;