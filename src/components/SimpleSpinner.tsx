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
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-12 border-4 border-slate-300">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Target className="w-8 h-8 text-cyan-600 mr-3" />
            <h3 className="text-2xl font-bold text-slate-800">Safety Rule Selector</h3>
          </div>
          
          <div className="relative">
            <div className={`text-8xl font-bold text-blue-600 transition-all duration-150 ${
              isSpinning ? 'animate-pulse scale-110 text-cyan-500' : 'scale-100 text-teal-600'
            }`}>
              {currentNumber}
            </div>
            
            {isSpinning && (
              <div className="absolute -top-4 -right-4">
                <Zap className="w-8 h-8 text-amber-500 animate-bounce" />
              </div>
            )}
          </div>
          
          <div className="mt-6 text-lg text-slate-600">
            {isSpinning ? 'Selecting safety rule...' : `Rule ${currentNumber} selected`}
          </div>
          
          {isSpinning && (
            <div className="mt-4">
              <div className="text-sm text-slate-500 mb-2">Spinning... ({spinCount})</div>
              <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-center max-w-md">
        <div className="text-sm text-gray-600">
          {isSpinning ? 'Randomly selecting from safety rules...' : 'Timer will start automatically'}
        </div>
      </div>
    </div>
  );
};

export default SimpleSpinner;