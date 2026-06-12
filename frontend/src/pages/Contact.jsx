import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Contact = () => {
  const { apiBaseUrl } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setStatusMsg('');

    try {
      const response = await fetch(`${apiBaseUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setStatusMsg(data.message || 'Form submitted successfully!');
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry',
          message: '',
        });
      } else {
        setStatus('error');
        setStatusMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus('error');
      setStatusMsg('Network error. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in-up" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <section className="text-center max-w-md" style={{ marginBottom: '5rem' }}>
        <span className="badge">Get In Touch</span>
        <h1>We are here to support your scaling needs</h1>
        <p style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
          Have questions about security SLA contracts or custom telemetry packages? Send a message and our support team will reply inside two hours.
        </p>
      </section>

      <section className="grid-2">
        {/* Contact Form */}
        <div className="card">
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Send Us a Message</h2>
          
          {status === 'success' && (
            <div style={{ padding: '1rem', background: '#d1fae5', color: '#065f46', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={20} />
              <span>{statusMsg}</span>
            </div>
          )}

          {status === 'error' && (
            <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} />
              <span>{statusMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Julian Vance"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Work Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="julian@company.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Enterprise Billing">Enterprise Billing</option>
                <option value="Security Audit">Security Audit</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="form-control"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your database telemetry integration plans..."
                style={{ resize: 'vertical' }}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary glow-effect" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Submitting...' : <>Send Message <Send size={16} /></>}
            </button>
          </form>
        </div>

        {/* Company Details & Mock Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem' }}>Contact Information</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.5rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '8px' }}>
                <Mail size={20} />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Email</p>
                <p style={{ fontWeight: 600 }}>support@saasflowzen.io</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.5rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '8px' }}>
                <Phone size={20} />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Phone</p>
                <p style={{ fontWeight: 600 }}>+1 (800) 555-0199</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.5rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '8px' }}>
                <MapPin size={20} />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Headquarters</p>
                <p style={{ fontWeight: 600 }}>100 Pine Street, San Francisco, CA 94111</p>
              </div>
            </div>
          </div>

          {/* Premium Google Maps Mockup */}
          <div className="card" style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: 600 }}>Map Location</h4>
            <div style={{
              flex: 1,
              minHeight: '200px',
              borderRadius: 'var(--border-radius-md)',
              background: 'var(--background)',
              border: '1px solid var(--surface-border)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Custom SVG styling to resemble a dark/light schematic map */}
              <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.25 }}>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <path d="M 0 50 Q 150 150 300 100 T 600 200" fill="none" stroke="var(--primary)" strokeWidth="4" />
                <path d="M 100 0 C 150 200 120 300 250 400" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              
              {/* Map pin beacon */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                <div style={{
                  position: 'absolute',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--primary-glow-heavy)',
                  animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                }}></div>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  border: '3px solid white',
                  boxShadow: 'var(--shadow-md)'
                }}></div>
                <span style={{ 
                  marginTop: '0.5rem', 
                  fontSize: '0.75rem', 
                  fontWeight: 700, 
                  background: 'var(--surface)', 
                  border: '1px solid var(--surface-border)', 
                  padding: '0.2rem 0.5rem', 
                  borderRadius: '4px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  saasflowzen HQ
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CSS Animation declaration for beacon ping */}
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
