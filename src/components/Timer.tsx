import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  isActive: boolean;
  onComplete: () => void;
  duration: number; // in seconds
}

const Timer: React.FC<TimerProps> = ({ isActive, onComplete, duration = 300 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration);
      setIsPaused(false);
    }
  }, [isActive, duration]);

  useEffect(() => {
    if (!isActive || isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isPaused, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((duration - timeLeft) / duration) * 100;

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setTimeLeft(duration);
    setIsPaused(false);
  };

  if (!isActive) return null;

  return (
    <div className="glass-dark rounded-lg shadow-2xl p-4 max-w-sm border-2 border-cyan-400/50 text-white hover-lift animate-pulse-glow">
      <div className="flex items-center justify-center mb-4">
        <Clock className="w-5 h-5 text-cyan-400 mr-2 animate-float" />
        <h3 className="text-base font-semibold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
          Discussion Timer
        </h3>
      </div>
      
      <div className="text-center mb-4">
        <div className={`text-3xl font-bold transition-all duration-300 ${
          timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-cyan-300'
        }`}>
          {formatTime(timeLeft)}
        </div>
        <div className="text-sm text-slate-300 mt-1">
          {timeLeft <= 30 ? 'Time almost up!' : 'Discussion time remaining'}
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full glass rounded-full h-2 overflow-hidden">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              timeLeft <= 30 ? 'bg-red-400 animate-pulse-glow' : 'bg-cyan-400'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>0:00</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        <button
          onClick={handleTogglePause}
          className={`flex items-center px-3 py-1 rounded text-sm font-medium transition-all duration-300 hover-lift ${
            isPaused 
              ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/50' 
              : 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/50'
          }`}
        >
          {isPaused ? <Play className="w-3 h-3 mr-1" /> : <Pause className="w-3 h-3 mr-1" />}
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        
        <button
          onClick={handleReset}
          className="flex items-center px-3 py-1 glass hover:bg-white/20 text-white rounded text-sm font-medium transition-all duration-300 hover-lift"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </button>
      </div>

      {timeLeft <= 30 && timeLeft > 0 && (
        <div className="mt-3 p-2 bg-red-500/20 border border-red-400/50 rounded animate-pulse">
          <p className="text-red-300 text-xs font-medium text-center">
            ⚠️ Final 30 seconds - wrap up discussion
          </p>
        </div>
      )}
    </div>
  );
};

export default Timer;