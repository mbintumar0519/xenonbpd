'use client';
import Script from 'next/script';

export default function ContactSection() {

  return (
    <section id="contact" className="contact-section" style={{
      background: 'var(--gray-50)',
      padding: 'var(--space-20) 0',
      position: 'relative',
      overflow: 'hidden'
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
            Take the First Step Today
          </h2>
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
            maxWidth: '512px',
            margin: '0 auto',
            fontFamily: 'var(--font-primary)'
          }}>
            Call or text +1 (404) 999‑2734. Or email info@denali-health.com. We provide the Uber — you don’t need to worry about getting here.
          </p>
        </div>
        
        <div className="contact-content" style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div className="location-card" style={{
              background: 'white',
              borderRadius: '1.5rem',
              padding: 'var(--space-8)',
              border: '1px solid var(--gray-100)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h3 style={{
              fontSize: 'var(--text-2xl)',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              marginBottom: 'var(--space-6)',
              color: 'var(--gray-900)'
            }}>Office Location</h3>
            
            <div className="map-container" style={{
              width: '100%',
              height: '300px',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              marginBottom: 'var(--space-6)'
            }}>
              <iframe 
                src="https://www.google.com/maps?q=5329%20Memorial%20Drive%20STE%20A%20Stone%20Mountain%20GA%2030083&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Denali Health Office Location"
              ></iframe>
            </div>
            
            <div className="contact-details" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-8)'
            }}>
              <div className="detail-item" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 'var(--space-4)',
                background: 'var(--gray-50)',
                borderRadius: '1rem',
                }}>
                <div className="icon-circle" style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-dark))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-3)'
                }}>
                  <svg style={{ width: '24px', height: '24px', color: 'var(--primary-blue)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: '600',
                  color: 'var(--gray-900)',
                  marginBottom: 'var(--space-2)'
                }}>Address</h4>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--gray-600)',
                  lineHeight: '1.4'
                }}>5329 Memorial Drive STE A<br />Stone Mountain, GA 30083</p>
              </div>
              
              <div className="detail-item" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 'var(--space-4)',
                background: 'var(--gray-50)',
                borderRadius: '1rem',
                }}>
                <div className="icon-circle" style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-dark))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-3)'
                }}>
                  <svg style={{ width: '24px', height: '24px', color: 'var(--primary-blue)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: '600',
                  color: 'var(--gray-900)',
                  marginBottom: 'var(--space-2)'
                }}>Hours</h4>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--gray-600)',
                  lineHeight: '1.4'
                }}>Mon–Fri: 8am–5pm<br />Sat: 9am–1pm (by appt)</p>
              </div>
              
              <div className="detail-item" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 'var(--space-4)',
                background: 'var(--gray-50)',
                borderRadius: '1rem',
                }}>
                <div className="icon-circle" style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-dark))',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-3)'
                }}>
                  <svg style={{ width: '24px', height: '24px', color: 'var(--primary-blue)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: '600',
                  color: 'var(--gray-900)',
                  marginBottom: 'var(--space-2)'
                }}>Transportation</h4>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--gray-600)',
                  lineHeight: '1.4'
                }}>Free Uber provided<br />Free parking if preferred</p>
              </div>
            </div>
            
            <div className="action-buttons" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-4)'
            }}>
              <a 
                href="https://maps.google.com/?q=5329+Memorial+Drive+STE+A+Stone+Mountain+GA+30083" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--primary-blue)',
                  color: 'white',
                  padding: 'var(--space-4)',
                  fontSize: 'var(--text-base)',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                  boxShadow: 'var(--shadow-md)',
                  textDecoration: 'none'
                }}
                className="btn-primary"
              >
                <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Get Directions</span>
              </a>
              
              <a 
                href="tel:+14049992734"
                className="bg-gradient-to-r from-[#0B2A6B] to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-black text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{
                  padding: 'var(--space-4)',
                  fontSize: 'var(--text-base)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                  textDecoration: 'none',
                  color: 'white'
                }}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Get Help Today</span>
              </a>
            </div>

            {/* Online Booking */}
            <div style={{
              marginTop: 'var(--space-8)'
            }}>
              <h4 style={{
                fontSize: 'var(--text-base)',
                fontWeight: '600',
                color: 'var(--gray-900)',
                marginBottom: 'var(--space-3)'
              }}>Book Online</h4>
              <div style={{
                background: 'var(--gray-50)',
                border: '1px solid var(--gray-100)',
                borderRadius: '1rem',
                padding: 'var(--space-4)'
              }}>
                <iframe
                  src="https://api.leadconnectorhq.com/widget/booking/oCJUF0iOMFKJBd4fpZS6"
                  style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '780px' }}
                  scrolling="no"
                  id="oCJUF0iOMFKJBd4fpZS6_1761332013779"
                  title="Online Booking"
                ></iframe>
                <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .location-card:hover {
          box-shadow: var(--shadow-xl);
        }
        
        .detail-item:hover {
          background: white;
          box-shadow: var(--shadow-sm);
        }
        
        .btn-primary:hover {
          background: var(--primary-dark);
          box-shadow: var(--shadow-lg);
        }
        
        .btn-secondary:hover {
          background: var(--primary-blue);
          color: white;
        }
        
        @media (max-width: 768px) {
          .contact-details {
            grid-template-columns: 1fr !important;
          }
          
          .action-buttons {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
} 