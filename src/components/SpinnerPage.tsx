import React, { useState, useEffect } from 'react';
import SimpleSpinner from './SimpleSpinner';
import Timer from './Timer';
import SafetyRuleCard from './SafetyRuleCard';
import { safetyRules } from '../data/safetyRules';
import { Play, RefreshCw } from 'lucide-react';

interface SpinnerPageProps {
  timerDuration: number;
}

const SpinnerPage: React.FC<SpinnerPageProps> = ({ timerDuration }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedRuleIndex, setSelectedRuleIndex] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [gamePhase, setGamePhase] = useState<'idle' | 'spinning' | 'selected' | 'discussion' | 'complete'>('idle');
  const [usedRules, setUsedRules] = useState<number[]>([]);

  // Auto-scroll to bottom when timer starts and when timer ends
  useEffect(() => {
    if (isTimerActive || gamePhase === 'complete') {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 500); // Small delay to ensure the content is rendered
    }
  }, [isTimerActive, gamePhase]);

  const handleStartSpin = () => {
    if (usedRules.length >= safetyRules.length) {
      setUsedRules([]);
    }
    
    const availableRules = safetyRules.filter((_, index) => !usedRules.includes(index));
    const randomIndex = Math.floor(Math.random() * availableRules.length);
    const selectedRule = safetyRules.indexOf(availableRules[randomIndex]);
    
    setSelectedRuleIndex(selectedRule);
    setIsSpinning(true);
    setGamePhase('spinning');
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);
    setGamePhase('discussion');
    setIsTimerActive(true);
    if (selectedRuleIndex !== null) {
      setUsedRules(prev => [...prev, selectedRuleIndex]);
    }
  };

  const handleTimerComplete = () => {
    setIsTimerActive(false);
    setGamePhase('complete');
  };

  const handleReset = () => {
    setSelectedRuleIndex(null);
    setIsTimerActive(false);
    setGamePhase('idle');
  };

  const selectedRule = selectedRuleIndex !== null ? safetyRules[selectedRuleIndex] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Fixed Timer */}
      {isTimerActive && (
        <div className="fixed top-20 right-4 z-50 animate-fade-in-scale">
          <Timer
            isActive={isTimerActive}
            onComplete={handleTimerComplete}
            duration={timerDuration}
          />
        </div>
      )}

      {/* Control Panel */}
      <div className="glass-dark text-white rounded-xl shadow-2xl p-6 mb-8 border border-cyan-400/30 animate-fade-in-scale hover-lift">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Safety Rule Selector
            </h2>
            <p className="text-slate-300">Click "Start Training" to randomly select a safety rule for discussion</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Rules Used: {usedRules.length}/{safetyRules.length}</p>
            <div className="w-32 h-2 glass rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-500 animate-pulse-glow"
                style={{ width: `${(usedRules.length / safetyRules.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handleStartSpin}
            disabled={isSpinning || isTimerActive}
            className={`flex items-center px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
              isSpinning || isTimerActive
                ? 'glass opacity-50 cursor-not-allowed text-slate-400'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-glow'
            }`}
          >
            <Play className="w-5 h-5 mr-2" />
            {isSpinning ? 'Selecting...' : 'Start Training Session'}
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center px-6 py-3 glass hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300 hover-lift"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Spinner */}
      <div className="flex justify-center mb-8">
        <SimpleSpinner
          isSpinning={isSpinning}
          onSpinComplete={handleSpinComplete}
          selectedRule={selectedRuleIndex || 0}
          totalRules={safetyRules.length}
        />
      </div>

      {/* Selected Safety Rule */}
      {selectedRule && (gamePhase === 'discussion' || gamePhase === 'complete') && (
        <div className="mb-8 animate-fade-in-scale">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Selected Safety Rule
            </h3>
            <p className="text-white/80">
              {gamePhase === 'discussion' ? 'Currently discussing - timer is running' :
               'Discussion completed'}
            </p>
          </div>
          <SafetyRuleCard rule={selectedRule} isSelected={true} />
        </div>
      )}

      {/* Completion Message */}
      {gamePhase === 'complete' && (
        <div className="text-center py-8 animate-fade-in-scale">
          <div className="glass border-2 border-emerald-400/50 rounded-xl p-6 max-w-md mx-auto shadow-lg hover-lift">
            <div className="text-emerald-400 mb-2">
              <svg className="w-16 h-16 mx-auto animate-float" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-emerald-300 mb-2">Training Session Complete!</h3>
            <p className="text-emerald-200">Great job discussing safety protocols. Ready for your meeting!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinnerPage;