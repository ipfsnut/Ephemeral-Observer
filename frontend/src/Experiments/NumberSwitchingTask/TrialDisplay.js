import React from 'react';
import { CONFIG } from '../../config/numberSwitchingConfig';

const TrialDisplay = ({ currentDigit, currentTrialIndex, totalTrials, experimentState }) => {
  const renderContent = () => {
    switch (experimentState) {
      case 'SHOWING_DIGIT':
      case 'AWAITING_RESPONSE':
        return (
          <>
            <div className="digit-display text-6xl font-bold mb-4">{currentDigit}</div>
            <p className="text-xl mb-2">
              Press '{CONFIG.KEYS.ODD}' for odd numbers, '{CONFIG.KEYS.EVEN}' for even numbers
            </p>
          </>
        );
      case 'READY':
        return <div>Press any key to start the experiment</div>;
      case 'TRIAL_COMPLETE':
        return <div>Trial complete. Press any key to continue.</div>;
      case 'EXPERIMENT_COMPLETE':
        return <div>Experiment complete. Thank you for participating!</div>;
      default:
        return <div>Preparing experiment...</div>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {renderContent()}
      {experimentState !== 'EXPERIMENT_COMPLETE' && (
        <p className="text-lg">
          Trial: {currentTrialIndex + 1} / {totalTrials}
        </p>
      )}
    </div>
  );
};

export default TrialDisplay;