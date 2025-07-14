import React, { useState, useEffect } from 'react';
import { Zap, Target } from 'lucide-react';

interface SimpleSpinnerProps {
  isSpinning: boolean;
  onSpinComplete: () => void;
  selectedRule: number;
  totalRules: number;
}

const SimpleSpinner: React.FC<SimpleSpinnerProps> = ({ 
  isSpinning, 
  onSpinComplete, 
  selectedRule, 
  totalRules 
}) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [spinCount, setSpinCount] = useState(0);

  useEffect(() => {
    if (!isSpinning) return;

    let count = 0;
    const maxSpins = 20 + Math.floor(Math.random() * 15); // 20-35 spins
    
    const spinInterval = setInterval(() => {
      setCurrentNumber(Math.floor(Math.random() * totalRules) + 1);
      count++;
      setSpinCount(count);
      
      if (count >= maxSpins) {
        clearInterval(spinInterval);
        setCurrentNumber(selectedRule + 1);
        setTimeout(() => {
          onSpinComplete();
          setSpinCount(0);
        }, 500);
      }
    }, 100 + (count * 8)); // Gradually slow down

    return () => clearInterval(spinInterval);
  }, [isSpinning, selectedRule, totalRules, onSpinComplete]);

  return (
    <div className="flex flex-col items-center">
      <div className="glass-dark text-white rounded-2xl shadow-2xl p-12 border border-cyan-400/30 hover-lift animate-fade-in-scale">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Target className="w-8 h-8 text-cyan-400 mr-3" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Safety Rule Selector</h3>
          </div>
          
          <div className="relative">
            <div className={`text-8xl font-bold transition-all duration-150 ${
              isSpinning ? 'animate-pulse scale-110 text-cyan-400' : 'scale-100 text-cyan-300'
            }`}>
              {currentNumber}
            </div>
            
            {isSpinning && (
              <div className="absolute -top-4 -right-4">
                <Zap className="w-8 h-8 text-amber-400 animate-bounce" />
              </div>
            )}
          </div>
          
          <div className="mt-6 text-lg text-slate-300">
            {isSpinning ? 'Selecting safety rule...' : `Rule ${currentNumber} selected`}
          </div>
          
          {isSpinning && (
            <div className="mt-4">
              <div className="text-sm text-slate-400 mb-2">Spinning... ({spinCount})</div>
              <div className="w-64 h-2 glass rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse-glow" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-center max-w-md">
        <div className="text-sm text-slate-300">
          {isSpinning ? 'Randomly selecting from safety rules...' : 'Timer will start automatically'}
        </div>
      </div>
    </div>
  );
};

export default SimpleSpinner;