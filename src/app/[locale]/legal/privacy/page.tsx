import { getTranslations } from 'next-intl/server';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-gray-300 leading-relaxed">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">1. Data Collection</h2>
        <p className="mb-4">
          At Zypio Convert, your privacy is our priority. We do not require registration or collect personal identifiable information (PII) to use our basic services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">2. File Storage and Deletion</h2>
        <p className="mb-4">
          Any files you process or download through our service are strictly temporary. We use automated systems that permanently delete all processed files from our servers within 1 hour. We do not keep backups or logs of the files you convert.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">3. Cookies and Analytics</h2>
        <p className="mb-4">
          We use standard cookies and analytics tools (like Google Analytics) to understand how our site is used, track performance, and display relevant advertisements. These tools may collect anonymous usage data such as your IP address, browser type, and pages visited.
        </p>
      </section>
    </div>
  );
}
