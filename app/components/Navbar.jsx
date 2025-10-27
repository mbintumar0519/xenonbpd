'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { scrollToHeroForm } from '../utils/scrollToForm';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <nav 
        className={(isScrolled || !isHomePage) ? 'bg-white' : ''}
        style={{
        position: 'fixed',
        width: '100%',
        height: '80px', // Fixed height prevents CLS
        zIndex: 40,
        background: (isScrolled || !isHomePage) ? 'white' : 'transparent',
        boxShadow: (isScrolled || !isHomePage) ? 'var(--shadow-lg)' : 'none',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 var(--space-6)',
          position: 'relative',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            {/* Logo - centered on mobile */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              width: 'fit-content'
            }} className="logo-container">
              <a href="#main" style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={(isScrolled || !isHomePage) ? "/logo.png" : "/logo-white.png"}
                  alt="Denali Health – Stone Mountain"
                  width="220"
                  height="60"
                  style={{
                    height: 'auto',
                    width: 'auto',
                    maxWidth: '200px',
                    maxHeight: '60px',
                    transition: 'opacity 0.3s ease'
                  }}
                />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="nav-links" style={{
              display: 'none',
              alignItems: 'center',
              gap: 'var(--space-6)'
            }}>
              <Link 
                href="/#about" 
                style={{
                  color: (isScrolled || !isHomePage) ? 'var(--gray-900)' : 'white',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
                className="nav-link"
              >
                About
              </Link>
              <Link 
                href="/#benefits" 
                style={{
                  color: (isScrolled || !isHomePage) ? 'var(--gray-900)' : 'white',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
                className="nav-link"
              >
                Benefits
              </Link>
              <Link 
                href="/#pi" 
                style={{
                  color: (isScrolled || !isHomePage) ? 'var(--gray-900)' : 'white',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
                className="nav-link"
              >
                Meet the Doc!
              </Link>
              <Link 
                href="/#enroll" 
                style={{
                  color: (isScrolled || !isHomePage) ? 'var(--gray-900)' : 'white',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
                className="nav-link"
              >
                How to Enroll
              </Link>
              <Link 
                href="/#contact" 
                style={{
                  color: (isScrolled || !isHomePage) ? 'var(--gray-900)' : 'white',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
                className="nav-link"
              >
                Contact
              </Link>
              <button 
                onClick={scrollToHeroForm}
                style={{
                  color: (isScrolled || !isHomePage) ? 'var(--gray-900)' : 'white',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                className="nav-link"
              >
                Get Help Today
              </button>
              
              <div>
                <a 
                  href="tel:+14049992734"
                  style={{
                    background: 'var(--primary-blue)',
                    color: 'white',
                    padding: 'var(--space-3) var(--space-5)',
                    fontSize: 'var(--text-base)',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    boxShadow: 'var(--shadow-md)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                  className="nav-cta-button"
                >
                  <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  
                </a>
              </div>
            </div>
            
            {/* Invisible placeholder to prevent layout shift */}
            <div style={{
              width: '40px',
              height: '40px',
              visibility: 'hidden'
            }} className="mobile-menu-placeholder"></div>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              style={{
                padding: 'var(--space-2)',
                borderRadius: '0.5rem',
                background: (isScrolled || !isHomePage) ? 'var(--gray-100)' : 'rgba(255, 255, 255, 0.2)',
                color: (isScrolled || !isHomePage) ? 'var(--gray-900)' : 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2
              }}
              className="mobile-menu-button"
            >
              {isOpen ? (
                <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isOpen && (
        <div style={{
              position: 'fixed',
              top: '80px', // Fixed position based on navbar height
              left: 0,
              right: 0,
              zIndex: 30
            }}
            className="mobile-menu"
          >
            <div style={{
                background: 'white',
                borderBottomLeftRadius: '1rem',
                borderBottomRightRadius: '1rem',
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Link 
                  href="/#about" 
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: 'var(--space-4) var(--space-6)',
                    color: 'var(--gray-900)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '600',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--gray-100)',
                    }}
                  className="mobile-nav-link"
                >
                  About
                </Link>
                <Link 
                  href="/#benefits" 
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: 'var(--space-4) var(--space-6)',
                    color: 'var(--gray-900)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '600',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--gray-100)',
                    }}
                  className="mobile-nav-link"
                >
                  Benefits
                </Link>
                <Link 
                  href="/#pi" 
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: 'var(--space-4) var(--space-6)',
                    color: 'var(--gray-900)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '600',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--gray-100)',
                    }}
                  className="mobile-nav-link"
                >
                  Meet the Doc!
                </Link>
                <Link 
                  href="/#enroll" 
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: 'var(--space-4) var(--space-6)',
                    color: 'var(--gray-900)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '600',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--gray-100)',
                    }}
                  className="mobile-nav-link"
                >
                  How to Enroll
                </Link>
                <Link 
                  href="/#contact" 
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: 'var(--space-4) var(--space-6)',
                    color: 'var(--gray-900)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '600',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--gray-100)',
                    }}
                  className="mobile-nav-link"
                >
                  Contact
                </Link>
                <button 
                  onClick={(e) => {
                    scrollToHeroForm(e);
                    setIsOpen(false);
                  }}
                  style={{
                    padding: 'var(--space-4) var(--space-6)',
                    color: 'var(--gray-900)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '600',
                    textDecoration: 'none',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--gray-100)',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left'
                    }}
                  className="mobile-nav-link"
                >
                  Get Help Today
                </button>
                <div style={{
                  padding: 'var(--space-6)',
                  background: 'var(--gray-50)'
                }}>
                  <a 
                    href="tel:+14049992734" 
                    onClick={() => setIsOpen(false)}
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
                      textDecoration: 'none',
                      width: '100%'
                    }}
                    className="mobile-cta-button"
                  >
                    <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call or Text
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      
      <style jsx>{`
        .nav-links {
          display: none;
        }
        
        /* Ensure logo is perfectly centered on mobile */
        @media (max-width: 767px) {
          .logo-container {
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: fit-content !important;
          }
        }
        
        @media (min-width: 768px) {
          .nav-links {
            display: flex !important;
          }
          
          .mobile-menu-button {
            display: none;
          }
          
          .mobile-menu-placeholder {
            display: none;
          }
          
          .logo-container {
            position: static !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            width: auto !important;
          }
        }
        
        .nav-link:hover {
          color: var(--primary-blue) !important;
        }
        
        .nav-cta-button:hover {
          background: var(--primary-dark) !important;
          box-shadow: var(--shadow-lg) !important;
        }
        
        .mobile-nav-link:hover {
          background: var(--gray-50);
          color: var(--primary-blue) !important;
        }
        
        .mobile-cta-button:hover {
          background: var(--primary-dark) !important;
        }
        
        .mobile-menu-button:hover {
          background: ${(isScrolled || !isHomePage) ? 'var(--gray-200)' : 'rgba(255, 255, 255, 0.3)'} !important;
        }
      `}</style>
    </>
  );
} 