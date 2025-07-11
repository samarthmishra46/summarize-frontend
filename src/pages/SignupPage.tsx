import React from 'react';
import { SignupForm } from '../components/Auth/SignupForm';

export const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <SignupForm />
    </div>
  );
};