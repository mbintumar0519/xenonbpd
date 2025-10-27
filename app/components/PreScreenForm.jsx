'use client';

import { useState } from 'react';
import Script from 'next/script';

const questions = [
  {
    id: 'diagnosed_bipolar',
    question: (
      <>
        Have you been <span className="key-term">diagnosed</span> with <strong>bipolar I or bipolar II</strong> by a clinician?
      </>
    ),
    icon: '🩺',
    guidanceMessage: 'This study requires a bipolar I or II diagnosis from a healthcare provider.'
  },
  {
    id: 'current_depressive_episode',
    question: (
      <>
        Are you currently going through a <span className="key-term">depressive episode</span>?
      </>
    ),
    icon: '🌧️',
    subtext: <em>Ideally lasting at least 4 weeks.</em>,
    guidanceMessage: 'This study is for people currently in a depressive episode (lasting ~4+ weeks).'
  },
  {
    id: 'can_travel',
    question: (
      <>
        Can you travel to <span className="key-term">Stone Mountain</span> for study visits?
      </>
    ),
    icon: '🚗',
    subtext: <em>We provide free round‑trip Uber transportation.</em>,
    guidanceMessage: 'We provide free Uber transportation. If travel is difficult, let us know — our team can help.'
  }
];

const formatName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function PreScreeningForm() {
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!contactInfo.name?.trim()) {
      errors.name = 'Full name is required';
    } else if (contactInfo.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(contactInfo.name.trim())) {
      errors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Phone validation
    if (!contactInfo.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\d\s()+-]+$/.test(contactInfo.phone.trim()) || contactInfo.phone.replace(/[^\d]/g, '').length < 10) {
      errors.phone = 'Please enter a valid phone number with at least 10 digits';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactInfo.email?.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(contactInfo.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    // Age removed

    return errors;
  };

  // Check if user qualifies based on current answers
  const checkQualification = () => {
    const hasBipolarDiagnosis = answers.diagnosed_bipolar === 'Yes';
    const hasCurrentEpisode = answers.current_depressive_episode === 'Yes';
    const canTravelToStoneMountain = answers.can_travel === 'Yes';
    const ageQualified = true;

    // Check if any question has a disqualifying "No" answer
    const hasDisqualifyingAnswer = answers.diagnosed_bipolar === 'No' ||
                                   answers.current_depressive_episode === 'No' ||
                                   answers.can_travel === 'No';

    // Check if age is entered and out of range
    const hasDisqualifyingAge = false;

    // User is disqualified if they have any disqualifying answer OR disqualifying age
    const isDisqualified = hasDisqualifyingAnswer;

    // User qualifies if: all answers are "Yes" AND age is in range
    const qualified = hasBipolarDiagnosis && hasCurrentEpisode && canTravelToStoneMountain;
    return {
      qualified,
      isDisqualified,
      hasBipolarDiagnosis,
      hasCurrentEpisode,
      canTravelToStoneMountain,
      ageQualified
    };
  };

  const qualificationStatus = checkQualification();
  const isAgeOutOfRange = false;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsSubmitting(true);

    // Format name properly
    const formattedName = formatName(contactInfo.name);
    const [firstName, ...lastNameParts] = formattedName.split(' ');
    const lastName = lastNameParts.join(' ');

    // Check all qualification criteria
    const hasBipolarDiagnosis = answers.diagnosed_bipolar === 'Yes';
    const hasCurrentEpisode = answers.current_depressive_episode === 'Yes';
    const canTravelToStoneMountain = answers.can_travel === 'Yes';
    const ageQualified = true;

    // Overall qualification requires ALL criteria to be met
    const finalQualificationStatus = hasBipolarDiagnosis && hasCurrentEpisode && canTravelToStoneMountain && ageQualified;

    // Safeguard: Only allow qualified leads to submit
    if (!finalQualificationStatus) {
      setValidationErrors({ submit: 'Please answer all questions to proceed.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formattedName,
          phone: contactInfo.phone,
          email: contactInfo.email,
          source: 'pre-screening-form',
          qualificationStatus: 'qualified',
          answers: answers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // Store user data in sessionStorage for Facebook Lead tracking on thank-you page
      sessionStorage.setItem('leadData', JSON.stringify({
        email: contactInfo.email,
        phone: contactInfo.phone,
        firstName: firstName || '',
        lastName: lastName || '',
        city: data.locationData?.city || '',
        state: data.locationData?.state || '',
        zipCode: data.locationData?.postalCode || data.locationData?.zipCode || ''
      }));

      // Redirect to thank you page
      window.location.href = '/thank-you';

    } catch (err) {
      console.error('Submission error:', err);
      setValidationErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="qualification-questionnaire bg-white rounded-2xl shadow-xl max-w-[600px] mx-auto animate-in slide-in-from-bottom-4 duration-500 px-4 py-6 sm:px-8 sm:py-8"
      style={{
        border: '1px solid transparent',
        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box'
      }}
    >
      {/* Gradient Top Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)' }}
      />

      {/* Minimal Header */}
      <div className="text-center mb-8 sm:mb-12 animate-in fade-in duration-300 delay-100">
        <h2
          className="font-semibold mb-3 sm:mb-4 text-gray-900 text-xl sm:text-2xl"
          style={{ fontWeight: '600', lineHeight: '1.3', letterSpacing: '-0.01em' }}
        >
          ✨ Get Help Today
        </h2>

        <p className="text-gray-600 leading-relaxed max-w-md mx-auto text-sm sm:text-base" style={{ lineHeight: '1.6' }}>
          Answer 2 quick questions. Our team will follow up with a short call to complete the full screening.
          <span className="font-medium text-gray-700"> No commitment required.</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Questions Section */}
        <div className="mb-12 sm:mb-20">
          <div className="mb-4 sm:mb-6 animate-in slide-in-from-left duration-300 delay-200">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-sm font-medium">
                1
              </div>
              <h3 className="font-medium text-gray-800 text-base sm:text-lg" style={{ fontWeight: '500', letterSpacing: '-0.005em' }}>
                3 quick questions
              </h3>
              <span className="text-sm">🎯</span>
            </div>
            <div className="h-px bg-gradient-to-r from-teal-200 via-emerald-200 to-transparent ml-9"></div>
          </div>

          <div className="space-y-6 sm:space-y-10">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="animate-in slide-in-from-right duration-300"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-teal-50/50 via-emerald-50/40 to-teal-50/50 rounded-xl p-4 sm:p-6 border border-teal-200/50 shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <span className="text-2xl sm:text-3xl flex-shrink-0" style={{ lineHeight: '1' }}>{question.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 font-semibold mb-2 sm:mb-3 text-lg sm:text-xl" style={{ fontWeight: '600', lineHeight: '1.4', letterSpacing: '-0.01em' }}>
                        {question.question}
                      </h4>
                      {question.subtext && (
                        <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{question.subtext}</p>
                      )}
                    </div>
                  </div>

                  {/* Yes/No Radio Buttons */}
                  <div className="flex gap-3 sm:gap-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value="Yes"
                        checked={answers[question.id] === 'Yes'}
                        onChange={() => handleAnswer(question.id, 'Yes')}
                        className="sr-only"
                      />
                      <div
                        className={`w-full text-center rounded-xl font-semibold transition-all duration-300 active:scale-95 sm:hover:scale-105 relative overflow-hidden ${
                          answers[question.id] === 'Yes'
                            ? 'bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/25 border border-teal-400/30'
                            : 'bg-gradient-to-br from-teal-50/80 via-emerald-50/60 to-teal-50/80 text-gray-700 sm:hover:from-teal-100/90 sm:hover:via-emerald-100/80 sm:hover:to-teal-100/90 sm:hover:shadow-md border border-teal-200/60 sm:hover:border-teal-300/70'
                        }`}
                        style={{
                          height: '52px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '17px'
                        }}
                      >
                        Yes
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value="No"
                        checked={answers[question.id] === 'No'}
                        onChange={() => handleAnswer(question.id, 'No')}
                        className="sr-only"
                      />
                      <div
                        className={`w-full text-center rounded-xl font-semibold transition-all duration-300 active:scale-95 sm:hover:scale-105 relative overflow-hidden ${
                          answers[question.id] === 'No'
                            ? 'bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/25 border border-teal-400/30'
                            : 'bg-gradient-to-br from-teal-50/80 via-emerald-50/60 to-teal-50/80 text-gray-700 sm:hover:from-teal-100/90 sm:hover:via-emerald-100/80 sm:hover:to-teal-100/90 sm:hover:shadow-md border border-teal-200/60 sm:hover:border-teal-300/70'
                        }`}
                        style={{
                          height: '52px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '17px'
                        }}
                      >
                        No
                      </div>
                    </label>
                  </div>

                  {/* Inline Guidance */}
                  {answers[question.id] === 'No' && (
                    <div
                      className="mt-3 sm:mt-4 rounded-xl animate-in slide-in-from-top-2 duration-200 p-3 sm:p-4"
                      style={{
                        background: 'linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%)',
                        border: '1px solid #BFDBFE'
                      }}
                    >
                      <p className="text-teal-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base" style={{ lineHeight: '1.5' }}>
                        <span className="text-base sm:text-lg flex-shrink-0">
                          {question.id === 'can_travel' ? '🚐' : 'ℹ️'}
                        </span>
                        <span>{question.guidanceMessage}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="animate-in slide-in-from-bottom duration-300 delay-500">
          <div className="mb-4 sm:mb-6 animate-in slide-in-from-left duration-300 delay-200">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-sm font-medium">
                2
              </div>
              <h3 className="font-medium text-gray-800 text-base sm:text-lg" style={{ fontWeight: '500', letterSpacing: '-0.005em' }}>
                Your contact info
              </h3>
              <span className="text-sm">📝</span>
            </div>
            <div className="h-px bg-gradient-to-r from-teal-200 via-emerald-200 to-transparent ml-9"></div>
          </div>

          <div className="bg-gradient-to-br from-teal-50/40 via-emerald-50/30 to-teal-50/40 rounded-xl p-4 sm:p-6 border border-teal-200/40 shadow-sm">
            <div className="space-y-4 sm:space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-gray-900 font-semibold mb-2" style={{ fontSize: '14px' }}>
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={contactInfo.name}
                  onChange={(e) => {
                    setContactInfo({ ...contactInfo, name: e.target.value });
                    if (validationErrors.name) {
                      setValidationErrors({ ...validationErrors, name: undefined });
                    }
                  }}
                  className={`w-full px-4 border rounded-xl transition-all duration-300 focus:scale-102 focus:shadow-lg input-field ${
                    validationErrors.name
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                      : 'border-blue-200/60 focus:border-blue-400/80 focus:ring-4 focus:ring-blue-500/15 hover:border-blue-300/70'
                  }`}
                  style={{
                    height: '48px',
                    fontSize: '16px',
                    background: validationErrors.name ? '' : 'linear-gradient(135deg, #FEFEFE 0%, #F8FAFC 100%)',
                    boxShadow: validationErrors.name ? '' : '0 1px 3px rgba(59, 130, 246, 0.05), inset 0 1px 2px rgba(0, 0, 0, 0.02)'
                  }}
                  placeholder="John Doe"
                />
                {validationErrors.name && (
                  <p className="text-red-600 mt-2 animate-in slide-in-from-top-2 duration-200" style={{ fontSize: '13px' }}>
                    {validationErrors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <div className="flex-1">
                  <label htmlFor="phone" className="block text-gray-900 font-semibold mb-2" style={{ fontSize: '14px' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={contactInfo.phone}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, phone: e.target.value });
                      if (validationErrors.phone) {
                        setValidationErrors({ ...validationErrors, phone: undefined });
                      }
                    }}
                    className={`w-full px-4 border rounded-xl transition-all duration-300 focus:scale-102 focus:shadow-lg input-field ${
                      validationErrors.phone
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                        : 'border-blue-200/60 focus:border-blue-400/80 focus:ring-4 focus:ring-blue-500/15 hover:border-blue-300/70'
                    }`}
                    style={{
                      height: '48px',
                      fontSize: '16px',
                      background: validationErrors.phone ? '' : 'linear-gradient(135deg, #FEFEFE 0%, #F8FAFC 100%)',
                      boxShadow: validationErrors.phone ? '' : '0 1px 3px rgba(59, 130, 246, 0.05), inset 0 1px 2px rgba(0, 0, 0, 0.02)'
                    }}
                    placeholder="+1 (404) 999-2734"
                  />
                  {validationErrors.phone && (
                    <p className="text-red-600 mt-2 animate-in slide-in-from-top-2 duration-200" style={{ fontSize: '13px' }}>
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
              </div>


              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-900 font-semibold mb-2" style={{ fontSize: '14px' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={contactInfo.email}
                  onChange={(e) => {
                    setContactInfo({ ...contactInfo, email: e.target.value });
                    if (validationErrors.email) {
                      setValidationErrors({ ...validationErrors, email: undefined });
                    }
                  }}
                  className={`w-full px-4 border rounded-xl transition-all duration-300 focus:scale-102 focus:shadow-lg input-field ${
                    validationErrors.email
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                      : 'border-blue-200/60 focus:border-blue-400/80 focus:ring-4 focus:ring-blue-500/15 hover:border-blue-300/70'
                  }`}
                  style={{
                    height: '48px',
                    fontSize: '16px',
                    background: validationErrors.email ? '' : 'linear-gradient(135deg, #FEFEFE 0%, #F8FAFC 100%)',
                    boxShadow: validationErrors.email ? '' : '0 1px 3px rgba(59, 130, 246, 0.05), inset 0 1px 2px rgba(0, 0, 0, 0.02)'
                  }}
                  placeholder="john@example.com"
                />
                {validationErrors.email && (
                  <p className="text-red-600 mt-2 animate-in slide-in-from-top-2 duration-200" style={{ fontSize: '13px' }}>
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Privacy Text */}
              <div className="flex items-start gap-2 pt-1 sm:pt-2">
                <span className="text-base sm:text-lg flex-shrink-0">🔒</span>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                  By submitting, you agree to be contacted about this or related studies. We never sell your information.
                </p>
              </div>

              
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 sm:pt-8 animate-in slide-in-from-bottom duration-300 delay-700">
          {qualificationStatus.isDisqualified && (
            <div
              className="mb-4 rounded-xl animate-in slide-in-from-top-2 duration-200 p-3 sm:p-4"
              style={{
                background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
                border: '1px solid #FCA5A5'
              }}
            >
              <p className="text-red-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base" style={{ lineHeight: '1.5' }}>
                <span className="text-base sm:text-lg flex-shrink-0">ℹ️</span>
                <span>
                  Based on your answers, you may not qualify for this study at this time. Please call or text us at <strong className="font-bold">+1 (404) 999-2734</strong> to discuss other options or studies that may be available.
                </span>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || qualificationStatus.isDisqualified}
            className="w-full text-white font-bold rounded-xl transition-all duration-300 shadow-lg sm:hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 sm:hover:scale-105 sm:hover:translate-y-[-2px] relative overflow-hidden button-hover"
            style={{
              height: '54px',
              fontSize: '17px',
              fontWeight: '700',
              background: isSubmitting || qualificationStatus.isDisqualified
                ? 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)'
                : 'linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #2DD4BF 100%)',
              boxShadow: isSubmitting || qualificationStatus.isDisqualified ? '' : '0 8px 25px rgba(20, 184, 166, 0.25), 0 4px 10px rgba(20, 184, 166, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </div>
            ) : (
              'Get Help Today!'
            )}
          </button>

          {validationErrors.submit && (
            <p className="text-red-600 text-center mt-3 sm:mt-4 animate-in slide-in-from-top-2 duration-200 text-sm">
              {validationErrors.submit}
            </p>
          )}

          <p className="text-gray-600 text-center mt-3 sm:mt-4 text-xs sm:text-sm">
            We'll call to answer your questions and explain next steps.
          </p>

          {/* Optional: Direct booking alternative */}
          <div className="text-center mt-6 sm:mt-8">
            <button
              type="button"
              onClick={() => setShowBooking(!showBooking)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-teal-200 text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors text-sm sm:text-base"
            >
              {showBooking ? 'Hide Online Booking' : 'Prefer to book directly? Book online'}
            </button>
          </div>

          {showBooking && (
            <div className="mt-4 sm:mt-6">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
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
          )}
        </div>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes buttonPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .button-hover:hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: shimmer 0.6s;
        }

        input:focus {
          outline: none;
        }

        .focus\\:scale-102:focus {
          transform: scale(1.02);
        }

        .input-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-field:focus {
          transform: translateY(-1px);
        }

        :global(.key-term) {
          color: #15803D;
          font-weight: 700;
          background: linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid #86EFAC;
          display: inline-block;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          :global(.key-term) {
            padding: 1px 4px;
            border-radius: 3px;
          }
        }
      `}</style>
    </div>
  );
}
