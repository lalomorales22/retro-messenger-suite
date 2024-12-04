import React from 'react';

interface TaskbarProps {
  windows: {
    buddyList: boolean;
    chat: boolean;
  };
  onWindowClick: (window: keyof typeof windows) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onWindowClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-win95-gray shadow-win95 flex items-center p-1 gap-2">
      <button className="window-95-btn h-8 flex items-center">
        <span className="text-sm">Start</span>
      </button>
      
      {windows.buddyList && (
        <button
          className="window-95-btn h-8 flex-grow flex items-center"
          onClick={() => onWindowClick('buddyList')}
        >
          <span className="text-sm">Buddy List</span>
        </button>
      )}
      
      {windows.chat && (
        <button
          className="window-95-btn h-8 flex-grow flex items-center"
          onClick={() => onWindowClick('chat')}
        >
          <span className="text-sm">Instant Message</span>
        </button>
      )}

      <div className="window-95-btn h-8 px-2 flex items-center">
        <span className="text-sm">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default Taskbar;