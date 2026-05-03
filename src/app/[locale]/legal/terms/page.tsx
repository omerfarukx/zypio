import { getTranslations } from 'next-intl/server';

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-gray-300 leading-relaxed">
      <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using Zypio Convert ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
        <p className="mb-4">
          Zypio Convert is a tool that allows users to download and convert media files from publicly accessible platforms. The Service is provided "AS IS" and we are not responsible for any copyright infringements caused by the users.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Users must only download content they have the right to download.</li>
          <li>Users must not use the Service for any illegal or unauthorized purpose.</li>
          <li>Users are solely responsible for the content they download and how they use it.</li>
        </ul>
      </section>
    </div>
  );
}
