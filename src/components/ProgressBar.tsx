import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  total, 
  label, 
  showPercentage = true 
}) => {
  const percentage = Math.round((progress / total) * 100);
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-blue-100">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-blue-100">{percentage}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-blue-900 rounded-full h-2.5">
        <div 
          className="bg-blue-400 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;