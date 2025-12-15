import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNotifications } from '../services/api';
import './Pages.css';

function Messages() {
  const [activeTab, setActiveTab] = useState('chats'); // 'chats', 'requests', 'community', 'announcements'
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);
  const [communityGroups, setCommunityGroups] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { user, isLoggedIn } = useAuth();

  // Fetch all messaging data
  useEffect(() => {
    if (isLoggedIn) {
      fetchAllMessagingData();
    }
  }, [isLoggedIn]);

  const fetchAllMessagingData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchMessages(),
        fetchHelpRequests(),
        fetchCommunityGroups(),
        fetchAnnouncements()
      ]);
    } catch (error) {
      console.error('Error fetching messaging data:', error);
    } finally {
      setLoading(false);
    }
  };

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
        groupMessagesByConversation(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchHelpRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/help-requests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Filter requests where user is involved (creator or helper)
        const userRequests = (data.helpRequests || data || []).filter(req => 
          req.requester?._id === user?.id || 
          (req.helpers && req.helpers.some(helper => helper._id === user?.id))
        );
        setHelpRequests(userRequests);
      }
    } catch (error) {
      console.error('Error fetching help requests:', error);
      // Set empty array on error
      setHelpRequests([]);
    }
  };

  const fetchCommunityGroups = async () => {
    // Mock community groups for now - in a real app, this would be an API call
    const groups = [
      {
        id: 'general',
        name: 'General Community',
        description: 'Open discussion for all community members',
        memberCount: 245,
        avatar: '👥',
        lastActivity: new Date().toISOString(),
        userRole: 'member'
      },
      {
        id: 'volunteers',
        name: 'Volunteers Group',
        description: 'Coordination for volunteer activities',
        memberCount: 87,
        avatar: '🙋‍♀️',
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        userRole: user?.role === 'volunteer' || user?.role === 'admin' ? 'member' : null
      },
      {
        id: 'support',
        name: 'Peer Support',
        description: 'Emotional and mental health support',
        memberCount: 156,
        avatar: '❤️',
        lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        userRole: 'member'
      }
    ];
    setCommunityGroups(groups.filter(group => group.userRole === 'member'));
  };

  const fetchAnnouncements = async () => {
    try {
      const notifications = await getNotifications();
      // Filter for announcement-type notifications
      const adminAnnouncements = (notifications || []).filter(notif => 
        notif.type === 'announcement' || notif.priority === 'high' || notif.priority === 'urgent'
      );
      setAnnouncements(adminAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      // Set empty array on error
      setAnnouncements([]);
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
      let endpoint = '/api/messages';
      let body = {};

      if (activeTab === 'chats') {
        body = {
          recipient: conversations[selectedConversation]?.id || 'support',
          subject: 'Chat Message',
          content: newMessage
        };
      } else if (activeTab === 'requests') {
        // For now, use the messages endpoint with help request context
        body = {
          recipient: helpRequests[selectedConversation]?.requester?._id || 'support',
          subject: `Help Request: ${helpRequests[selectedConversation]?.title || 'Discussion'}`,
          content: newMessage,
          helpRequestId: helpRequests[selectedConversation]?._id
        };
      } else if (activeTab === 'community') {
        // Mock community message - in real app this would be a community API
        alert('Community messaging feature is under development. Your message will be saved for when the feature is available.');
        setNewMessage('');
        setSending(false);
        return;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setNewMessage('');
        if (activeTab === 'chats') {
          fetchMessages();
        } else if (activeTab === 'requests') {
          fetchHelpRequests();
        }
        alert('Message sent successfully!');
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
    if (activeTab === 'chats' && conversations.length > 0) {
      return conversations[selectedConversation]?.messages || [];
    } else if (activeTab === 'requests' && helpRequests.length > 0) {
      return helpRequests[selectedConversation]?.messages || [];
    } else if (activeTab === 'community' && communityGroups.length > 0) {
      return communityGroups[selectedConversation]?.messages || [];
    }
    return [];
  };

  const getCurrentTitle = () => {
    if (activeTab === 'chats') {
      return conversations[selectedConversation]?.name || 'Select a conversation';
    } else if (activeTab === 'requests') {
      return helpRequests[selectedConversation]?.title || 'Select a request';
    } else if (activeTab === 'community') {
      return communityGroups[selectedConversation]?.name || 'Select a group';
    } else if (activeTab === 'announcements') {
      return 'Admin Announcements';
    }
    return 'Messages';
  };

  const renderTabContent = () => {
    if (activeTab === 'announcements') {
      return (
        <div className="announcements-container">
          <div className="announcements-header">
            <h3>📢 Admin Announcements</h3>
            <p>Important updates and messages from the administration team</p>
          </div>
          <div className="announcements-list">
            {announcements.length === 0 ? (
              <div className="no-announcements">
                <p>No announcements at this time.</p>
              </div>
            ) : (
              announcements.map(announcement => (
                <div key={announcement._id} className={`announcement-item ${announcement.priority}`}>
                  <div className="announcement-header">
                    <h4>{announcement.title}</h4>
                    <span className={`priority-badge ${announcement.priority}`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                    <span className="announcement-time">
                      {formatTime(announcement.createdAt)}
                    </span>
                  </div>
                  <div className="announcement-content">
                    <p>{announcement.message}</p>
                  </div>
                  {announcement.type && (
                    <div className="announcement-type">
                      <span className={`type-badge ${announcement.type}`}>
                        {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="messages-container">
        <div className="conversations-list">
          {renderConversationsList()}
        </div>
        <div className="chat-area">
          <div className="chat-header">
            <div className="conv-avatar">{getCurrentAvatar()}</div>
            <h3>{getCurrentTitle()}</h3>
          </div>
          <div className="chat-messages">
            {getCurrentMessages().map(msg => (
              <div 
                key={msg._id || msg.id} 
                className={`message ${msg.sender?._id === user?.id ? 'me' : 'them'}`}
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
    );
  };

  const renderConversationsList = () => {
    let items = [];
    
    if (activeTab === 'chats') {
      items = conversations.map((conv, index) => (
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
      ));
    } else if (activeTab === 'requests') {
      items = helpRequests.map((request, index) => (
        <div 
          key={request._id} 
          className={`conversation-item ${selectedConversation === index ? 'active' : ''}`}
          onClick={() => setSelectedConversation(index)}
        >
          <div className="conv-avatar">🆘</div>
          <div className="conv-details">
            <div className="conv-header">
              <h4>{request.title}</h4>
              <span className={`status-badge ${request.status}`}>
                {request.status}
              </span>
            </div>
            <p className="conv-preview">
              {request.requester._id === user.id ? 'Your request' : `From ${request.requester.name}`}
            </p>
          </div>
        </div>
      ));
    } else if (activeTab === 'community') {
      items = communityGroups.map((group, index) => (
        <div 
          key={group.id} 
          className={`conversation-item ${selectedConversation === index ? 'active' : ''}`}
          onClick={() => setSelectedConversation(index)}
        >
          <div className="conv-avatar">{group.avatar}</div>
          <div className="conv-details">
            <div className="conv-header">
              <h4>{group.name}</h4>
              <span className="member-count">{group.memberCount} members</span>
            </div>
            <p className="conv-preview">{group.description}</p>
          </div>
        </div>
      ));
    }

    return items.length === 0 ? (
      <div className="no-conversations">
        <p>No {activeTab} available</p>
      </div>
    ) : items;
  };

  const getCurrentAvatar = () => {
    if (activeTab === 'chats') {
      return conversations[selectedConversation]?.avatar || '💬';
    } else if (activeTab === 'requests') {
      return '🆘';
    } else if (activeTab === 'community') {
      return communityGroups[selectedConversation]?.avatar || '👥';
    }
    return '💬';
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
        <h1>💬 Messages</h1>
        <p>Connect with requesters, community groups, and receive admin announcements</p>
      </div>

      {/* Message Tabs */}
      <div className="message-tabs">
        <button 
          className={`tab-btn ${activeTab === 'chats' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('chats');
            setSelectedConversation(0);
          }}
        >
          <span>💬</span>
          Direct Chats
          {conversations.length > 0 && <span className="tab-count">{conversations.length}</span>}
        </button>
        
        <button 
          className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('requests');
            setSelectedConversation(0);
          }}
        >
          <span>🆘</span>
          Help Requests
          {helpRequests.length > 0 && <span className="tab-count">{helpRequests.length}</span>}
        </button>

        <button 
          className={`tab-btn ${activeTab === 'community' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('community');
            setSelectedConversation(0);
          }}
        >
          <span>👥</span>
          Community Groups
          {communityGroups.length > 0 && <span className="tab-count">{communityGroups.length}</span>}
        </button>

        <button 
          className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
          onClick={() => setActiveTab('announcements')}
        >
          <span>📢</span>
          Announcements
          {announcements.length > 0 && <span className="tab-count">{announcements.length}</span>}
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Messages;
