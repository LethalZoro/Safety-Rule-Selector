import React from 'react';
import { Shield, Users, Clock } from 'lucide-react';

const Header: React.FC = () => {
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
            <div className="flex items-center space-x-2 text-sm hover-lift glass px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10">
              <Clock className="w-4 h-4 text-cyan-300" />
              <span>5 Min Sessions</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;