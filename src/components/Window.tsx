import React, { useState } from 'react';
import Draggable from 'react-draggable';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

const Window: React.FC<WindowProps> = ({
  title,
  children,
  onClose,
  initialPosition,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <Draggable
      handle=".window-95-titlebar"
      defaultPosition={initialPosition}
      bounds="parent"
      disabled={isMaximized}
    >
      <div
        className={`window-95 absolute ${
          isMaximized ? 'w-full h-full' : 'w-80'
        } window-animation`}
      >
        <div className="window-95-titlebar">
          <span className="text-sm font-win95">{title}</span>
          <div className="flex gap-1">
            <button
              className="window-95-btn w-5 h-5 p-0 flex items-center justify-center"
              onClick={() => setIsMaximized(!isMaximized)}
            >
              □
            </button>
            <button
              className="window-95-btn w-5 h-5 p-0 flex items-center justify-center"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-2">{children}</div>
      </div>
    </Draggable>
  );
};

export default Window;