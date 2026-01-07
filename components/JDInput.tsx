
import React, { useState } from 'react';
import { JDData } from '../types';

interface JDInputProps {
  onSubmit: (data: JDData) => void;
  isLoading: boolean;
}

const JDInput: React.FC<JDInputProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<JDData>({
    company: '',
    role: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.company && formData.role) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <i className="fas fa-file-alt text-indigo-500 mr-2"></i>
        Opportunity Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Google, Stripe, Zomato"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Software Engineer"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Job Description (Optional Context)</label>
          <textarea
            rows={4}
            placeholder="Paste the JD here to help the agent narrow down specific tech stack questions..."
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all flex items-center justify-center space-x-2 ${
            isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-md hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <>
              <i className="fas fa-circle-notch fa-spin"></i>
              <span>Researching Platforms...</span>
            </>
          ) : (
            <>
              <i className="fas fa-microchip"></i>
              <span>Generate Interview Brief</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default JDInput;
