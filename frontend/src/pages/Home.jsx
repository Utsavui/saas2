import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Zap, TrendingUp, Users, Star, BarChart3, Cloud, Settings } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <section className="section hero-section" style={{ position: 'relative', overflow: 'hidden', padding: '8rem 0 6rem 0' }}>
        {/* Background gradient glow */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--primary-glow-heavy) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(60px)',
          borderRadius: '50%',
          opacity: 0.8
        }}></div>

        <div className="container text-center">
          <span className="badge">
            <Zap size={14} fill="currentColor" /> Introducing SaaSify 2.0
          </span>
          <h1 style={{ marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.15 }}>
            Decentralized Analytics <br />
            <span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Built for Modern Teams
            </span>
          </h1>
          <p className="max-w-md" style={{ fontSize: '1.2rem', marginBottom: '2.5rem' }}>
            Unleash the power of real-time insights, automated reports, and cross-platform integrations. Scale your SaaS operations without the complexity.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/signup" className="btn btn-primary glow-effect">
              Start Free Trial <ArrowRight size={16} />
            </Link>
            <Link to="/features" className="btn btn-secondary">
              Explore Features
            </Link>
          </div>

          {/* Interactive Mockup Illustration */}
          <div style={{
            marginTop: '5rem',
            background: 'var(--surface)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            padding: '1rem',
            position: 'relative'
          }}>
            <div style={{
              background: 'var(--background)',
              borderRadius: 'var(--border-radius-md)',
              aspectRatio: '16/9',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid var(--surface-border)'
            }}>
              {/* Mock Window Header */}
              <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem', background: 'var(--surface)', borderBottom: '1px solid var(--surface-border)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
              </div>
              {/* Mock Dashboard Grid */}
              <div className="grid-3" style={{ padding: '2rem', flex: 1, textAlign: 'left', gap: '1.5rem' }}>
                <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Active Users</span>
                    <Users size={16} color="var(--primary)" />
                  </div>
                  <span style={{ fontSize: '2rem', fontWeight: 800 }}>14,892</span>
                  <span style={{ color: 'var(--success)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <TrendingUp size={12} /> +12.3% this week
                  </span>
                </div>
                <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Revenue Growth</span>
                    <BarChart3 size={16} color="var(--primary)" />
                  </div>
                  <span style={{ fontSize: '2rem', fontWeight: 800 }}>$48,250</span>
                  <span style={{ color: 'var(--success)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <TrendingUp size={12} /> +8.4% this week
                  </span>
                </div>
                <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Cloud Sync</span>
                    <Cloud size={16} color="var(--primary)" />
                  </div>
                  <span style={{ fontSize: '2rem', fontWeight: 800 }}>99.9%</span>
                  <span style={{ color: 'var(--success)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <CheckCircle2 size={12} /> Live backup active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--surface-border)' }}>
        <div className="container">
          <div className="text-center max-w-md" style={{ marginBottom: '4rem' }}>
            <span className="badge">Core Capabilities</span>
            <h2>Supercharge Your Workflow</h2>
            <p style={{ marginTop: '1rem' }}>
              We provide all the tools you need to analyze, optimize, and scale your user engagement and engineering pipelines.
            </p>
          </div>
          <div className="grid-3">
            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-glow)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifySelf: 'start', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Lightning Fast</h3>
              <p>Experience sub-millisecond response queries with our distributed Edge computing network.</p>
            </div>
            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-glow)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifySelf: 'start', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Enterprise Security</h3>
              <p>Rest easy with end-to-end encryption, SOC2 compliance, and automated daily backups.</p>
            </div>
            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-glow)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifySelf: 'start', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Settings size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Fully Customizable</h3>
              <p>Integrate directly with Slack, Jira, and GitHub, and configure custom dashboards in minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <span className="badge">Why Choose Us</span>
              <h2 style={{ marginBottom: '1.5rem' }}>Optimize performance and cut cloud costs by 40%</h2>
              <p style={{ marginBottom: '2rem' }}>
                Traditional analytics platforms are heavy, slow, and expensive. SaaSify optimizes server-side data compression so you query data rapidly without bloating your cloud compute bill.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="var(--primary)" />
                  <span style={{ fontWeight: 600 }}>Save up to 40% on AWS/GCP computing bills</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="var(--primary)" />
                  <span style={{ fontWeight: 600 }}>Collaborate globally with zero-latency synchronization</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="var(--primary)" />
                  <span style={{ fontWeight: 600 }}>Automate compliance reporting for SOC2 and GDPR</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '450px',
                height: '400px',
                background: 'linear-gradient(135deg, var(--primary) 0%, #c084fc 100%)',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                padding: '2rem'
              }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                  <TrendingUp size={64} />
                  <h3 style={{ color: 'white', fontSize: '2rem' }}>99.99% Uptime</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)' }}>Guaranteed by our highly redundant Kubernetes clusters deployed in multiple geo-regions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)' }}>
        <div className="container">
          <div className="text-center max-w-md" style={{ marginBottom: '4rem' }}>
            <span className="badge">Testimonials</span>
            <h2>Trusted by Industry Leaders</h2>
            <p style={{ marginTop: '1rem' }}>See how scaling companies trust SaaSify to manage and automate their cloud workflows.</p>
          </div>
          <div className="grid-3">
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "SaaSify has completely transformed how our engineering team processes logs. What used to take hours now executes in real-time."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#cbd5e1', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>Sarah Jenkins</h4>
                  <p style={{ fontSize: '0.8rem' }}>CTO at TechFlow</p>
                </div>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "Our marketing team now builds complex client reports without needing SQL training. The visual dashboard creator is incredible."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#cbd5e1', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>M</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>Marcus Chen</h4>
                  <p style={{ fontSize: '0.8rem' }}>VP of Growth at ScaleUp</p>
                </div>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "The pricing is fair, the support is helpful, and the product works. Upgrading from the Basic to the Pro plan was seamless."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#cbd5e1', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>E</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>Elena Rostova</h4>
                  <p style={{ fontSize: '0.8rem' }}>Operations Lead at Optima</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="section">
        <div className="container">
          <div className="text-center max-w-md" style={{ marginBottom: '4rem' }}>
            <span className="badge">Plans Overview</span>
            <h2>Simple, Transparent Pricing</h2>
            <p style={{ marginTop: '1rem' }}>Select a plan that suits your team. Upgrade, downgrade, or cancel anytime.</p>
          </div>
          <div className="grid-3" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="card pricing-card">
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>Basic</h3>
                <p>Perfect for early testing</p>
                <div className="price-box">
                  <span className="price">$19</span>
                  <span className="period">/mo</span>
                </div>
                <ul className="features-list">
                  <li><CheckCircle2 size={16} color="var(--primary)" /> 5,000 queries / mo</li>
                  <li><CheckCircle2 size={16} color="var(--primary)" /> 3 integrated pipelines</li>
                  <li><CheckCircle2 size={16} color="var(--primary)" /> Standard logging metrics</li>
                </ul>
              </div>
              <Link to="/pricing" className="btn btn-secondary" style={{ width: '100%' }}>Get Started</Link>
            </div>
            
            <div className="card pricing-card popular">
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>Pro</h3>
                <p>Designed for growth</p>
                <div className="price-box">
                  <span className="price">$49</span>
                  <span className="period">/mo</span>
                </div>
                <ul className="features-list">
                  <li><CheckCircle2 size={16} color="var(--primary)" /> 50,000 queries / mo</li>
                  <li><CheckCircle2 size={16} color="var(--primary)" /> Unlimited pipelines</li>
                  <li><CheckCircle2 size={16} color="var(--primary)" /> Advanced analytics engine</li>
                  <li><CheckCircle2 size={16} color="var(--primary)" /> 24/7 Priority support</li>
                </ul>
              </div>
              <Link to="/pricing" className="btn btn-primary" style={{ width: '100%' }}>Get Started</Link>
            </div>

            <div className="card pricing-card">
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>Enterprise</h3>
                <p>Custom setups for scale</p>
                <div className="price-box">
                  <span className="price">$199</span>
                  <span className="period">/mo</span>
                </div>
                <ul className="features-list">
                  <li><CheckCircle2 size={16} color="var(--primary)" /> Unlimited queries</li>
                  <li><CheckCircle2 size={16} color="var(--primary)" /> Dedicated support manager</li>
                  <li><CheckCircle2 size={16} color="var(--primary)" /> Custom SLA agreements</li>
                  <li><CheckCircle2 size={16} color="var(--primary)" /> Single sign-on (SSO)</li>
                </ul>
              </div>
              <Link to="/pricing" className="btn btn-secondary" style={{ width: '100%' }}>Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--surface-border)' }}>
        <div className="container text-center max-w-md">
          <h2>Ready to transform your cloud database metrics?</h2>
          <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            Get started in under five minutes. No credit card required to begin your 14-day free trial of SaaSify.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/signup" className="btn btn-primary glow-effect">
              Try It Free
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
