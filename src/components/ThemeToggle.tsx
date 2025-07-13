import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-surface border border-gray-600 rounded-full transition-all duration-300 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      aria-label={`Basculer vers le thème ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-primary rounded-full transition-transform duration-300 flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      >
        {theme === 'light' ? (
          <Sun size={12} className="text-background" />
        ) : (
          <Moon size={12} className="text-background" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;