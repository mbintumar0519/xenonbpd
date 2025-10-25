'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEnvelope, faPhone, faHandshake } from '@fortawesome/free-solid-svg-icons';

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <FontAwesomeIcon 
              icon={faCheckCircle} 
              className="text-6xl text-success mb-4"
            />
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-main mb-4">
              Thank You for Your Interest
            </h1>
            <p className="text-lg text-text-secondary">
              We've received your information and will be in touch soon.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-main mb-4">
              What Happens Next?
            </h2>
            <p className="text-text-secondary mb-6">
              Our research team will review your information and contact you within 1-2 business days 
              to discuss your eligibility and answer any questions you may have about our research study.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="text-3xl text-primary-600 mb-3"
                />
                <h3 className="font-semibold text-text-main mb-2">Email Follow-up</h3>
                <p className="text-sm text-text-secondary">
                  You'll receive an email confirmation and next steps information.
                </p>
              </div>
              
              <div className="text-center">
                <FontAwesomeIcon 
                  icon={faPhone} 
                  className="text-3xl text-primary-600 mb-3"
                />
                <h3 className="font-semibold text-text-main mb-2">Phone Consultation</h3>
                <p className="text-sm text-text-secondary">
                  A study coordinator will call to discuss the research in detail.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-primary-50 rounded-lg p-6">
            <h3 className="text-xl font-heading font-bold text-text-main mb-4">
              Questions? Contact Us
            </h3>
            <p className="text-text-secondary mb-4">
              If you have immediate questions about our research study, please don't hesitate to reach out:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:+14049992734" 
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPhone} />
                Call +1 (404) 999-2734
              </a>
              <a 
                href="mailto:info@accessresearchinstitute.com" 
                className="btn btn-secondary inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Email Us
              </a>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-text-secondary italic">
              <strong>Important:</strong> This is an investigational treatment being studied. 
              Participation is voluntary and you may withdraw at any time. There is no guarantee 
              of therapeutic benefit, and alternative treatments are available. Please consult 
              with your doctor about all treatment options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}