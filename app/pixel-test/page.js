'use client';

export default function PixelTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test Page Disabled
        </h1>
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-yellow-800">
            <strong>This test page has been disabled.</strong> Facebook tracking has been simplified to a single Lead event that fires on the thank-you page with full user data.
          </p>
        </div>
      </div>
    </div>
  );
}
