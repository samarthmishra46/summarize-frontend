import React, { useState } from 'react';
import { Link, Send } from 'lucide-react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

interface VideoInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export const VideoInput: React.FC<VideoInputProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateYouTubeUrl = (url: string): boolean => {
    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^https?:\/\/youtu\.be\/[\w-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!validateYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    onSubmit(url.trim());
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Summarize YouTube Video
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter a YouTube URL to get an AI-generated summary
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-12"
            error={error}
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          loading={loading}
          disabled={loading || !url.trim()}
        >
          <Send className="w-4 h-4 mr-2" />
          Generate Summary
        </Button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          Supported formats:
        </h3>
        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          <li>• https://www.youtube.com/watch?v=VIDEO_ID</li>
          <li>• https://youtu.be/VIDEO_ID</li>
          <li>• https://www.youtube.com/embed/VIDEO_ID</li>
        </ul>
      </div>
    </div>
  );
};