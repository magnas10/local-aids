import React, { useState } from 'react';
import './Pages.css';

function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(0);

  const conversations = [
    {
      id: 1,
      name: 'Support Team',
      avatar: '👩‍⚕️',
      lastMessage: 'Thank you for reaching out. We are here to help!',
      time: '2 min ago',
      unread: 2
    },
    {
      id: 2,
      name: 'Volunteer Coordinator',
      avatar: '👨‍💼',
      lastMessage: 'Your volunteer application has been approved.',
      time: '1 hour ago',
      unread: 1
    },
    {
      id: 3,
      name: 'Community Group',
      avatar: '👥',
      lastMessage: 'Next meeting is scheduled for Friday.',
      time: 'Yesterday',
      unread: 0
    },
    {
      id: 4,
      name: 'Event Organizer',
      avatar: '📅',
      lastMessage: 'Don\'t forget about the workshop tomorrow!',
      time: '2 days ago',
      unread: 0
    }
  ];

  const messages = [
    { id: 1, sender: 'them', text: 'Hello! How can we help you today?', time: '10:00 AM' },
    { id: 2, sender: 'me', text: 'Hi, I wanted to know more about your support services.', time: '10:02 AM' },
    { id: 3, sender: 'them', text: 'Of course! We offer various support services including counseling, health resources, and community programs.', time: '10:03 AM' },
    { id: 4, sender: 'me', text: 'That sounds great. How can I get involved?', time: '10:05 AM' },
    { id: 5, sender: 'them', text: 'Thank you for reaching out. We are here to help!', time: '10:06 AM' },
  ];

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
            <div className="conv-avatar">{conversations[selectedConversation].avatar}</div>
            <h3>{conversations[selectedConversation].name}</h3>
          </div>
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
                <span className="msg-time">{msg.time}</span>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button className="send-btn">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
