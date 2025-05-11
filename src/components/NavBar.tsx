import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Layers, BookOpen, Award, User, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useAppContext();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 w-full sm:w-auto sm:h-full sm:left-0 bg-blue-950 text-white p-2 sm:p-4 z-10">
      <div className="flex sm:flex-col justify-around sm:justify-start sm:h-full">
        <div className="hidden sm:flex items-center mb-8 mt-4">
          <Layers className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">أتعلم</h1>
        </div>

        <Link 
          to="/" 
          className={`flex flex-col sm:flex-row items-center p-2 sm:mb-4 rounded-lg transition-colors ${
            isActive('/') ? 'bg-blue-800' : 'hover:bg-blue-900'
          }`}
        >
          <BookOpen className="h-6 w-6 sm:mr-2" />
          <span className="text-xs sm:text-sm">Lessons</span>
        </Link>

        <Link 
          to="/practice" 
          className={`flex flex-col sm:flex-row items-center p-2 sm:mb-4 rounded-lg transition-colors ${
            isActive('/practice') ? 'bg-blue-800' : 'hover:bg-blue-900'
          }`}
        >
          <Layers className="h-6 w-6 sm:mr-2" />
          <span className="text-xs sm:text-sm">Practice</span>
        </Link>

        <Link 
          to="/exams" 
          className={`flex flex-col sm:flex-row items-center p-2 sm:mb-4 rounded-lg transition-colors ${
            isActive('/exams') ? 'bg-blue-800' : 'hover:bg-blue-900'
          }`}
        >
          <Award className="h-6 w-6 sm:mr-2" />
          <span className="text-xs sm:text-sm">Exams</span>
        </Link>

        <Link 
          to="/profile" 
          className={`flex flex-col sm:flex-row items-center p-2 sm:mb-4 rounded-lg transition-colors ${
            isActive('/profile') ? 'bg-blue-800' : 'hover:bg-blue-900'
          }`}
        >
          <User className="h-6 w-6 sm:mr-2" />
          <span className="text-xs sm:text-sm">Profile</span>
        </Link>

        <div className="sm:mt-auto">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="flex flex-col sm:flex-row items-center p-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
            {isDarkMode ? (
              <>
                <Sun className="h-6 w-6 sm:mr-2" />
                <span className="text-xs sm:text-sm">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-6 w-6 sm:mr-2" />
                <span className="text-xs sm:text-sm">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;