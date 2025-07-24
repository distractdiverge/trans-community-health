export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About Us</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-4">
          This project aims to create a centralized, community-driven index of TikTok creators who are documenting and discussing the effects of hormone therapy on chronic conditions like hEDS, POTS, and MCAS.
        </p>
        <p className="text-gray-600 mb-4">
          We believe that the informal research being done by transgender, nonbinary, and gender-diverse individuals is valuable knowledge that should be preserved and made discoverable.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Ethical Framework</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong>No Unsolicited Scraping:</strong> We do not automatically scrape content from TikTok. Every creator and piece of content featured on this site is based on explicit, informed consent.
          </p>
          <p className="text-gray-600">
            <strong>Privacy First:</strong> We only collect the minimum amount of information necessary to run the index. No personally identifiable information is required beyond what is publicly available on TikTok.
          </p>
          <p className="text-gray-600">
            <strong>Control:</strong> Creators can request to have their content removed at any time, for any reason. We provide clear and easy ways to contact us for removal requests.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Digital Preservation</h2>
        <p className="text-gray-600 mb-4">
          We recognize the importance of preserving this community-generated knowledge. To ensure the information is not lost, we regularly submit our website's URL to the Internet Archive's Wayback Machine.
        </p>
        <p className="text-gray-600">
          While we do not host any videos directly, our index serves as a permanent record of the valuable research being conducted by our community members.
        </p>
      </section>
    </div>
  );
}
