import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import LessonPage from './pages/LessonPage';
import PracticePage from './pages/PracticePage';
import ExamsPage from './pages/ExamsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 text-white flex">
          <NavBar />
          <main className="flex-1 sm:ml-60 pb-20 sm:pb-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/lesson/:dayId" element={<LessonPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/exams" element={<ExamsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;