export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="px-6 py-10 sm:px-10">
          <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-indigo-500 pb-4 mb-8">
            Terms of Service
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                1. Acceptance of Terms
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  By accessing or using the Adermis skin analysis service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                2. User Responsibilities
              </h2>
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <strong>Accurate Information:</strong> Provide true and current information during the skin analysis process.
                  </li>
                  <li>
                    <strong>Intended Use:</strong> Use the service solely for personal health insights and as intended.
                  </li>
                  <li>
                    <strong>Account Security:</strong> Maintain the confidentiality of your account credentials and prevent unauthorized access.
                  </li>
                  <li>
                    <strong>Ethical Use:</strong> Do not misuse the service or attempt to compromise its integrity.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                3. Limitation of Liability
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700 mb-4">
                  Adermis provides AI-powered skin analysis as a supportive tool. Important disclaimers include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    Our service is not a substitute for professional medical diagnosis or treatment.
                  </li>
                  <li>
                    Users should always consult with healthcare professionals for definitive medical advice.
                  </li>
                  <li>
                    Adermis is not liable for any decisions made based on our analysis.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                4. Privacy and Data Handling
              </h2>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <p className="text-gray-700">
                  We are committed to protecting your privacy. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your data.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                5. Changes to Terms
              </h2>
              <p className="text-gray-700">
                Adermis reserves the right to modify these Terms of Service at any time. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}