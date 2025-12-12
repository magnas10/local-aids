import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { user, isLoggedIn } = useAuth();

  // Fetch messages from backend
  useEffect(() => {
    if (isLoggedIn) {
      fetchMessages();
    }
  }, [isLoggedIn]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
        // Group messages by conversation for the sidebar
        groupMessagesByConversation(data.messages || []);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupMessagesByConversation = (messagesList) => {
    const conversationMap = {};
    
    messagesList.forEach(msg => {
      const otherUserId = msg.sender._id === user.id ? msg.recipient._id : msg.sender._id;
      const otherUser = msg.sender._id === user.id ? msg.recipient : msg.sender;
      
      if (!conversationMap[otherUserId]) {
        conversationMap[otherUserId] = {
          id: otherUserId,
          name: otherUser.name,
          avatar: otherUser.avatar || otherUser.name.charAt(0).toUpperCase(),
          lastMessage: msg.content,
          time: formatTime(msg.createdAt),
          unread: !msg.isRead && msg.recipient._id === user.id ? 1 : 0,
          messages: []
        };
      }
      
      conversationMap[otherUserId].messages.push(msg);
      if (new Date(msg.createdAt) > new Date(conversationMap[otherUserId].lastMessageDate)) {
        conversationMap[otherUserId].lastMessage = msg.content;
        conversationMap[otherUserId].time = formatTime(msg.createdAt);
        conversationMap[otherUserId].lastMessageDate = msg.createdAt;
      }
    });

    const conversationsList = Object.values(conversationMap);
    setConversations(conversationsList);
    
    // Add default support conversation if no conversations exist
    if (conversationsList.length === 0) {
      setConversations([{
        id: 'support',
        name: 'Support Team',
        avatar: '👩‍⚕️',
        lastMessage: 'Welcome! How can we help you today?',
        time: 'Just now',
        unread: 0,
        messages: []
      }]);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)} min ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          recipient: conversations[selectedConversation]?.id || 'support',
          subject: 'Chat Message',
          content: newMessage
        })
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages(); // Refresh messages
      } else {
        console.error('Failed to send message');
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const getCurrentMessages = () => {
    if (conversations.length === 0) return [];
    return conversations[selectedConversation]?.messages || [];
  };

  if (loading) {
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading messages...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Messages</h1>
        <p>Stay connected with our community and support team</p>
      </div>
      <div className="messages-container">
        <div className="conversations-list">
          {conversations.map((conv, index) => (
            <div 
              key={conv.id} 
              className={`conversation-item ${selectedConversation === index ? 'active' : ''}`}
              onClick={() => setSelectedConversation(index)}
            >
              <div className="conv-avatar">{conv.avatar}</div>
              <div className="conv-details">
                <div className="conv-header">
                  <h4>{conv.name}</h4>
                  <span className="conv-time">{conv.time}</span>
                </div>
                <p className="conv-preview">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && <span className="unread-badge">{conv.unread}</span>}
            </div>
          ))}
        </div>
        <div className="chat-area">
          <div className="chat-header">
            <div className="conv-avatar">{conversations[selectedConversation]?.avatar}</div>
            <h3>{conversations[selectedConversation]?.name || 'Select a conversation'}</h3>
          </div>
          <div className="chat-messages">
            {getCurrentMessages().map(msg => (
              <div 
                key={msg._id || msg.id} 
                className={`message ${msg.sender._id === user?.id ? 'me' : 'them'}`}
              >
                <p>{msg.content}</p>
                <span className="msg-time">{formatTime(msg.createdAt)}</span>
              </div>
            ))}
            {getCurrentMessages().length === 0 && (
              <div className="no-messages">
                <p>No messages yet. Start a conversation!</p>
              </div>
            )}
          </div>
          <form onSubmit={sendMessage} className="chat-input">
            <input 
              type="text" 
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={sending}
            />
            <button 
              type="submit" 
              className="send-btn"
              disabled={sending || !newMessage.trim()}
            >
              {sending ? '...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Messages;
