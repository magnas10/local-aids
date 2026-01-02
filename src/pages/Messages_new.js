import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getConversations, 
  getConversationMessages, 
  createConversation, 
  sendMessage, 
  searchUsers,
  getUnreadCount 
} from '../services/messageAPI';
import { getNotifications } from '../services/api';
import './Pages.css';

function Messages() {
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('chats'); // 'chats' or 'announcements'
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchConversations();
      fetchAnnouncements();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-refresh conversations every 30 seconds
  useEffect(() => {
    if (!isLoggedIn) return;
    
    const interval = setInterval(() => {
      fetchConversations();
      fetchAnnouncements();
      if (selectedConversation) {
        fetchMessages(selectedConversation.id);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isLoggedIn, selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data.conversations || []);
      if (conversations.length === 0 && data.conversations?.length > 0) {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const data = await getNotifications();
      // Filter only important announcements
      const adminAnnouncements = (data.notifications || []).filter(
        notif => notif.type === 'announcement' || notif.priority === 'high'
      );
      setAnnouncements(adminAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setAnnouncements([]);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const data = await getConversationMessages(conversationId);
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    // Debounce search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        setSearching(true);
        const data = await searchUsers(query);
        setSearchResults(data.users || []);
      } catch (error) {
        console.error('Error searching users:', error);
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
  };

  const handleStartChat = async (userId) => {
    try {
      const data = await createConversation('direct', [userId]);
      
      // Add to conversations if new
      if (!data.existed) {
        await fetchConversations();
      }
      
      // Select the conversation
      const conversation = conversations.find(c => c.id === data.conversation.id) || data.conversation;
      setSelectedConversation(conversation);
      setShowNewChat(false);
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error starting chat:', error);
      alert(error.message || 'Failed to start chat');
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert('Please enter a group name');
      return;
    }

    if (selectedUsers.length === 0) {
      alert('Please select at least one member');
      return;
    }

    try {
      const userIds = selectedUsers.map(u => u.id);
      const data = await createConversation('group', userIds, groupName, groupDescription);
      
      await fetchConversations();
      setSelectedConversation(data.conversation);
      setShowGroupModal(false);
      setGroupName('');
      setGroupDescription('');
      setSelectedUsers([]);
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error creating group:', error);
      alert(error.message || 'Failed to create group');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      setSending(true);
      await sendMessage(selectedConversation.id, newMessage.trim());
      setNewMessage('');
      await fetchMessages(selectedConversation.id);
      await fetchConversations(); // Update last message in conversation list
    } catch (error) {
      console.error('Error sending message:', error);
      alert(error.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatMessageTime = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="messages-page-pro">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-page-pro">
      <div className="messages-container-pro">
        {/* Conversations Sidebar */}
        <div className="conversations-sidebar">
          <div className="conversations-header">
            <h2>Messages</h2>
            <div className="header-actions">
              {activeTab === 'chats' && (
                <>
                  <button 
                    className="btn-icon-pro"
                    onClick={() => setShowNewChat(true)}
                    title="New Chat"
                  >
                    ✉️
                  </button>
                  <button 
                    className="btn-icon-pro"
                    onClick={() => setShowGroupModal(true)}
                    title="Create Group"
                  >
                    👥
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="message-tabs">
            <button 
              className={`tab-btn ${activeTab === 'chats' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('chats');
                setSelectedConversation(null);
              }}
            >
              💬 Chats
            </button>
            <button 
              className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('announcements');
                setSelectedConversation(null);
              }}
            >
              📢 Announcements
            </button>
          </div>

          <div className="conversations-list">
            {activeTab === 'chats' ? (
              conversations.length === 0 ? (
                <div className="empty-state">
                  <p>No conversations yet</p>
                  <button 
                    className="btn-primary-pro"
                    onClick={() => setShowNewChat(true)}
                  >
                    Start a Conversation
                  </button>
                </div>
              ) : (
                conversations.map(conv => (
                  <div
                    key={conv.id}
                    className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <div className="conv-avatar">
                      {conv.avatar ? (
                        <img src={conv.avatar} alt={conv.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {conv.type === 'group' ? '👥' : conv.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                    </div>
                    <div className="conv-details">
                      <div className="conv-header">
                        <h4>{conv.name}</h4>
                        <span className="time">{formatTime(conv.lastMessageAt)}</span>
                      </div>
                      <div className="conv-preview">
                        <p>{conv.lastMessage?.content || 'No messages yet'}</p>
                        {conv.unreadCount > 0 && (
                          <span className="unread-badge">{conv.unreadCount}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )
            ) : (
              /* Announcements List */
              announcements.length === 0 ? (
                <div className="empty-state">
                  <p>No announcements</p>
                </div>
              ) : (
                announcements.map(announcement => (
                  <div
                    key={announcement.id}
                    className="announcement-item-sidebar"
                  >
                    <div className="announcement-icon">
                      {announcement.priority === 'high' ? '🔴' : '📢'}
                    </div>
                    <div className="announcement-details">
                      <h4>{announcement.title}</h4>
                      <p className="announcement-time">{formatTime(announcement.createdAt)}</p>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="messages-area">
          {activeTab === 'announcements' ? (
            /* Announcements Display */
            <div className="announcements-display">
              <div className="announcements-header-main">
                <h2>📢 Admin Announcements</h2>
                <p>Important updates and messages from the administration team</p>
              </div>
              <div className="announcements-list-main">
                {announcements.length === 0 ? (
                  <div className="empty-announcements">
                    <p>No announcements at this time.</p>
                  </div>
                ) : (
                  announcements.map(announcement => (
                    <div key={announcement.id} className={`announcement-card ${announcement.priority}`}>
                      <div className="announcement-header-card">
                        <div className="announcement-title-section">
                          <h3>{announcement.title}</h3>
                          <span className={`priority-badge ${announcement.priority}`}>
                            {announcement.priority === 'high' ? '🔴 HIGH' : 
                             announcement.priority === 'medium' ? '🟡 MEDIUM' : '🟢 LOW'}
                          </span>
                        </div>
                        <span className="announcement-time-card">
                          {formatTime(announcement.createdAt)}
                        </span>
                      </div>
                      <div className="announcement-body">
                        <p>{announcement.content || announcement.message}</p>
                      </div>
                      {announcement.createdBy && (
                        <div className="announcement-footer">
                          <span>From: {announcement.createdBy.name || 'Admin'}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : selectedConversation ? (
            <>
              <div className="messages-header">
                <div className="header-info">
                  <div className="conv-avatar">
                    {selectedConversation.avatar ? (
                      <img src={selectedConversation.avatar} alt={selectedConversation.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {selectedConversation.type === 'group' ? '👥' : selectedConversation.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3>{selectedConversation.name}</h3>
                    {selectedConversation.type === 'group' && (
                      <p className="members-count">{selectedConversation.participants?.length || 0} members</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="messages-body">
                {messages.length === 0 ? (
                  <div className="empty-messages">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const isOwn = msg.senderId === user?.id;
                    const showAvatar = index === 0 || messages[index - 1].senderId !== msg.senderId;
                    
                    return (
                      <div key={msg.id} className={`message ${isOwn ? 'own' : 'other'}`}>
                        {!isOwn && showAvatar && (
                          <div className="message-avatar">
                            {msg.sender?.profileImage ? (
                              <img src={msg.sender.profileImage} alt={msg.sender.name} />
                            ) : (
                              <div className="avatar-placeholder-small">
                                {msg.sender?.name?.charAt(0)?.toUpperCase() || '?'}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="message-content">
                          {!isOwn && showAvatar && (
                            <div className="message-sender">{msg.sender?.name}</div>
                          )}
                          <div className="message-bubble">
                            <p>{msg.content}</p>
                          </div>
                          <div className="message-time">{formatMessageTime(msg.createdAt)}</div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className="message-input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={sending}
                />
                <button type="submit" disabled={sending || !newMessage.trim()}>
                  {sending ? '⏳' : '📤'}
                </button>
              </form>
            </>
          ) : (
            <div className="no-conversation-selected">
              <div className="placeholder-content">
                <h3>Select a conversation</h3>
                <p>Choose a conversation from the list or start a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="modal-overlay" onClick={() => setShowNewChat(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>New Chat</h3>
              <button onClick={() => setShowNewChat(false)}>✕</button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
              <div className="search-results">
                {searching ? (
                  <p>Searching...</p>
                ) : searchResults.length === 0 && searchQuery.length >= 2 ? (
                  <p>No users found</p>
                ) : (
                  searchResults.map(u => (
                    <div 
                      key={u.id}
                      className="user-result"
                      onClick={() => handleStartChat(u.id)}
                    >
                      <div className="user-avatar">
                        {u.profileImage ? (
                          <img src={u.profileImage} alt={u.name} />
                        ) : (
                          <div className="avatar-placeholder-small">
                            {u.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                        )}
                      </div>
                      <div className="user-info">
                        <h4>{u.name}</h4>
                        <p>{u.email}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showGroupModal && (
        <div className="modal-overlay" onClick={() => setShowGroupModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Group</h3>
              <button onClick={() => setShowGroupModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="form-control"
              />
              <textarea
                placeholder="Group description (optional)"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="form-control"
                rows="3"
              />
              
              <h4>Add Members</h4>
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              
              {selectedUsers.length > 0 && (
                <div className="selected-users">
                  {selectedUsers.map(u => (
                    <div key={u.id} className="selected-user-chip">
                      {u.name}
                      <button onClick={() => setSelectedUsers(selectedUsers.filter(su => su.id !== u.id))}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="search-results">
                {searchResults.filter(u => !selectedUsers.find(su => su.id === u.id)).map(u => (
                  <div 
                    key={u.id}
                    className="user-result"
                    onClick={() => setSelectedUsers([...selectedUsers, u])}
                  >
                    <div className="user-avatar">
                      {u.profileImage ? (
                        <img src={u.profileImage} alt={u.name} />
                      ) : (
                        <div className="avatar-placeholder-small">
                          {u.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                    </div>
                    <div className="user-info">
                      <h4>{u.name}</h4>
                      <p>{u.email}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                className="btn-primary-pro"
                onClick={handleCreateGroup}
                disabled={!groupName.trim() || selectedUsers.length === 0}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
