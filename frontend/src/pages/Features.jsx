import React from 'react';
import { Database, LineChart, Code2, Cpu, RefreshCw, BarChart2, ShieldCheck, HeartHandshake, Zap, Globe, FileSpreadsheet } from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: <Database size={24} />,
      title: 'Auto-Scaling Mongoose Layer',
      desc: 'Seamlessly query and track document edits in MongoDB with our proprietary caching layers that reduce database reads by 50%.',
    },
    {
      icon: <LineChart size={24} />,
      title: 'Real-Time Telemetry Logs',
      desc: 'View visual streams of active API calls, schema validators, and read-write performance metrics on responsive charts.',
    },
    {
      icon: <Code2 size={24} />,
      title: 'One-Click SDK Exports',
      desc: 'Export pre-configured REST structures, authentication guards, and validation schemas in Node, Python, or Go.',
    },
    {
      icon: <Cpu size={24} />,
      title: 'Serverless Edge Triggers',
      desc: 'Trigger custom serverless functions when specific MongoDB document states match your target criteria.',
    },
    {
      icon: <RefreshCw size={24} />,
      title: 'Automated Compliance Backups',
      desc: 'Maintain daily data logs meeting SOC2 standards. Recover documents using localized state rollback triggers.',
    },
    {
      icon: <BarChart2 size={24} />,
      title: 'Advanced Usage Analytics',
      desc: 'View user subscription cycles, login activity spikes, and system performance anomalies automatically.',
    }
  ];

  return (
    <div className="container animate-fade-in-up" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      {/* Intro */}
      <section className="text-center max-w-md" style={{ marginBottom: '5rem' }}>
        <span className="badge">Platform Features</span>
        <h1>Engineered for modern databases and scaling applications</h1>
        <p style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
          Explore the features that allow developers to build secure, robust pipelines and businesses to visualize cloud growth.
        </p>
      </section>

      {/* Grid of Main Features */}
      <section className="grid-3" style={{ marginBottom: '6rem' }}>
        {mainFeatures.map((feat, index) => (
          <div key={index} className="card">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: 'var(--primary-glow)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              {feat.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{feat.title}</h3>
            <p style={{ fontSize: '0.95rem' }}>{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Deep-Dive Grid Panels */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        
        {/* Panel 1 */}
        <div className="grid-2">
          <div>
            <span className="badge" style={{ background: '#10b98115', color: '#10b981', borderColor: '#10b98125' }}>
              <ShieldCheck size={14} /> Compliance & Privacy
            </span>
            <h2 style={{ marginBottom: '1.5rem' }}>Security structures that protect sensitive user records</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Every connection made through SaaSify uses custom SSL tunnels. Auth operations hash credentials using bcrypt on secure nodes, while session management utilizes encrypted JWT signatures.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Zap size={16} color="var(--primary)" /> Hashed password vaults with custom salts
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Zap size={16} color="var(--primary)" /> Auto-expiring admin dashboard tokens
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Zap size={16} color="var(--primary)" /> SOC2 Compliant system logging logs
              </li>
            </ul>
          </div>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--border-radius-lg)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={20} color="var(--primary)" /> API Edge Redundancy
            </h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Run workflows across our edge nodes. When client latency spikes, traffic routing redirects requests to local cluster instances:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>North America Edge</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>Active - 12ms</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>European Union Edge</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>Active - 18ms</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>Asia-Pacific Edge</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>Active - 25ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="grid-2" style={{ direction: 'rtl' }}>
          <div style={{ direction: 'ltr' }}>
            <span className="badge" style={{ background: '#f59e0b15', color: '#f59e0b', borderColor: '#f59e0b25' }}>
              <HeartHandshake size={14} /> Built for Scaling Teams
            </span>
            <h2 style={{ marginBottom: '1.5rem' }}>Integrations that bring your operations together</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Connect your database triggers directly to communication channels and developer workspaces. Make decisions from Slack alerts, trigger GitHub builds on schema updates, or sync documents to spreadsheet rows automatically.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Zap size={16} color="var(--primary)" /> Instant Webhook integrations
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Zap size={16} color="var(--primary)" /> Slack alert configurations for error reports
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Zap size={16} color="var(--primary)" /> Automated CSV/Excel reports export
              </li>
            </ul>
          </div>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--border-radius-lg)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-lg)',
            direction: 'ltr'
          }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileSpreadsheet size={20} color="var(--primary)" /> Structured Exports
            </h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Sync custom collections straight to storage layers. Automate CSV uploads to Google Drive or AWS S3:
            </p>
            <div style={{ padding: '1rem', background: 'var(--background)', borderRadius: '8px', border: '1px solid var(--surface-border)', fontFamily: 'monospace', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--primary)' }}>const</span> saasify = require(<span style={{ color: 'var(--success)' }}>'saasify-sdk'</span>);<br />
              <span style={{ color: 'var(--primary)' }}>const</span> config = &#123;<br />
              &nbsp;&nbsp;syncInterval: <span style={{ color: '#f59e0b' }}>'24h'</span>,<br />
              &nbsp;&nbsp;format: <span style={{ color: '#f59e0b' }}>'csv'</span>,<br />
              &nbsp;&nbsp;target: <span style={{ color: '#f59e0b' }}>'s3://production-telemetry'</span><br />
              &#125;;<br />
              saasify.initialize(config);
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Features;
