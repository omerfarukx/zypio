import { getTranslations } from 'next-intl/server';

export default async function DmcaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-gray-300 leading-relaxed">
      <h1 className="text-4xl font-bold text-white mb-8">DMCA Notice</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <p className="mb-4">
          Zypio Convert respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (DMCA), we will respond expeditiously to claims of copyright infringement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">How Our System Works</h2>
        <p className="mb-4">
          Zypio Convert is merely an automated tool that acts as an intermediary. We do not host, store, or cache any copyrighted material on our servers permanently. All processed files are automatically and permanently deleted within 1 hour.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Filing a Complaint</h2>
        <p className="mb-4">
          If you are a copyright owner or an agent thereof, and you believe that any content accessed through our service infringes upon your copyrights, you may submit a notification pursuant to the DMCA by providing our Copyright Agent with the following information in writing:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
          <li>Identification of the copyrighted work claimed to have been infringed.</li>
          <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and email address.</li>
        </ul>
        <p>
          Send your DMCA notices to: <a href="mailto:dmca@zypio.online" className="text-blue-400 hover:underline">dmca@zypio.online</a>
        </p>
      </section>
    </div>
  );
}
