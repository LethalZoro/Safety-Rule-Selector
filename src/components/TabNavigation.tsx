import React from 'react';
import { Target, BookOpen } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'spinner' | 'rules';
  onTabChange: (tab: 'spinner' | 'rules') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="glass shadow-lg border-b border-white/20 animate-slide-in-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <button
            onClick={() => onTabChange('spinner')}
            className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-all duration-300 hover-lift ${
              activeTab === 'spinner'
                ? 'border-cyan-400 text-cyan-300 bg-white/10 shadow-lg animate-pulse-glow'
                : 'border-transparent text-white/80 hover:text-white hover:border-cyan-400/50 hover:bg-white/5'
            }`}
          >
            <Target className={`w-4 h-4 mr-2 transition-all duration-300 ${
              activeTab === 'spinner' ? 'animate-float' : ''
            }`} />
            Safety Training
          </button>
          
          <button
            onClick={() => onTabChange('rules')}
            className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-all duration-300 hover-lift ${
              activeTab === 'rules'
                ? 'border-cyan-400 text-cyan-300 bg-white/10 shadow-lg animate-pulse-glow'
                : 'border-transparent text-white/80 hover:text-white hover:border-cyan-400/50 hover:bg-white/5'
            }`}
          >
            <BookOpen className={`w-4 h-4 mr-2 transition-all duration-300 ${
              activeTab === 'rules' ? 'animate-float' : ''
            }`} />
            All Safety Rules
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TabNavigation;