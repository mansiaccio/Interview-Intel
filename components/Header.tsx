
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 py-6 mb-8">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <i className="fas fa-search-plus text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Interview Intel</h1>
            <p className="text-sm text-slate-500 font-medium">Verified Question Research Agent</p>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold">
            <i className="fas fa-shield-alt mr-1"></i> Anti-Hallucination Active
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
