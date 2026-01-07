
import React, { useState } from 'react';
import Header from './components/Header';
import JDInput from './components/JDInput';
import ResultDisplay from './components/ResultDisplay';
import { performInterviewResearch } from './services/geminiService';
import { JDData, ResearchResult } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResearch = async (data: JDData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const researchData = await performInterviewResearch(data);
      setResult(researchData);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during research.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 max-w-5xl">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Don't walk into interviews blind.
          </h2>
          <p className="text-slate-600 text-lg">
            Our agent scrapes thousands of data points from Glassdoor, AmbitionBox, and GeeksforGeeks to extract the exact technical questions asked for your specific role.
          </p>
        </div>

        <JDInput onSubmit={handleResearch} isLoading={loading} />

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start space-x-3">
            <i className="fas fa-exclamation-circle mt-1"></i>
            <div>
              <p className="font-bold">Research Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-12 text-center animate-pulse">
            <div className="inline-flex items-center space-x-4 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm mb-6">
              <i className="fas fa-spider text-indigo-500"></i>
              <span className="text-slate-600 font-medium">Agent is scanning Glassdoor & AmbitionBox...</span>
            </div>
            <div className="flex flex-col items-center space-y-4">
               <div className="h-4 w-64 bg-slate-200 rounded-full"></div>
               <div className="h-4 w-48 bg-slate-200 rounded-full"></div>
               <div className="h-4 w-56 bg-slate-200 rounded-full"></div>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="mt-12">
            <ResultDisplay result={result} />
          </div>
        )}

        {/* Feature Highlights */}
        {!result && !loading && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-xl">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Deep Web Crawl</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Uses real-time search grounding to scan current community forums and experience blogs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4 text-xl">
                <i className="fas fa-check-double"></i>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Verified Sources</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Every question is linked to its source URL. Zero hallucinations or "predicted" questions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 text-xl">
                <i className="fas fa-code"></i>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Technical Focus</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Prioritizes Data Structures, Algorithms, System Design, and Platform-specific tech stack questions.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-slate-200 py-10 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            Powered by Gemini 3 Flash Intelligence & Real-time Web Grounding.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-slate-400">
            <i className="fab fa-github hover:text-indigo-600 cursor-pointer"></i>
            <i className="fab fa-twitter hover:text-indigo-600 cursor-pointer"></i>
            <i className="fab fa-linkedin hover:text-indigo-600 cursor-pointer"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
