import React, { useState } from 'react';
import Taskbar from './Taskbar';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import BuddyList from './BuddyList';
import ChatWindow from './ChatWindow';

const Desktop = () => {
  const [windows, setWindows] = useState<{
    buddyList: boolean;
    chat: boolean;
  }>({
    buddyList: true,
    chat: false,
  });

  const toggleWindow = (window: keyof typeof windows) => {
    setWindows(prev => ({
      ...prev,
      [window]: !prev[window],
    }));
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="p-4 grid grid-cols-6 gap-4">
        <DesktopIcon
          icon="buddy"
          label="Buddy List"
          onClick={() => toggleWindow('buddyList')}
        />
      </div>

      {windows.buddyList && (
        <Window
          title="Buddy List"
          onClose={() => toggleWindow('buddyList')}
          initialPosition={{ x: 20, y: 20 }}
        >
          <BuddyList onChatStart={() => toggleWindow('chat')} />
        </Window>
      )}

      {windows.chat && (
        <Window
          title="Instant Message"
          onClose={() => toggleWindow('chat')}
          initialPosition={{ x: 300, y: 40 }}
        >
          <ChatWindow />
        </Window>
      )}

      <Taskbar windows={windows} onWindowClick={toggleWindow} />
    </div>
  );
};

export default Desktop;