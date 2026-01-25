import { notFound } from "next/navigation";
import { PagesHero } from "@/components/hearderCom/hearder";
import Link from "next/link";
import Image from "next/image";

const newsArticles = [
  {
    id: 1,
    title: "Annual Charity Gala Raises $100,000 for Diabetes Prevention",
    excerpt:
      "Our recent fundraising event exceeded expectations, raising critical funds for community health initiatives.",
    category: "Event Report",
    date: "November 10, 2025",
    readTime: "5 min read",
    image: "/news/gala-2025.jpg",
    author: "Sarah Johnson",
    authorRole: "Event Coordinator",
    authorImage: "/team/sarah-johnson.jpg",
    featured: true,
    tags: ["Fundraising", "Diabetes", "Community", "Health"],

    content: `
      <p>The Annual Charity Gala held on November 6, 2025, at the Grand Ballroom was a resounding success, raising an impressive $100,000 for diabetes prevention programs. This marks a 25% increase from last year's fundraising efforts, demonstrating growing community support for our cause.</p>
      
      <h2>Event Highlights</h2>
      <p>The evening began with a cocktail reception featuring silent auction items donated by local businesses. Attendees had the opportunity to bid on exclusive experiences, artwork, and luxury items, all contributing to the fundraising goal.</p>
      
      <p>Key highlights of the evening included:</p>
      <ul>
        <li>Keynote speech by Dr. Emily Chen on "Modern Approaches to Diabetes Prevention"</li>
        <li>Live auction of a luxury vacation package that raised $15,000</li>
        <li>Musical performance by the City Symphony Orchestra</li>
        <li>Testimonials from individuals who have benefited from our programs</li>
      </ul>
      
      <h2>Fund Allocation</h2>
      <p>The funds raised will be allocated as follows:</p>
      <ul>
        <li>40% - Community screening programs in underserved areas</li>
        <li>30% - Educational workshops and materials</li>
        <li>20% - Research partnerships with local universities</li>
        <li>10% - Emergency assistance for families affected by diabetes</li>
      </ul>
      
      <blockquote>
        "This year's gala exceeded all expectations. The generosity shown by our community will directly impact hundreds of lives through our prevention programs."
        <footer>- Sarah Johnson, Event Coordinator</footer>
      </blockquote>
      
      <h2>Looking Ahead</h2>
      <p>Building on this success, we're already planning next year's event with a goal to raise $125,000. We're exploring partnerships with corporate sponsors and expanding our outreach to engage more community members.</p>
    `,

    stats: [
      { label: "Funds Raised", value: "$100,000" },
      { label: "Attendees", value: "300+" },
      { label: "Auction Items", value: "45" },
      { label: "Volunteers", value: "50" },
    ],

    gallery: ["/news/gala-1.jpg", "/news/gala-2.jpg", "/news/gala-3.jpg"],
  },
  {
    id: 2,
    title: "Sickle-cell Awareness Workshop Impacts 200+ Participants",
    excerpt:
      "The workshop focused on mental health and self-stigma reduction among sickle-cell survivors.",
    category: "Workshop Report",
    date: "September 25, 2025",
    readTime: "4 min read",
    image: "/news/workshop-report.jpg",
    author: "Dr. Michael Chen",
    authorRole: "Clinical Director",
    authorImage: "/team/michael-chen.jpg",
    featured: false,
    tags: ["Workshop", "Sickle-cell", "Mental Health", "Support"],

    content: `
      <p>On September 20, 2025, we hosted our most successful sickle-cell awareness workshop to date, reaching over 200 participants at the Main Street Community Center. The event focused on mental health support and reducing self-stigma among sickle-cell survivors.</p>
      
      <h2>Workshop Structure</h2>
      <p>The full-day workshop was divided into three main sessions:</p>
      
      <h3>Morning Session: Understanding Self-Stigma</h3>
      <p>Led by clinical psychologist Dr. James Wilson, this session explored the psychological impact of chronic illness and practical strategies for overcoming internalized stigma.</p>
      
      <h3>Afternoon Session: Peer Support Networks</h3>
      <p>Participants engaged in facilitated group discussions, sharing experiences and building connections with others facing similar challenges.</p>
      
      <h3>Evening Session: Art Therapy Workshop</h3>
      <p>Art therapist Robert Thompson guided participants through expressive art activities designed to process emotions and build resilience.</p>
      
      <h2>Participant Feedback</h2>
      <p>Post-workshop surveys showed:</p>
      <ul>
        <li>94% reported increased confidence in managing their condition</li>
        <li>87% felt less alone after connecting with other survivors</li>
        <li>91% would recommend the workshop to others</li>
      </ul>
      
      <blockquote>
        "For the first time, I felt truly understood. Connecting with others who share my experience has been life-changing."
        <footer>- Workshop Participant</footer>
      </blockquote>
      
      <h2>Future Initiatives</h2>
      <p>Based on this success, we're planning quarterly workshops and establishing a peer mentorship program to provide ongoing support.</p>
    `,

    stats: [
      { label: "Participants", value: "200+" },
      { label: "Satisfaction Rate", value: "94%" },
      { label: "Volunteer Facilitators", value: "12" },
      { label: "Future Workshops", value: "Quarterly" },
    ],

    gallery: ["/news/workshop-1.jpg", "/news/workshop-2.jpg"],
  },
  // Add more articles as needed
];

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const article = newsArticles.find((a) => a.id === parseInt(id));

  if (!article) {
    notFound();
  }

  const relatedArticles = newsArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 2);

  return (
    <>
      <PagesHero img={article.image} title={article.title} />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back to News Link */}
          <div className="mb-8">
            <Link
              href="/news"
              className="inline-flex items-center text-lilac hover:text-darkLilac transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to All News
            </Link>
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-lilac/10 text-darkLilac px-4 py-2 rounded-full font-medium">
                {article.category}
              </span>
              <div className="flex items-center text-gray-600">
                <span className="flex items-center mr-4">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {article.date}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {article.readTime}
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center border-t border-b border-gray-200 py-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                {article.authorImage && (
                  <Image
                    src={article.authorImage}
                    alt={article.author}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {article.author}
                </h3>
                <p className="text-gray-600">{article.authorRole}</p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {article.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="text-2xl font-bold text-lilac mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-lilac hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {article.gallery && article.gallery.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Event Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {article.gallery.map((img, index) => (
                  <div
                    key={index}
                    className="relative h-64 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Share This Article
            </h3>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Share on Facebook
              </button>
              <button className="flex items-center px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Share on Twitter
              </button>
              <button className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.id}`}
                    className="group"
                  >
                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-4">
                        <span className="bg-lilac/10 text-darkLilac px-3 py-1 rounded-full text-sm">
                          {related.category}
                        </span>
                        <span className="ml-auto text-sm text-gray-600">
                          {related.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-3 group-hover:text-lilac transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center text-lilac font-medium">
                        Read Article
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Link
                href="/news"
                className="text-center px-8 py-3 border border-lilac text-lilac rounded-lg hover:bg-lilac/10 transition-colors"
              >
                View All News
              </Link>
              <Link
                href="/events"
                className="text-center px-8 py-3 bg-lilac text-white rounded-lg hover:bg-darkLilac transition-colors"
              >
                Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
