import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Trans Health Research & Content Aggregator</h1>
        <p className="text-xl text-gray-600">
          A community-driven index of TikTok creators sharing knowledge about hormone therapy effects on chronic conditions
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Creator Index</h2>
          <p className="text-gray-600 mb-4">
            Browse our directory of TikTok creators sharing their experiences with hormone therapy and chronic conditions
          </p>
          <Link 
            href="/creators" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            View Creators
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Submit Your Content</h2>
          <p className="text-gray-600 mb-4">
            Share your TikTok content with the community. All submissions require explicit consent
          </p>
          <Link 
            href="/submit" 
            className="inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Submit Content
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-600 mb-4">
            Learn more about our mission to preserve and amplify community-generated knowledge
          </p>
          <Link 
            href="/about" 
            className="inline-block bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
