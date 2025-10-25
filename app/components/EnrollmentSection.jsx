// No need for changes here

'use client';

export default function EnrollmentSection() {
  return (
    <section id="enroll" className="enrollment-section" style={{
      background: 'var(--gray-50)',
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
        }}>
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            color: 'var(--gray-900)',
            fontWeight: '700',
            marginBottom: 'var(--space-4)',
            fontFamily: 'var(--font-heading)'
          }}>What to Expect</h2>
          <div className="underline" style={{
            width: '80px',
            height: '4px',
            background: 'var(--primary-blue)',
            margin: '0 auto var(--space-6)',
            borderRadius: '2px'
          }}></div>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--gray-500)',
            maxWidth: '768px',
            margin: '0 auto',
            fontFamily: 'var(--font-primary)'
          }}>
            From screening to follow‑up, we’ll support you every step. Free Uber provided for all visits.
          </p>
        </div>
        
        <div className="enrollment-steps" style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Timeline line */}
          <div style={{
            content: '',
            position: 'absolute',
            left: '40px',
            top: '60px',
            bottom: '60px',
            width: '2px',
            background: 'var(--gray-300)'
          }}></div>
            
          {/* Step 1 */}
          <div className="step" style={{
              display: 'flex',
              gap: 'var(--space-8)',
              marginBottom: 'var(--space-12)',
              position: 'relative'
            }}
          >
            <div className="step-number" style={{
              flexShrink: 0,
              width: '80px',
              height: '80px',
              background: 'white',
              border: '3px solid var(--primary-blue)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-3xl)',
              fontWeight: '700',
              color: 'var(--primary-blue)',
              position: 'relative',
              zIndex: 1
            }}>
              1
            </div>
            <div className="step-content" style={{
              flex: 1,
              background: 'white',
              padding: 'var(--space-8)',
              borderRadius: '1rem',
              border: '1px solid var(--gray-100)'
            }}>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-3)',
                fontWeight: '600'
              }}>Screening Visits (2–4 weeks)</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                We’ll discuss your history and current symptoms, do health checks (blood work, EKG), and ensure the study is safe for you. Free Uber provided.
              </p>
            </div>
          </div>
            
          {/* Step 2 */}
          <div className="step" style={{
              display: 'flex',
              gap: 'var(--space-8)',
              marginBottom: 'var(--space-12)',
              position: 'relative'
            }}
          >
            <div className="step-number" style={{
              flexShrink: 0,
              width: '80px',
              height: '80px',
              background: 'white',
              border: '3px solid var(--primary-blue)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-3xl)',
              fontWeight: '700',
              color: 'var(--primary-blue)',
              position: 'relative',
              zIndex: 1
            }}>
              2
            </div>
            <div className="step-content" style={{
              flex: 1,
              background: 'white',
              padding: 'var(--space-8)',
              borderRadius: '1rem',
              border: '1px solid var(--gray-100)'
            }}>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-3)',
                fontWeight: '600'
              }}>Treatment Phase (6 weeks)</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                Take one capsule daily with dinner. You’ll have regular visits to see how you’re doing and talk about symptoms. Uber picks you up and brings you home.
              </p>
            </div>
          </div>
            
          {/* Step 3 */}
          <div className="step" style={{
              display: 'flex',
              gap: 'var(--space-8)',
              marginBottom: 'var(--space-12)',
              position: 'relative'
            }}
          >
            <div className="step-number" style={{
              flexShrink: 0,
              width: '80px',
              height: '80px',
              background: 'white',
              border: '3px solid var(--primary-blue)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-3xl)',
              fontWeight: '700',
              color: 'var(--primary-blue)',
              position: 'relative',
              zIndex: 1
            }}>
              3
            </div>
            <div className="step-content" style={{
              flex: 1,
              background: 'white',
              padding: 'var(--space-8)',
              borderRadius: '1rem',
              border: '1px solid var(--gray-100)'
            }}>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-3)',
                fontWeight: '600'
              }}>Follow‑up Phase (8 weeks)</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                We’ll check in to make sure you’re okay, see if improvements continue, and discuss possible longer‑term options. Transportation always included.
              </p>
            </div>
          </div>
            
          {/* Step 4 */}
          <div className="step" style={{
              display: 'flex',
              gap: 'var(--space-8)',
              marginBottom: 'var(--space-12)',
              position: 'relative'
            }}
          >
            <div className="step-number" style={{
              flexShrink: 0,
              width: '80px',
              height: '80px',
              background: 'white',
              border: '3px solid var(--primary-blue)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-3xl)',
              fontWeight: '700',
              color: 'var(--primary-blue)',
              position: 'relative',
              zIndex: 1
            }}>
              4
            </div>
            <div className="step-content" style={{
              flex: 1,
              background: 'white',
              padding: 'var(--space-8)',
              borderRadius: '1rem',
              border: '1px solid var(--gray-100)'
            }}>
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-3)',
                fontWeight: '600'
              }}>Flexible Scheduling & Support</h3>
              <p style={{
                color: 'var(--gray-600)',
                lineHeight: '1.6'
              }}>
                Our team schedules appointments around your needs and provides compassionate support. Many participants find the structure and care helpful during depression.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .step-number:hover {
          background: var(--primary-blue);
          color: white;
        }
        
        @media (max-width: 768px) {
          .enrollment-steps {
            max-width: 100% !important;
          }
          
          .step {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          
          .step-number {
            margin-bottom: var(--space-4) !important;
          }
        }
      `}</style>
    </section>
  );
} 