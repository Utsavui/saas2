import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Trash2, CheckSquare, Square, AlertCircle, Shield, Calendar, RefreshCw, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user, token, apiBaseUrl, logout } = useAuth();
  const navigate = useNavigate();

  const [usersList, setUsersList] = useState([]);
  const [contactsList, setContactsList] = useState([]);
  const [activeTab, setActiveTab] = useState('contacts'); // 'contacts' | 'users'
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  // Security check: Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      // Fetch users
      const usersRes = await fetch(`${apiBaseUrl}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = await usersRes.json();

      // Fetch contacts
      const contactsRes = await fetch(`${apiBaseUrl}/admin/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const contactsData = await contactsRes.json();

      if (usersRes.ok && usersData.success) {
        setUsersList(usersData.data);
      } else {
        throw new Error(usersData.message || 'Failed to retrieve users');
      }

      if (contactsRes.ok && contactsData.success) {
        setContactsList(contactsData.data);
      } else {
        throw new Error(contactsData.message || 'Failed to retrieve contact submissions');
      }
    } catch (err) {
      console.error('Fetch admin data error:', err);
      setErrorMsg(err.message || 'Error communicating with the backend. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`${apiBaseUrl}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsersList(usersList.filter(u => u._id !== userId));
        setStatusMsg('User deleted successfully.');
        setTimeout(() => setStatusMsg(''), 3000);
      } else {
        alert(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting user');
    }
  };

  // Handle toggle read status
  const handleToggleRead = async (contactId, currentStatus) => {
    try {
      const res = await fetch(`${apiBaseUrl}/admin/contacts/${contactId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isRead: !currentStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setContactsList(contactsList.map(c => c._id === contactId ? { ...c, isRead: !currentStatus } : c));
      } else {
        alert(data.message || 'Failed to update contact status');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating contact status');
    }
  };

  // Handle delete contact
  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) return;
    try {
      const res = await fetch(`${apiBaseUrl}/admin/contacts/${contactId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setContactsList(contactsList.filter(c => c._id !== contactId));
        setStatusMsg('Submission deleted successfully.');
        setTimeout(() => setStatusMsg(''), 3000);
      } else {
        alert(data.message || 'Failed to delete submission');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting submission');
    }
  };

  const unreadContactsCount = contactsList.filter(c => !c.isRead).length;

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <p>Loading Admin Dashboard metrics...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', maxWidth: '600px' }}>
        <div className="card text-center" style={{ borderColor: 'var(--danger)' }}>
          <AlertCircle size={48} color="var(--danger)" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ marginBottom: '1rem' }}>Dashboard Loading Error</h2>
          <p style={{ marginBottom: '2rem' }}>{errorMsg}</p>
          <button onClick={fetchData} className="btn btn-primary" style={{ display: 'inline-flex', gap: '0.5rem', margin: '0 auto' }}>
            <RefreshCw size={16} /> Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in-up" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      
      {/* Dashboard Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge" style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>
            <Shield size={14} /> System Administrator
          </span>
          <h1>Admin Control Room</h1>
          <p>Manage registered user accounts and inspect customer contact form submissions.</p>
        </div>
        <button onClick={fetchData} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RefreshCw size={16} /> Refresh Metrics
        </button>
      </div>

      {statusMsg && (
        <div style={{ padding: '1rem', background: '#d1fae5', color: '#065f46', borderRadius: '8px', marginBottom: '2rem' }}>
          {statusMsg}
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid-3" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '12px' }}>
            <Users size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Total Accounts</p>
            <h3 style={{ fontSize: '2rem', margin: 0 }}>{usersList.length}</h3>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '12px' }}>
            <Mail size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Inbound Contacts</p>
            <h3 style={{ fontSize: '2rem', margin: 0 }}>{contactsList.length}</h3>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ 
            padding: '1rem', 
            background: unreadContactsCount > 0 ? 'hsla(38, 92%, 50%, 0.15)' : 'var(--primary-glow)', 
            color: unreadContactsCount > 0 ? 'var(--warning)' : 'var(--primary)', 
            borderRadius: '12px' 
          }}>
            <Mail size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Unread Submissions</p>
            <h3 style={{ fontSize: '2rem', margin: 0, color: unreadContactsCount > 0 ? 'var(--warning)' : 'inherit' }}>
              {unreadContactsCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Layout Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--surface-border)', marginBottom: '2rem', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('contacts')}
          style={{
            padding: '0.75rem 1.5rem',
            fontWeight: 600,
            color: activeTab === 'contacts' ? 'var(--primary)' : 'var(--text-muted)',
            borderBottom: activeTab === 'contacts' ? '2px solid var(--primary)' : '2px solid transparent',
            marginBottom: '-0.6rem'
          }}
        >
          Contact Queries ({contactsList.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '0.75rem 1.5rem',
            fontWeight: 600,
            color: activeTab === 'users' ? 'var(--primary)' : 'var(--text-muted)',
            borderBottom: activeTab === 'users' ? '2px solid var(--primary)' : '2px solid transparent',
            marginBottom: '-0.6rem'
          }}
        >
          User Accounts ({usersList.length})
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'contacts' && (
          <div>
            {contactsList.length === 0 ? (
              <div className="card text-center" style={{ padding: '4rem 2rem' }}>
                <Mail size={40} color="var(--text-muted)" style={{ margin: '0 auto 1.5rem auto' }} />
                <p>No contact inquiries received yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {contactsList.map((contact) => (
                  <div key={contact._id} className="card" style={{ padding: '2rem', borderLeft: !contact.isRead ? '4px solid var(--warning)' : '1px solid var(--surface-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                          <h3 style={{ fontSize: '1.2rem' }}>{contact.subject}</h3>
                          {!contact.isRead && (
                            <span style={{ fontSize: '0.75rem', background: 'var(--warning)', color: 'white', padding: '0.1rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                              New
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                          {contact.name} &lt;{contact.email}&gt;
                        </p>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleToggleRead(contact._id, contact.isRead)}
                          className="theme-toggle-btn"
                          title={contact.isRead ? "Mark as Unread" : "Mark as Read"}
                        >
                          {contact.isRead ? <Square size={16} /> : <CheckSquare size={16} />}
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="theme-toggle-btn"
                          style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                          title="Delete Submission"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <p style={{ background: 'var(--background)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--surface-border)', fontSize: '0.95rem', color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>
                      {contact.message}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Calendar size={12} />
                      <span>Submitted: {new Date(contact.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="card" style={{ padding: '0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: 'var(--background)', borderBottom: '1px solid var(--surface-border)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Name</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Email</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Role</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Registered At</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((u) => (
                  <tr key={u._id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>{u.name}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>{u.email}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      {u.isAdmin ? (
                        <span style={{ fontSize: '0.75rem', background: 'var(--primary-glow)', color: 'var(--primary)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                          Admin
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', background: 'var(--background)', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 600, border: '1px solid var(--surface-border)' }}>
                          User
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                      {u._id === user._id ? (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Active Self</span>
                      ) : (
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="theme-toggle-btn"
                          style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)', marginLeft: 'auto' }}
                          title="Delete User Account"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
