import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import EmoticonPicker from './EmoticonPicker';
import FileTransfer from './FileTransfer';
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  is_system_message?: boolean;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmoticons, setShowEmoticons] = useState(false);
  const [showFileTransfer, setShowFileTransfer] = useState(false);
  const [awayMessage, setAwayMessage] = useState("");
  const [isAway, setIsAway] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        toast({
          title: "Error fetching messages",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          content: newMessage,
          sender_id: (await supabase.auth.getUser()).data.user?.id,
        }
      ]);

    if (error) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setNewMessage("");
  };

  const handleEmoticonSelect = (emoticon: string) => {
    setNewMessage(prev => prev + emoticon);
    setShowEmoticons(false);
  };

  const handleFileSelect = async (file: File) => {
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          content: `[File Sent: ${file.name} (${Math.round(file.size / 1024)} KB)]`,
          sender_id: (await supabase.auth.getUser()).data.user?.id,
        }
      ]);

    if (error) {
      toast({
        title: "Error sending file message",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setShowFileTransfer(false);
  };

  const toggleAwayStatus = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({
        status: !isAway ? 'away' : 'online',
        away_message: !isAway ? awayMessage : null
      })
      .eq('id', (await supabase.auth.getUser()).data.user?.id);

    if (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setIsAway(!isAway);
    if (isAway) {
      const { error: msgError } = await supabase
        .from('messages')
        .insert([
          {
            content: "You are now available",
            sender_id: (await supabase.auth.getUser()).data.user?.id,
            is_system_message: true
          }
        ]);

      if (msgError) {
        toast({
          title: "Error sending system message",
          description: msgError.message,
          variant: "destructive",
        });
      }
    } else if (awayMessage) {
      const { error: msgError } = await supabase
        .from('messages')
        .insert([
          {
            content: `Away Message: ${awayMessage}`,
            sender_id: (await supabase.auth.getUser()).data.user?.id,
            is_system_message: true
          }
        ]);

      if (msgError) {
        toast({
          title: "Error sending system message",
          description: msgError.message,
          variant: "destructive",
        });
      }
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
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <span className="text-win95-navy font-bold text-sm">
              {msg.is_system_message ? 'System' : msg.sender_id}: 
            </span>
            <span className="text-sm">{msg.content}</span>
            <span className="text-xs text-win95-darkgray ml-2">
              {new Date(msg.created_at).toLocaleTimeString()}
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