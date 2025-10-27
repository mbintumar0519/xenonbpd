'use client';

import Image from "next/image";
// import HeroForm from './HeroForm'; // Retired - keeping for later
// import QualificationQuestionnaire from './QualificationQuestionnaire'; // Replaced with PreScreeningForm
import PreScreeningForm from './PreScreenForm';

export default function HeroSection() {

  return (
    <section className="hero-gradient relative min-h-screen overflow-hidden" style={{ paddingTop: '0' }}>
      {/* Background gradient - extends to cover navbar area */}
      <div className="absolute inset-0 z-[0]" style={{
        background: 'linear-gradient(135deg, #0B2A6B 0%, #1E3A8A 50%, #A7F3D0 100%)',
        top: '0',
        bottom: '0'
      }}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content container */}
      <div className="hero-content max-w-7xl mx-auto px-6 pb-20 relative z-10" style={{ paddingTop: '96px', paddingLeft: 'var(--space-6)', paddingRight: 'var(--space-6)', paddingBottom: 'var(--space-20)' }}>
        {/* Mobile: Text first, then image */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Text content - appears first on mobile */}
          <div className="hero-text order-1 lg:order-1">
            <div>
              <h1 style={{
                color: 'white',
                fontSize: 'var(--text-5xl)',
                fontWeight: '700',
                lineHeight: '1.1',
                marginBottom: 'var(--space-6)',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                fontFamily: 'var(--font-heading)'
              }}>
                Find Hope When Depression Feels Overwhelming
              </h1>
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: 'var(--text-xl)',
                lineHeight: '1.6',
                marginBottom: 'var(--space-8)',
                fontFamily: 'var(--font-primary)'
              }}>
               This is a research study for exploring a potential new treatment for people living with bipolar depression. Up to $1,500 compensation and free round‑trip Uber to every visit is available.
              </p>

              {/* Balanced benefits - larger and higher contrast */}
              <div className="benefits-balanced grid grid-cols-2 gap-4 mt-7 mx-auto" style={{
                maxWidth: '680px'
              }}>
                <div className="benefit-pill flex items-center justify-center gap-3 lg:gap-4 px-4 py-3 lg:px-6 lg:py-4 bg-white/20 rounded-3xl border border-white/30 text-base lg:text-lg text-white font-semibold shadow-[0_6px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Study Care
                </div>

                <div className="benefit-pill flex items-center justify-center gap-3 lg:gap-4 px-4 py-3 lg:px-6 lg:py-4 bg-white/20 rounded-3xl border border-white/30 text-base lg:text-lg text-white font-semibold shadow-[0_6px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Expert Care
                </div>

                <div className="benefit-pill flex items-center justify-center gap-3 lg:gap-4 px-4 py-3 lg:px-6 lg:py-4 bg-white/30 rounded-3xl border border-white/40 text-base lg:text-lg text-white font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.28)] backdrop-blur">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Up to $1,500
                </div>

                <div className="benefit-pill flex items-center justify-center gap-3 lg:gap-4 px-4 py-3 lg:px-6 lg:py-4 bg-white/30 rounded-3xl border border-white/40 text-base lg:text-lg text-white font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.28)] backdrop-blur">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Free Uber Rides
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image - appears second on mobile */}
          <div className="hero-image-wrapper order-2 lg:order-2 mb-2 lg:mb-0 lg:-mt-8">
            <div className="relative">
              <Image
                src="/hero.png"
                alt="Denali Health – Stone Mountain illustration"
                width={1024}
                height={1024}
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                quality={100}
              />
            </div>
          </div>
        </div>

        {/* Pre-Screening Form - Desktop: Below content, Mobile: After benefits */}
        <div className="mt-12 lg:mt-16 max-w-2xl mx-auto">
          <PreScreeningForm />
        </div>
      </div>
    </section>
  );
}
