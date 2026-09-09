import React from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '../common/Button';

export const SpeechInput = ({
  isListening,
  onStart,
  onStop,
  hasSupport,
}) => {
  if (!hasSupport) {
    return (
      <span className="text-xs text-slate-500 italic">
        (Speech-to-text not supported on this browser; keyboard input active)
      </span>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant={isListening ? 'danger' : 'secondary'}
        size="sm"
        onClick={isListening ? onStop : onStart}
        className={isListening ? 'animate-pulse' : ''}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4 text-red-400" />
            <span>Stop Recording</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-indigo-400" />
            <span>Voice Input (Speech-to-Text)</span>
          </>
        )}
      </Button>

      {isListening && (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-red-400">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          Listening to your answer... Speak clearly
        </span>
      )}
    </div>
  );
};
