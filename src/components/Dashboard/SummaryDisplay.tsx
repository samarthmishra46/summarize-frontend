import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Copy, Check, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { SummaryResponse } from '../../types';
import { Button } from '../UI/Button';

interface SummaryDisplayProps {
  summary: SummaryResponse;
}

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMarkdown = (content: string) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeId = Math.random().toString(36).substr(2, 9);
            
            if (!inline && match) {
              const codeContent = String(children).replace(/\n$/, '');
              return (
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(codeContent, codeId)}
                  >
                    {copiedCode === codeId ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className={`${className} overflow-x-auto p-4 rounded-lg bg-gray-900 text-gray-100`}>
                    <code {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            }
            
            return (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
          h3({ children, ...props }) {
            const sectionId = String(children).toLowerCase().replace(/\s+/g, '-');
            const isExpanded = expandedSections.has(sectionId);
            
            return (
              <details className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <summary 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSection(sectionId);
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100" {...props}>
                    {children}
                  </h3>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </summary>
                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                    {/* Content will be rendered by the next sibling elements */}
                  </div>
                )}
              </details>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <div className="space-y-6">
      {/* Video Info Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {summary.videoTitle}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Summarized on {formatDate(summary.timestamp)}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(summary.videoUrl, '_blank')}
            className="ml-4"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Watch Video
          </Button>
        </div>
      </div>

      {/* Summary Content */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {renderMarkdown(summary.summary)}
          </div>
        </div>
      </div>
    </div>
  );
};