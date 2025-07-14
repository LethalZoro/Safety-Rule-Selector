import React from 'react';
import SafetyRuleCard from './SafetyRuleCard';
import { safetyRules } from '../data/safetyRules';
import { Shield, AlertTriangle, Users, Clock } from 'lucide-react';

const RulesPage: React.FC = () => {
  const getCategoryStats = () => {
    const stats = safetyRules.reduce((acc, rule) => {
      acc[rule.category] = (acc[rule.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const getPriorityStats = () => {
    const stats = safetyRules.reduce((acc, rule) => {
      acc[rule.priority] = (acc[rule.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const categoryStats = getCategoryStats();
  const priorityStats = getPriorityStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-scale">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-cyan-400 mr-3 animate-float" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Safety Rules
          </h1>
        </div>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Comprehensive safety protocols and procedures for workplace operations. 
          Each rule includes detailed discussion points for team training sessions.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-dark text-white rounded-xl shadow-lg p-6 border border-cyan-400/30 hover-lift animate-slide-in-bottom">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400 mr-2" />
            <h3 className="text-lg font-semibold text-cyan-300">By Priority</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(priorityStats).map(([priority, count]) => (
              <div key={priority} className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  priority === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-400/50' :
                  priority === 'High' ? 'bg-orange-500/20 text-orange-300 border border-orange-400/50' :
                  'bg-yellow-500/20 text-yellow-300 border border-yellow-400/50'
                }`}>
                  {priority}
                </span>
                <span className="font-semibold text-cyan-300">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-dark text-white rounded-xl shadow-lg p-6 border border-cyan-400/30 hover-lift animate-slide-in-bottom" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-cyan-400 mr-2" />
            <h3 className="text-lg font-semibold text-cyan-300">By Category</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(categoryStats).slice(0, 3).map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm text-slate-300">{category}</span>
                <span className="font-semibold text-cyan-300">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-dark text-white rounded-xl shadow-lg p-6 border border-cyan-400/30 hover-lift animate-slide-in-bottom" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-teal-400 mr-2" />
            <h3 className="text-lg font-semibold text-cyan-300">Training Info</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Total Rules</span>
              <span className="font-semibold text-cyan-300">{safetyRules.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Session Time</span>
              <span className="font-semibold text-cyan-300">5 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Discussion Points</span>
              <span className="font-semibold text-cyan-300">{safetyRules.reduce((acc, rule) => acc + rule.discussionPoints.length, 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safetyRules.map((rule) => (
          <SafetyRuleCard 
            key={rule.id}
            rule={rule} 
            isSelected={false}
          />
        ))}
      </div>
    </div>
  );
};

export default RulesPage;