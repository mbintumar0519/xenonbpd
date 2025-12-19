'use client';

import { FaUserMd } from 'react-icons/fa';

const DoctorVideoSection = () => {

  const scrollToQuestionnaire = () => {
    const questionnaire = document.querySelector('.qualification-questionnaire');
    if (questionnaire) {
      questionnaire.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-mint-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-3">
              <span className="text-teal-500">About the</span>
              <span className="text-teal-500 flex items-center gap-3">
                Bipolar Depression Study
                <FaUserMd className="w-8 h-8 md:w-10 md:h-10 text-teal-400 drop-shadow-sm" />
              </span>
            </div>
          </h2>
          <div className="w-24 h-1 bg-white"></div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Container */}
          <div className="order-1 lg:order-1">
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="relative overflow-hidden rounded-xl bg-gray-900 aspect-[9/16] max-w-sm mx-auto">
                <iframe
                  src="https://www.youtube.com/embed/zuNmTXbxphE?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1"
                  title="Bipolar Depression Study Information Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-2 text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                <strong>Watch the quick overview video</strong>
              </p>

              <div className="text-left max-w-md mx-auto mb-8">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <strong>Dosing:</strong> 2 tablets once per week for 6 weeks
                  </li>
                  <li>
                    <strong>Study design:</strong> double-blind with a 50/50 chance of being randomized to Gate251 or placebo
                  </li>
                  <li>
                    <strong>No open-label extension</strong>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={scrollToQuestionnaire}
                className="bg-gradient-to-r from-[#0B2A6B] to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-black text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="text-lg">See if You May Qualify</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorVideoSection;