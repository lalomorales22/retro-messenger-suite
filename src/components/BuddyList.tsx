import React from 'react';

interface BuddyListProps {
  onChatStart: () => void;
}

const BuddyList: React.FC<BuddyListProps> = ({ onChatStart }) => {
  const buddies = [
    { name: 'JohnDoe123', status: 'online' },
    { name: 'CoolKid95', status: 'away' },
    { name: 'WebSurfer2000', status: 'offline' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="window-95-btn p-2">
        <h3 className="text-sm font-bold">Online Friends (1/3)</h3>
      </div>
      
      <div className="flex flex-col gap-1">
        {buddies.map((buddy) => (
          <button
            key={buddy.name}
            className="window-95-btn text-left text-sm p-1 flex items-center gap-2"
            onClick={onChatStart}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                buddy.status === 'online'
                  ? 'bg-green-500'
                  : buddy.status === 'away'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            />
            {buddy.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BuddyList;