import React, { useState, useEffect, useRef } from 'react';
import { Shield, Users, Clock, ChevronDown } from 'lucide-react';

interface HeaderProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}

const Header: React.FC<HeaderProps> = ({ duration, onDurationChange }) => {
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const durationOptions = [
    { value: 180, label: '3 Min' },
    { value: 300, label: '5 Min' },
    { value: 420, label: '7 Min' },
    { value: 600, label: '10 Min' },
    { value: 900, label: '15 Min' }
  ];

  const getCurrentDurationLabel = () => {
    const option = durationOptions.find(opt => opt.value === duration);
    return option ? option.label : `${Math.floor(duration / 60)} Min`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDurationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="glass-dark text-white shadow-2xl border-b border-cyan-400/30 animate-slide-in-top sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 animate-fade-in-scale">
            <Shield className="w-8 h-8 text-cyan-400 drop-shadow-lg animate-float" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Safety Trainer
              </h1>
              <p className="text-sm text-slate-300">Pre-Meeting Safety Discussion Tool</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm hover-lift glass px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10">
              <Users className="w-4 h-4 text-cyan-300" />
              <span>Team Training</span>
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDurationDropdown(!showDurationDropdown)}
                className="flex items-center space-x-2 text-sm hover-lift glass px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
              >
                <Clock className="w-4 h-4 text-cyan-300" />
                <span>{getCurrentDurationLabel()} Sessions</span>
                <ChevronDown className={`w-3 h-3 text-cyan-300 transition-transform duration-200 ${showDurationDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showDurationDropdown && (
                <div className="absolute right-0 top-full mt-2 glass-dark border border-cyan-400/30 rounded-lg shadow-xl z-50 min-w-[120px]">
                  {durationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onDurationChange(option.value);
                        setShowDurationDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                        duration === option.value
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;