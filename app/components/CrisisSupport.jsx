'use client';

export default function CrisisSupport() {
  return (
    <section aria-labelledby="crisis-title" className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 id="crisis-title" className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">If You're in Crisis Right Now</h2>
        <p className="text-gray-700 mb-4">If you're having thoughts of suicide or self-harm, please reach out for help immediately:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-800">
          <li><strong>Crisis Lifeline:</strong> Call or text 988</li>
          <li><strong>Emergency:</strong> Call 911</li>
          <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
        </ul>
        <p className="text-gray-700 mt-4">You matter. Your life matters. Help is available right now.</p>
      </div>
    </section>
  );
}


