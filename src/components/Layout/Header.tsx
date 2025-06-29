import React from 'react';
import { Moon, Sun, LogOut, Youtube } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../UI/Button';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Youtube className="w-8 h-8 text-red-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              YT Summarizer
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, {user.name}
              </span>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};