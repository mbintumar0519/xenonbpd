'use client';

import Image from "next/image";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { scrollToHeroForm } from '../utils/scrollToForm';

export default function MeetPISection() {
  return (
    <section id="pi" className="py-12 md:py-24 bg-background-light relative overflow-hidden scroll-mt-24">
      {/* Background wave pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="wave-divider"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/3 max-w-[280px] mx-auto md:mx-0 mb-8 md:mb-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-text-primary transform rotate-6 rounded-2xl"></div>
              <Image
                src="/doctor.jpg"
                alt="Dr. Salman Muddassir, MD, FACP"
                width={400}
                height={500}
                className="relative rounded-2xl shadow-xl"
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-heading mb-4">About Dr. Maria E. Johnson</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-text-primary mb-6 md:mb-8 mx-auto md:mx-0"></div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-4">Principal Investigator</h3>
            </div>
            
            <div className="space-y-5 md:space-y-6">
              <div className="bg-background-white p-4 md:p-6 rounded-lg shadow-md border-l-4 border-primary">
                <p className="text-text-secondary text-base md:text-lg font-body">
                  Dr. Johnson has spent <strong>15 years</strong> caring for people with bipolar disorder and leading mood disorder research. “I’ve seen how bipolar depression can steal so much from people’s lives,” she says. “We’re committed to Find treatments that work faster and better.”
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 my-5 md:my-6">
                <div className="bg-background-white p-4 md:p-5 rounded-lg shadow-md border-t-4 border-primary text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 text-primary mb-3 md:mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-primary text-lg md:text-xl mb-1 font-heading">Board Certified</h4>
                  <p className="text-base md:text-lg text-text-secondary font-body font-semibold">Psychiatry</p>
                </div>
                
                <div className="bg-background-white p-4 md:p-5 rounded-lg shadow-md border-t-4 border-primary text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 text-primary mb-3 md:mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-primary text-lg md:text-xl mb-1 font-heading">Mood Disorder Expert</h4>
                  <p className="text-base md:text-lg text-text-secondary font-body font-semibold">15 years of bipolar care and research</p>
                </div>
                
                <div className="bg-background-white p-4 md:p-5 rounded-lg shadow-md border-t-4 border-primary text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 text-primary mb-3 md:mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-primary text-lg md:text-xl mb-1 font-heading">Faster Relief Focus</h4>
                  <p className="text-base md:text-lg text-text-secondary font-body font-semibold">Committed to treatments that work sooner
                  </p>
                </div>
              </div>
              
              <blockquote className="pl-4 md:pl-6 border-l-4 border-primary italic text-base md:text-lg text-text-secondary font-body bg-background-white p-3 md:p-4 rounded-r-lg shadow-md">
                “No one should have to wait months to feel relief from bipolar depression. That’s why we’re studying treatments that may help sooner.”
              </blockquote>
            </div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12 text-center">
          <div>
            <button 
              onClick={scrollToHeroForm}
              className="btn-primary inline-flex items-center justify-center px-5 py-3 md:px-6 md:py-3 text-sm md:text-base font-medium text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300 w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Get Help Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 