import React, { useState } from 'react';
import { VideoInput } from './VideoInput';
import { SummaryDisplay } from './SummaryDisplay';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { summarizeVideo } from '../../utils/api';
import { SummaryResponse } from '../../types';

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVideoSubmit = async (videoUrl: string) => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const result = await summarizeVideo(videoUrl);
      setSummary(result);
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
      console.error('Summarization error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <VideoInput onSubmit={handleVideoSubmit} loading={loading} />
        
        {loading && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
            <LoadingSpinner size="lg" text="Analyzing video and generating summary..." />
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {summary && <SummaryDisplay summary={summary} />}
      </div>
    </div>
  );
};