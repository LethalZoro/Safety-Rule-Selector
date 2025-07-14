import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { SafetyRule } from '../data/safetyRules';

interface SafetyRuleCardProps {
  rule: SafetyRule;
  isSelected: boolean;
}

const SafetyRuleCard: React.FC<SafetyRuleCardProps> = ({ rule, isSelected }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/20 text-red-200 border-red-400/50';
      case 'High': return 'bg-orange-500/20 text-orange-200 border-orange-400/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-200 border-yellow-400/50';
      default: return 'bg-gray-500/20 text-gray-200 border-gray-400/50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Emergency': return <AlertTriangle className="w-5 h-5" />;
      case 'Equipment Safety': return <CheckCircle className="w-5 h-5" />;
      case 'Operations': return <Clock className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className={`glass-dark text-white rounded-lg shadow-lg p-6 transition-all duration-300 hover-lift ${
      isSelected ? 'ring-4 ring-cyan-400 shadow-2xl transform scale-105 animate-pulse-glow border-cyan-400/50' : 'hover:shadow-xl border-white/20'
    } border`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-cyan-400">
            {getCategoryIcon(rule.category)}
          </div>
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              {rule.title}
            </h3>
            <p className="text-sm text-slate-300">{rule.category}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rule.priority)}`}>
          {rule.priority}
        </span>
      </div>

      <p className="text-slate-200 mb-4 leading-relaxed">{rule.description}</p>

      <div className="border-t border-white/20 pt-4">
        <h4 className="font-semibold text-cyan-300 mb-2">Discussion Points:</h4>
        <ul className="space-y-1">
          {rule.discussionPoints.map((point, index) => (
            <li key={index} className="text-sm text-slate-300 flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SafetyRuleCard;