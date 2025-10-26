'use client';

export default function EligibilitySection() {
  return (
    <section id="eligibility" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Could This Study Help You?</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Who Qualifies?</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-800">
              <li>Have bipolar I or bipolar II disorder</li>
              <li>Are currently in a depressive episode (lasting at least 4 weeks)</li>
              <li>Feel like nothing brings pleasure anymore (anhedonia)</li>
              <li>Are between 18–74 years old</li>
              <li>Want to try something different</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">You Know the Feeling:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-800">
              <li>Exhaustion that sleep doesn’t fix</li>
              <li>Emptiness where excitement used to be</li>
              <li>Effort it takes just to shower or make a meal</li>
              <li>Disconnect from people you love</li>
              <li>Frustration with treatments that haven’t worked well enough</li>
            </ul>
            <p className="text-gray-700 mt-3">This study is specifically designed to target these symptoms.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


