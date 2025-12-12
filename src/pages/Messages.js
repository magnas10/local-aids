import React, { useEffect, useMemo, useState } from 'react';
import { messagesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import NotificationToast from '../components/NotificationToast';
import './Pages.css';

function Messages() {
  const { isLoggedIn } = useAuth();
  const [folder, setFolder] = useState('inbox');
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [compose, setCompose] = useState({ recipientEmail: '', subject: '', content: '' });
  const [toast, setToast] = useState(null);

  const placeholderAvatar = useMemo(() => (name = '') => name?.charAt(0)?.toUpperCase() || 'U', []);

  const fetchMessages = async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    setError('');
    try {
      const res = await messagesAPI.list({ folder, page });
      setItems(res.messages || []);
      setUnreadCount(res.unreadCount || 0);
      setTotalPages(res.pagination?.totalPages || 1);
      if (res.messages?.length) {
        const firstId = res.messages[0]._id;
        setSelectedId((prev) => prev || firstId);
        setSelectedMessage(res.messages.find((m) => m._id === (selectedId || firstId)) || res.messages[0]);
      } else {
        setSelectedId(null);
        setSelectedMessage(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const loadMessage = async (id) => {
    if (!id) return;
    try {
      const res = await messagesAPI.getById(id);
      setSelectedMessage(res.message);
      setSelectedId(id);
      if (res.message && !res.message.isRead && folder === 'inbox') {
        await messagesAPI.markRead(id);
        setUnreadCount((c) => Math.max(0, c - 1));
        setItems((prev) => prev.map((m) => (m._id === id ? { ...m, isRead: true } : m)));
      }
    } catch (err) {
      setError(err.message || 'Unable to open message');
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder, page, isLoggedIn]);

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    setSuccess('');
    try {
      await messagesAPI.send({
        recipientEmail: compose.recipientEmail,
        subject: compose.subject,
        content: compose.content
      });
      setCompose({ recipientEmail: '', subject: '', content: '' });
      setToast({ message: '✉️ Message sent successfully!', type: 'success' });
      setFolder('sent');
      setPage(1);
      fetchMessages();
    } catch (err) {
      setToast({ message: err.message || 'Failed to send message', type: 'error' });
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await messagesAPI.remove(id);
      setItems((prev) => prev.filter((m) => m._id !== id));
      if (selectedId === id) {
        setSelectedId(null);
        setSelectedMessage(null);
      }
      setToast({ message: '🗑️ Message deleted', type: 'info' });
      fetchMessages();
    } catch (err) {
      setToast({ message: err.message || 'Failed to delete message', type: 'error' });
    }
  };

  const currentSenderName = (msg) => {
    if (!msg) return '';
    const person = folder === 'sent' ? msg.recipient : msg.sender;
    return person?.name || person?.email || 'User';
  };

  return (
    <div className="page-container">
      {toast && (
        <NotificationToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="page-header">
        <h1>Messages</h1>
        <p>Secure inbox and notifications for Local AIDS</p>
      </div>

      <div className="messages-toolbar">
        <div className="folder-tabs">
          <button className={folder === 'inbox' ? 'active' : ''} onClick={() => { setFolder('inbox'); setPage(1); }}>
            Inbox {unreadCount > 0 && <span className="pill">{unreadCount}</span>}
          </button>
          <button className={folder === 'sent' ? 'active' : ''} onClick={() => { setFolder('sent'); setPage(1); }}>
            Sent
          </button>
        </div>
        <div className="pagination-controls">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
          <span>Page {page} / {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
        </div>
      </div>

      {error && <div className="form-error" role="alert">{error}</div>}
      {success && <div className="form-success" role="status">{success}</div>}

      <div className="messages-container">
        <div className="conversations-list" aria-label="Message list">
          {loading && <p>Loading messages...</p>}
          {!loading && items.length === 0 && <p className="muted">No messages found.</p>}
          {!loading && items.map((msg) => {
            const person = folder === 'sent' ? msg.recipient : msg.sender;
            return (
              <div
                key={msg._id}
                className={`conversation-item ${selectedId === msg._id ? 'active' : ''}`}
                onClick={() => loadMessage(msg._id)}
              >
                <div className="conv-avatar">{person?.avatar || placeholderAvatar(person?.name)}</div>
                <div className="conv-details">
                  <div className="conv-header">
                    <h4>{person?.name || person?.email}</h4>
                    <span className="conv-time">{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="conv-preview">{msg.subject || 'No subject'}</p>
                </div>
                {folder === 'inbox' && !msg.isRead && <span className="unread-badge">•</span>}
              </div>
            );
          })}
        </div>

        <div className="chat-area" aria-live="polite">
          {!selectedMessage && <p className="muted">Select a message to read</p>}
          {selectedMessage && (
            <>
              <div className="chat-header">
                <div className="conv-avatar">{placeholderAvatar(currentSenderName(selectedMessage))}</div>
                <div>
                  <h3>{currentSenderName(selectedMessage)}</h3>
                  <p className="muted">{selectedMessage.subject || 'No subject'}</p>
                  <p className="muted">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
                <button className="link-btn" onClick={() => handleDelete(selectedMessage._id)}>Delete</button>
              </div>
              <div className="chat-messages">
                <div className="message them">
                  <p>{selectedMessage.content}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="compose-card">
        <h3>Send a new message</h3>
        <form onSubmit={handleSend} className="auth-form">
          <div className="form-group">
            <label htmlFor="recipientEmail">Recipient Email</label>
            <input
              id="recipientEmail"
              type="email"
              value={compose.recipientEmail}
              onChange={(e) => setCompose({ ...compose, recipientEmail: e.target.value })}
              required
              placeholder="person@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              value={compose.subject}
              onChange={(e) => setCompose({ ...compose, subject: e.target.value })}
              placeholder="Subject (optional)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Message</label>
            <textarea
              id="content"
              value={compose.content}
              onChange={(e) => setCompose({ ...compose, content: e.target.value })}
              required
              rows={4}
              placeholder="Write your message"
            />
          </div>
          <button type="submit" className="auth-btn" disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;
