import React from 'react';
import { Target, Eye, Users2, Award, Briefcase, Sparkles } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Julian Vance',
      role: 'CEO & Co-founder',
      image: 'JV',
      bio: 'Former VP of Product at Salesforce with 15+ years experience in developer tools.',
    },
    {
      name: 'Aditi Patel',
      role: 'CTO & Co-founder',
      image: 'AP',
      bio: 'Distributed systems engineer. Built database query parsers at MongoDB and AWS.',
    },
    {
      name: 'Marcus Thorne',
      role: 'Head of Growth',
      image: 'MT',
      bio: 'Lead marketing strategies at Figma and Slack. Passionate about community-driven SaaS.',
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Customer Success',
      image: 'ER',
      bio: 'Dedicated to helping teams optimize their cloud telemetry integrations.',
    }
  ];

  return (
    <div className="container animate-fade-in-up" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      {/* Introduction */}
      <section className="text-center max-w-md" style={{ marginBottom: '5rem' }}>
        <span className="badge">Our Journey</span>
        <h1>We design the tools to unlock developer potential</h1>
        <p style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
          saasflowzen was founded in 2024 with a single mission: to make cloud infrastructure metrics digestible, actionable, and cost-effective.
        </p>
      </section>

      {/* Story Grid */}
      <section className="grid-2" style={{ marginBottom: '6rem' }}>
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>The Story Behind saasflowzen</h2>
          <p style={{ marginBottom: '1rem' }}>
            As developers, Aditi and Julian spent half their working hours querying databases, waiting for custom dashboard compiles, and tracking down runaway cloud usage bills.
          </p>
          <p>
            They realized that legacy monitoring dashboards were either too heavy for smaller projects or too expensive for scaling teams. They decided to build a lightweight, edge-native telemetry collector: and saasflowzen was born.
          </p>
        </div>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '3rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ padding: '0.75rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '8px' }}>
              <Award size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>Global Innovation Award</h3>
              <p style={{ fontSize: '0.9rem' }}>Recognized as the top developer analytics tool of 2025 by CloudTech.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ padding: '0.75rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '8px' }}>
              <Briefcase size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>Over 20M Queries Handled</h3>
              <p style={{ fontSize: '0.9rem' }}>Powering cloud data ingestion pipelines for thousands of scaleups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid-2" style={{ marginBottom: '6rem', gap: '3rem' }}>
        <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '0.75rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '12px' }}>
            <Target size={28} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.75rem' }}>Our Mission</h3>
            <p>
              To democratize developer telemetry so that startups and enterprises alike can make smart database scaling decisions without expensive infrastructure overhead.
            </p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '0.75rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '12px' }}>
            <Eye size={28} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.75rem' }}>Our Vision</h3>
            <p>
              To become the default monitoring layer for the decentralized web, offering zero-latency logging and prediction engines out of the box.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="text-center max-w-md" style={{ marginBottom: '4rem' }}>
          <span className="badge">The Builders</span>
          <h2>Meet the Team</h2>
          <p style={{ marginTop: '1rem' }}>Our team consists of database innovators, UI/UX veterans, and cloud scalability experts.</p>
        </div>
        
        <div className="grid-4">
          {team.map((member, index) => (
            <div key={index} className="card text-center" style={{ padding: '2rem 1.5rem' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                boxShadow: 'var(--shadow-md)'
              }}>
                {member.image}
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{member.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>{member.role}</p>
              <p style={{ fontSize: '0.9rem' }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
