'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // Start with first FAQ open

  const faqs = [
    {
      question: "Is compensation the only reason to join?",
      answer: "Compensation (up to $1,500 total) helps with practical needs, but many join for the chance to find relief from bipolar depression symptoms and to contribute to research that could help others."
    },
    {
      question: "What if I can’t drive or don’t have a car?",
      answer: "We provide free round‑trip Uber transportation to all study visits. We arrange everything so you don’t need to drive or find parking."
    },
    {
      question: "What if I’m assigned to placebo?",
      answer: "Half of participants may receive placebo. Everyone receives exceptional psychiatric care and regular check‑ins. If you complete the study, you may be eligible for an extension where everyone receives active medication."
    },
    {
      question: "I can barely leave my house. How can I do this?",
      answer: "We understand. Transportation is covered with Uber, and we schedule visits at times that work for you. Many people find that the structure and support help during depression."
    },
    {
      question: "Who can join?",
      answer: "Adults 18–74 with bipolar I or II currently in a depressive episode lasting at least 4 weeks."
    },
    {
      question: "What does participation involve?",
      answer: "Screening (2–4 weeks) with health checks, then a 6‑week treatment phase taking one capsule daily with dinner, and an 8‑week follow‑up. Uber transportation is included for all visits."
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <section id="faq" className="faq-section" style={{
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
            Frequently Asked Questions
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
            Find answers to common questions about our clinical research study.
          </p>
        </div>
        
        <div className="faq-container" style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {faqs.map((faq, index) => (
            <div key={index}>
              <div 
                className={`faq-item transition-all duration-300 ${
                  openIndex === index ? 'active' : ''
                }`} style={{
                  background: openIndex === index ? 'white' : 'var(--gray-50)',
                  borderRadius: '0.75rem',
                  marginBottom: 'var(--space-4)',
                  overflow: 'hidden',
                  border: openIndex === index ? '1px solid var(--primary-blue)' : '1px solid var(--gray-200)',
                  boxShadow: openIndex === index ? 'var(--shadow-md)' : 'none'
                }}
              >
                <div 
                  className="faq-question" 
                  onClick={() => toggleFAQ(index)}
                  style={{
                    padding: 'var(--space-6)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    color: 'var(--gray-900)',
                    fontWeight: '600'
                  }}>
                    {faq.question}
                  </h3>
                  <div className={`icon ${openIndex === index ? 'rotate' : ''}`} style={{
                    width: '24px',
                    height: '24px',
                    color: 'var(--primary-blue)',
                  }}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {openIndex === index && (
                  <div
                    className="overflow-hidden"
                    id={`faq-answer-${index}`}
                  >
                      <div className={`faq-answer ${openIndex === index ? 'open' : ''}`} style={{
                        padding: openIndex === index ? '0 var(--space-6) var(--space-6)' : '0',
                        color: 'var(--gray-600)',
                        lineHeight: '1.6',
                        maxHeight: openIndex === index ? '500px' : '0',
                        overflow: 'hidden',
                      }}>
                        <p style={{
                          lineHeight: '1.6',
                          fontSize: 'var(--text-base)',
                          fontFamily: 'var(--font-primary)'
                        }}>
                          {faq.answer}
                        </p>
                      </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{
            textAlign: 'center',
            marginTop: 'var(--space-16)'
          }}
        >
          <p style={{
            color: 'var(--gray-900)',
            marginBottom: 'var(--space-6)',
            fontSize: 'var(--text-lg)',
            fontWeight: '500',
            fontFamily: 'var(--font-heading)'
          }}>
            Have more questions about the study?
          </p>
          <a
            href="tel:+14049992734"
            className="btn-primary"
            style={{
              background: 'var(--primary-blue)',
              color: 'white',
              padding: 'var(--space-4) var(--space-8)',
              fontSize: 'var(--text-lg)',
              borderRadius: '0.75rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              boxShadow: 'var(--shadow-md)',
              textDecoration: 'none'
            }}
          >
            <svg 
              style={{ width: '20px', height: '20px' }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
            <span>Get Help Today</span>
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .btn-primary:hover {
          background: var(--primary-dark);
          box-shadow: var(--shadow-lg);
        }
      `}</style>
    </section>
  );
} 