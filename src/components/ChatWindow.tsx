import React, { useState } from 'react';
import EmoticonPicker from './EmoticonPicker';
import FileTransfer from './FileTransfer';

interface Message {
  text: string;
  sender: string;
  timestamp: Date;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey! How are you?", sender: "JohnDoe123", timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmoticons, setShowEmoticons] = useState(false);
  const [showFileTransfer, setShowFileTransfer] = useState(false);
  const [awayMessage, setAwayMessage] = useState("");
  const [isAway, setIsAway] = useState(false);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { text: newMessage, sender: "You", timestamp: new Date() },
      ]);
      setNewMessage("");
    }
  };

  const handleEmoticonSelect = (emoticon: string) => {
    setNewMessage(prev => prev + emoticon);
    setShowEmoticons(false);
  };

  const handleFileSelect = (file: File) => {
    setMessages([
      ...messages,
      { 
        text: `[File Sent: ${file.name} (${Math.round(file.size / 1024)} KB)]`,
        sender: "You",
        timestamp: new Date()
      },
    ]);
    setShowFileTransfer(false);
  };

  const toggleAwayStatus = () => {
    setIsAway(!isAway);
    if (isAway) {
      setMessages([
        ...messages,
        { text: "You are now available", sender: "System", timestamp: new Date() },
      ]);
    } else if (awayMessage) {
      setMessages([
        ...messages,
        { text: `Away Message: ${awayMessage}`, sender: "System", timestamp: new Date() },
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-80">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          value={awayMessage}
          onChange={(e) => setAwayMessage(e.target.value)}
          placeholder="Set away message..."
          className="window-95-btn text-sm p-1 flex-grow"
        />
        <button
          onClick={toggleAwayStatus}
          className={`window-95-btn text-sm ${isAway ? 'bg-win95-darkgray text-white' : ''}`}
        >
          {isAway ? 'I\'m Back' : 'Set Away'}
        </button>
      </div>

      <div className="flex-grow window-95-btn p-2 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <span className="text-win95-navy font-bold text-sm">{msg.sender}: </span>
            <span className="text-sm">{msg.text}</span>
            <span className="text-xs text-win95-darkgray ml-2">
              {msg.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      
      <form onSubmit={sendMessage} className="flex gap-2">
        <div className="flex-grow flex flex-col gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="window-95-btn text-sm p-1"
            placeholder="Type a message..."
          />
          
          {showEmoticons && (
            <EmoticonPicker onSelect={handleEmoticonSelect} />
          )}
          
          {showFileTransfer && (
            <FileTransfer onFileSelect={handleFileSelect} />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button type="submit" className="window-95-btn text-sm">
            Send
          </button>
          <button
            type="button"
            onClick={() => setShowEmoticons(!showEmoticons)}
            className="window-95-btn text-sm"
          >
            :)
          </button>
          <button
            type="button"
            onClick={() => setShowFileTransfer(!showFileTransfer)}
            className="window-95-btn text-sm"
          >
            📎
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;