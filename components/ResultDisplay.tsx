
import React from 'react';
import { ResearchResult } from '../types';

interface ResultDisplayProps {
  result: ResearchResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  // Simple markdown-to-html like converter for the text response
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('###')) return <h3 key={i} className="text-lg font-bold mt-6 mb-2 text-indigo-700">{line.replace('###', '')}</h3>;
      if (line.startsWith('##')) return <h2 key={i} className="text-xl font-bold mt-8 mb-3 border-b pb-2 text-slate-800">{line.replace('##', '')}</h2>;
      if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-4 mb-2 text-slate-700">{line.substring(2)}</li>;
      if (line.trim() === '') return <div key={i} className="h-2"></div>;
      return <p key={i} className="mb-2 leading-relaxed text-slate-700">{line}</p>;
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{result.company}</h2>
            <p className="text-indigo-600 font-medium">{result.role} Interview Intel</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-xs text-slate-400">
            <i className="fas fa-clock"></i>
            <span>Verified 2024-2025 Data</span>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          {formatText(result.rawText)}
        </div>
      </div>

      <div className="bg-slate-100 rounded-xl p-6 border border-slate-200">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center">
          <i className="fas fa-link mr-2"></i>
          Grounded Sources ({result.sources.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {result.sources.length > 0 ? (
            result.sources.map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all flex items-center group"
              >
                <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center mr-3 group-hover:bg-indigo-100 transition-colors">
                  <i className="fas fa-external-link-alt text-xs text-indigo-500"></i>
                </div>
                <span className="text-xs font-medium text-slate-700 truncate">{source.title}</span>
              </a>
            ))
          ) : (
            <p className="text-sm text-slate-400 italic col-span-full">No direct external links indexed for this specific query.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
