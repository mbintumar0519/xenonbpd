'use client';

import { FaShieldAlt, FaMicroscope, FaDna } from 'react-icons/fa';
import { FaAtom, FaVirus, FaBullseye } from 'react-icons/fa';

const MechanismOfAction = () => {
  const steps = [
    {
      icon: <FaVirus className="w-12 h-12" />,
      title: "Different From Typical Antidepressants",
      description: "Azetukalner works on potassium channels (tiny switches for brain-cell signaling), not serotonin.",
      detail: "Mechanism aims to reduce risk of triggering mania."
    },
    {
      icon: <FaBullseye className="w-12 h-12" />,
      title: "Targets Anhedonia",
      description: "Addresses the numbness and emptiness where nothing feels enjoyable.",
      detail: "Participants reported music, food, and time with loved ones feeling meaningful again."
    },
    {
      icon: <FaShieldAlt className="w-12 h-12" />,
      title: "Close Monitoring & Safety",
      description: "Generally well‑tolerated; the most common effects reported were mild dizziness and drowsiness that often improved.",
      detail: "You’ll have regular safety check‑ins."
    },
    {
      icon: <FaAtom className="w-12 h-12" />,
      title: "Potential for Faster Relief",
      description: "In earlier studies, some people improved within one week (not 4–6 weeks).",
      detail: "Individual results vary; this is still investigational."
    }
  ];

  return (
    <section id="mechanism" className="mechanism-section" style={{
      background: 'white',
      padding: 'var(--space-20) 0'
    }}>
      <div className="container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 var(--space-6)'
      }}>
        {/* Section header */}
        <div className="section-header" style={{
            textAlign: 'center',
            marginBottom: 'var(--space-16)'
          }}
        >
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            color: 'var(--gray-900)',
            fontWeight: '700',
            marginBottom: 'var(--space-4)',
            fontFamily: 'var(--font-heading)'
          }}>
            What Makes This Different
          </h2>
          <div className="underline" style={{
            width: '80px',
            height: '4px',
            background: 'var(--primary-blue)',
            margin: '0 auto var(--space-6)',
            borderRadius: '2px'
          }}></div>
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--gray-500)',
            maxWidth: '768px',
            margin: '0 auto',
            fontFamily: 'var(--font-primary)'
          }}>
            A research approach focused on bipolar depression symptoms like loss of pleasure and motivation
          </p>
        </div>

        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: 'var(--space-8)',
              marginBottom: 'var(--space-12)',
              border: '1px solid var(--gray-100)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
              <FaMicroscope style={{
                width: '32px',
                height: '32px',
                color: 'var(--primary-blue)',
                marginRight: 'var(--space-4)'
              }} />
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: '600',
                color: 'var(--gray-900)',
                fontFamily: 'var(--font-heading)'
              }}>
                A Novel Approach to Bipolar Depression
              </h3>
            </div>
            
            <div className="novel-approach-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
              <div>
                <h4 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: '600',
                  color: 'var(--gray-900)',
                  marginBottom: 'var(--space-3)',
                  fontFamily: 'var(--font-heading)'
                }}>
                About the Study Medication
                </h4>
                <p style={{
                  color: 'var(--gray-600)',
                  lineHeight: '1.6',
                  fontFamily: 'var(--font-primary)'
                }}>
                Azetukalner is an investigational medication with a unique mechanism. Instead of targeting serotonin, it works on potassium channels in the brain that help neurons communicate. This approach is designed to address anhedonia — the loss of pleasure — and other core symptoms of bipolar depression.
                </p>
              </div>
              
              <div>
                <h4 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: '600',
                  color: 'var(--gray-900)',
                  marginBottom: 'var(--space-3)',
                  fontFamily: 'var(--font-heading)'
                }}>
                Why This Matters
                </h4>
                <p style={{
                  color: 'var(--gray-600)',
                  lineHeight: '1.6',
                  fontFamily: 'var(--font-primary)'
                }}>
                Many existing options can take weeks to help and may not address numbness and loss of pleasure. Earlier studies of azetukalner suggested meaningful improvements at the 20 mg dose being studied here. This trial focuses exclusively on bipolar I and II depression.
                </p>
              </div>
            </div>

          </div>

          {/* Feature cards */}
          <div className="feature-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-8)',
            marginTop: 'var(--space-12)'
          }}>
            {steps.map((step, index) => (
              <div
                key={index}
                className="feature-card" style={{
                  display: 'flex',
                  gap: 'var(--space-6)',
                  padding: 'var(--space-8)',
                  background: 'var(--gray-50)',
                  borderRadius: '1rem',
                  border: '1px solid var(--gray-100)'
                }}
              >
                <div className="icon-box" style={{
                  flexShrink: 0,
                  width: '60px',
                  height: '60px',
                  background: 'var(--primary-blue)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ color: 'white', fontSize: '30px' }}>
                    {step.icon}
                  </div>
                </div>
                <div className="content">
                  <h3 style={{
                    fontSize: 'var(--text-xl)',
                    color: 'var(--gray-900)',
                    marginBottom: 'var(--space-2)',
                    fontWeight: '600'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    color: 'var(--gray-500)',
                    lineHeight: '1.5',
                    fontSize: '0.95rem',
                    marginBottom: 'var(--space-2)'
                  }}>
                    {step.description}
                  </p>
                  <p style={{
                    color: 'var(--gray-500)',
                    fontSize: '0.875rem',
                    fontStyle: 'italic'
                  }}>
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .feature-card:hover {
          background: white;
          box-shadow: var(--shadow-md);
        }
        
        @media (max-width: 768px) {
          .feature-grid {
            grid-template-columns: 1fr !important;
          }
          
          .novel-approach-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-6) !important;
          }
          
          .novel-approach-grid > div {
            padding: 0 !important;
          }
          
          .novel-approach-grid h4 {
            font-size: var(--text-base) !important;
            margin-bottom: var(--space-2) !important;
          }
          
          .novel-approach-grid p {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
        }
        
        @media (max-width: 480px) {
          .novel-approach-grid {
            gap: var(--space-4) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default MechanismOfAction;