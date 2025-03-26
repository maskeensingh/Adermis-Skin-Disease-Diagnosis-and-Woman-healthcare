export default function PrivacyPolicy() {
  return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="px-6 py-10 sm:px-10">
                  <div className="max-w-prose mx-auto">
                      <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-indigo-500 pb-4 mb-8">
                          Privacy Policy
                      </h1>

                      <div className="space-y-8">
                          <section>
                              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                                  Information Collection
                              </h2>
                              <p className="text-gray-600 mb-4">
                                  At Adermis, we are committed to protecting your privacy while providing 
                                  innovative skin health analysis. We carefully collect and manage the following 
                                  types of information:
                              </p>
                              <ul className="space-y-2 pl-5 list-disc text-gray-700">
                                  <li>
                                      <strong>User-Uploaded Images:</strong> Securely processed images for 
                                      skin condition analysis
                                  </li>
                                  <li>
                                      <strong>Descriptive Information:</strong> Textual details about 
                                      skin conditions to enhance analysis accuracy
                                  </li>
                                  <li>
                                      <strong>Usage Data:</strong> Anonymous analytics to improve our service
                                  </li>
                              </ul>
                          </section>

                          <section>
                              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                                  Purpose of Information Use
                              </h2>
                              <p className="text-gray-600 mb-4">
                                  We utilize your information with the utmost care and specific intentions:
                              </p>
                              <div className="bg-indigo-50 p-6 rounded-lg">
                                  <ul className="space-y-3 pl-5 list-disc text-gray-700">
                                      <li>
                                          <strong>Precise Analysis:</strong> Deliver accurate skin condition insights
                                      </li>
                                      <li>
                                          <strong>Continuous Improvement:</strong> Enhance our AI model's diagnostic capabilities
                                      </li>
                                      <li>
                                          <strong>User Experience:</strong> Provide personalized and meaningful health recommendations
                                      </li>
                                  </ul>
                              </div>
                          </section>

                          <section>
                              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                                  Data Protection Commitment
                              </h2>
                              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                                  <p className="text-gray-700 mb-2">
                                      We employ state-of-the-art security protocols to ensure:
                                  </p>
                                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                      <li>End-to-end encryption of personal data</li>
                                      <li>Strict access controls</li>
                                      <li>Regular security audits</li>
                                      <li>Compliance with global data protection regulations</li>
                                  </ul>
                              </div>
                          </section>

                          <section>
                              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                                  Your Rights
                              </h2>
                              <p className="text-gray-600 mb-2">
                                  You have the right to:
                              </p>
                              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                  <li>Access your personal information</li>
                                  <li>Request data deletion</li>
                                  <li>Opt-out of data collection</li>
                              </ul>
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
      </div>
  );
}