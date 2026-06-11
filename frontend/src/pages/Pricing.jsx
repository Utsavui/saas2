import React, { useState } from 'react';
import { Check, CheckCircle2, HelpCircle } from 'lucide-react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Basic',
      desc: 'Ideal for early validation and side projects.',
      monthlyPrice: 19,
      yearlyPrice: 15,
      features: [
        '5,000 telemetry queries / mo',
        '3 active pipelines',
        'Standard dashboard creation',
        'Weekly email summaries',
        'Community forum support',
      ],
      notIncluded: [
        'Advanced query analytics',
        'SSO Integration',
        'SLA Agreement',
        '24/7 Phone support'
      ]
    },
    {
      name: 'Pro',
      desc: 'The best option for scaling operations and startup apps.',
      monthlyPrice: 49,
      yearlyPrice: 39,
      features: [
        '50,000 telemetry queries / mo',
        'Unlimited active pipelines',
        'Advanced analytics query engine',
        'Real-time Slack alerts integration',
        'Export CSV/JSON metrics reports',
        'Priority email support (2hr SLA)',
        'Up to 5 team members access'
      ],
      notIncluded: [
        'SLA Agreement',
        'SSO Integration',
        'Custom edge node deployments'
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      desc: 'Custom architectures for security-conscious corporations.',
      monthlyPrice: 199,
      yearlyPrice: 159,
      features: [
        'Unlimited telemetry queries',
        'Unlimited active pipelines',
        'Custom edge node deployments',
        'Dedicated success manager',
        'SLA agreement contracts',
        'Single Sign-On (SSO) authentication',
        'Custom visual query modules',
        '24/7 Phone support response'
      ],
      notIncluded: []
    }
  ];

  return (
    <div className="container animate-fade-in-up" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      {/* Intro */}
      <section className="text-center max-w-md" style={{ marginBottom: '4rem' }}>
        <span className="badge">Pricing Plans</span>
        <h1>Simple, scalable plans for teams of all sizes</h1>
        <p style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
          Choose a plan that fits your requirements. Start with our 14-day free trial, no credit card required.
        </p>
      </section>

      {/* Toggle */}
      <div className="pricing-toggle-container">
        <span style={{ fontWeight: !isYearly ? '600' : '500', color: !isYearly ? 'var(--text-main)' : 'var(--text-muted)' }}>
          Monthly Billing
        </span>
        <label className="toggle-switch" htmlFor="billing-toggle">
          <input
            id="billing-toggle"
            type="checkbox"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
          />
          <span className="slider"></span>
        </label>
        <span style={{ fontWeight: isYearly ? '600' : '500', color: isYearly ? 'var(--text-main)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Yearly Billing
          <span style={{ fontSize: '0.75rem', background: 'var(--primary-glow)', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
            Save ~20%
          </span>
        </span>
      </div>

      {/* Grid of plans */}
      <section className="grid-3" style={{ marginBottom: '6rem' }}>
        {plans.map((plan, index) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
          return (
            <div key={index} className={`card pricing-card ${plan.popular ? 'popular' : ''}`}>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{plan.desc}</p>
                
                <div className="price-box">
                  <span className="price">${price}</span>
                  <span className="period">/month</span>
                </div>
                {isYearly && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginTop: '-1rem', marginBottom: '1.5rem' }}>
                    Billed annually (${price * 12}/year)
                  </p>
                )}

                <hr style={{ border: 'none', borderTop: '1px solid var(--surface-border)', margin: '1.5rem 0' }} />

                <ul className="features-list" style={{ margin: 0 }}>
                  {plan.features.map((feat, idx) => (
                    <li key={idx} style={{ color: 'var(--text-main)' }}>
                      <CheckCircle2 size={16} color="var(--primary)" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feat, idx) => (
                    <li key={idx} style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                      <CheckCircle2 size={16} color="var(--surface-border-hover)" />
                      <span style={{ textDecoration: 'line-through' }}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', marginTop: '2rem' }}
                onClick={() => alert(`Redirecting to registration for the ${plan.name} plan...`)}
              >
                Choose {plan.name}
              </button>
            </div>
          );
        })}
      </section>

      {/* FAQ Mini Section */}
      <section style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '5rem' }}>
        <div className="text-center max-w-md" style={{ marginBottom: '3rem' }}>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="grid-2">
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HelpCircle size={18} color="var(--primary)" /> Can I upgrade or downgrade later?
            </h3>
            <p style={{ fontSize: '0.95rem' }}>
              Yes, you can change your subscription tier directly from your billing profile page. Downgrades are pro-rated and added as account credit.
            </p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HelpCircle size={18} color="var(--primary)" /> Is there a limit on bandwidth?
            </h3>
            <p style={{ fontSize: '0.95rem' }}>
              We do not restrict pipeline bandwidth. Pricing is based entirely on the number of telemetry query operations processed per month.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
