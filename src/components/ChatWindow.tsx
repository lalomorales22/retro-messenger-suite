import React, { useState } from 'react';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([
    { text: "Hey! How are you?", sender: "JohnDoe123" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "You" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col gap-2 h-80">
      <div className="flex-grow window-95-btn p-2 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <span className="text-win95-navy font-bold text-sm">{msg.sender}: </span>
            <span className="text-sm">{msg.text}</span>
          </div>
        ))}
      </div>
      
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow window-95-btn text-sm p-1"
          placeholder="Type a message..."
        />
        <button type="submit" className="window-95-btn text-sm">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;