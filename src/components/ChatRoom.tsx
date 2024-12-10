import React, { useState } from 'react';

interface Message {
  text: string;
  sender: string;
  timestamp: Date;
  isSystem?: boolean;
}

interface ChatRoomProps {
  roomName?: string;
  isPrivate?: boolean;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ 
  roomName = "General Chat",
  isPrivate = false 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: `Welcome to ${roomName}! ${isPrivate ? '(Private Room)' : ''}`,
      sender: "System",
      timestamp: new Date(),
      isSystem: true
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [userCount, setUserCount] = useState(1);
  const [inviteUser, setInviteUser] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { 
          text: newMessage,
          sender: "You",
          timestamp: new Date()
        }
      ]);
      setNewMessage("");
    }
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteUser.trim()) {
      setMessages([
        ...messages,
        {
          text: `Invitation sent to ${inviteUser}`,
          sender: "System",
          timestamp: new Date(),
          isSystem: true
        }
      ]);
      setInviteUser("");
    }
  };

  return (
    <div className="flex flex-col gap-2 h-80">
      <div className="window-95-btn p-2 mb-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{roomName}</span>
          {isPrivate && (
            <span className="text-xs bg-win95-navy text-white px-1 rounded">
              Private
            </span>
          )}
        </div>
        <span className="text-sm text-win95-darkgray">
          {userCount} {userCount === 1 ? 'user' : 'users'} online
        </span>
      </div>

      <div className="flex-grow window-95-btn p-2 overflow-y-auto">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`mb-2 ${msg.isSystem ? 'text-win95-darkgray' : ''}`}
          >
            <span className="text-win95-navy font-bold text-sm">
              {msg.sender}:
            </span>
            <span className="text-sm ml-2">{msg.text}</span>
            <span className="text-xs text-win95-darkgray ml-2">
              {msg.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      {isPrivate && (
        <form onSubmit={handleInvite} className="flex gap-2">
          <input
            type="text"
            value={inviteUser}
            onChange={(e) => setInviteUser(e.target.value)}
            className="window-95-btn text-sm p-1 flex-grow"
            placeholder="Invite user..."
          />
          <button type="submit" className="window-95-btn text-sm">
            Invite
          </button>
        </form>
      )}

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="window-95-btn text-sm p-1 flex-grow"
          placeholder="Type a message..."
        />
        <button type="submit" className="window-95-btn text-sm">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;