import React from "react";
import { blogPosts } from "@/constant/constant";
import BlogCard from "@/components/Blogs/BlogCard";
import { PagesHero } from "@/components/hearderCom/hearder";

const page = () => {
  return (
    <>
      <PagesHero img={"/portfolio/picture1.jpg"} title={" News"} />

      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col space-y-12 md:space-y-16">
          <div className="flex flex-col lg:flex-row justify-start space-y-8 lg:space-y-0 lg:space-x-8">
            <main className="flex-1">
              <EventCalendar />
            </main>
            {/* <aside className="w-full lg:w-80 xl:w-96 bg-lilac/5 p-6 rounded-lg border border-lilac/20">
              <EventSidebar />
            </aside> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

const EventCalendar = () => {
  const upcomingEvents = [
    {
      id: 1,
      date: "May 15, 2024",
      time: "6:00 PM - 9:00 PM",
      title: "Annual Charity Gala & Auction",
      category: "Fundraising",
      location: "Grand Ballroom, City Center",
      featured: true,
      image: "/portfolio/events/gala.jpg",
      description:
        "Join us for our premier fundraising event of the year featuring live music, silent auction, and keynote speakers. Black tie optional.",
      ticketsAvailable: 120,
      registrationLink: "/events/gala-registration",
    },
    {
      id: 2,
      date: "June 8, 2024",
      time: "8:00 AM - 12:00 PM",
      title: "Community Food Drive",
      category: "Volunteering",
      location: "Main Street Community Center",
      featured: false,
      image: "/portfolio/events/food-drive.jpg",
      description:
        "Help us collect and distribute food to families in need. Volunteer shifts available throughout the day.",
      ticketsAvailable: 50,
      registrationLink: "/events/food-drive-volunteer",
    },
    {
      id: 3,
      date: "July 22-24, 2024",
      time: "Daily 9:00 AM - 4:00 PM",
      title: "Youth Leadership Camp",
      category: "Education",
      location: "Riverside Retreat Center",
      featured: true,
      image: "/portfolio/events/youth-camp.jpg",
      description:
        "Three-day leadership development program for underprivileged youth. Scholarships available for qualified participants.",
      ticketsAvailable: 30,
      registrationLink: "/events/youth-camp-application",
    },
    {
      id: 4,
      date: "August 30, 2024",
      time: "10:00 AM - 2:00 PM",
      title: "Health & Wellness Fair",
      category: "Community",
      location: "Central Park Pavilion",
      featured: false,
      image: "/portfolio/events/health-fair.jpg",
      description:
        "Free health screenings, wellness workshops, and fitness activities for the entire family.",
      ticketsAvailable: 200,
      registrationLink: "/events/health-fair-register",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-darkLilac mb-4">
          Upcoming Foundation Events
        </h1>
        <p className="text-gray-600">
          Join us in our mission to make a difference in the community. Register
          for upcoming events below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden border ${
              event.featured ? "border-lilac border-2" : "border-gray-100"
            }`}
          >
            <div className="md:flex">
              <div className="md:w-1/3 relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 md:h-full object-cover"
                />
                {event.featured && (
                  <div className="absolute top-4 left-4 bg-lilac text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured Event
                  </div>
                )}
              </div>

              <div className="md:w-2/3 p-6">
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3 gap-3">
                  <span className="bg-lilac/10 text-darkLilac px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">📅 {event.date}</span>
                  <span>•</span>
                  <span className="flex items-center">⏰ {event.time}</span>
                  <span>•</span>
                  <span className="flex items-center">📍 {event.location}</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {event.title}
                </h2>

                <p className="text-gray-600 mb-6">{event.description}</p>

                <div className="flex flex-wrap items-center justify-end">
                  <div className="flex gap-3">
                    <a
                      href={event.registrationLink}
                      className="px-6 py-3 bg-lilac text-white font-medium rounded-lg hover:bg-darkLilac transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2"
                    >
                      Donate
                    </a>
                    <a
                      href={`/events/${event.id}`}
                      className="px-6 py-3 border border-lilac text-darkLilac font-medium rounded-lg hover:bg-lilac/10 transition-colors duration-300"
                    >
                      Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EventSidebar = () => {
  const quickLinks = [
    { id: 1, label: "Event Calendar", href: "/events/calendar", icon: "📅" },
    { id: 2, label: "Volunteer Opportunities", href: "/volunteer", icon: "🤝" },
    { id: 3, label: "Become a Sponsor", href: "/sponsorship", icon: "💼" },
    { id: 4, label: "Past Events Gallery", href: "/gallery", icon: "📸" },
  ];

  const importantDates = [
    { id: 1, date: "May 1, 2024", event: "Early Bird Registration Ends" },
    { id: 2, date: "May 10, 2024", event: "Volunteer Orientation" },
    { id: 3, date: "June 1, 2024", event: "Scholarship Application Deadline" },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-bold text-darkLilac mb-4 flex items-center">
          📋 Quick Links
        </h3>
        <div className="space-y-2">
          {quickLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="flex items-center p-3 rounded-lg hover:bg-lilac/10 transition-colors duration-200 text-gray-700 hover:text-darkLilac"
            >
              <span className="text-lg mr-3">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-darkLilac mb-4 flex items-center">
          ⏰ Important Dates
        </h3>
        <div className="bg-white rounded-lg p-4 border border-lilac/20">
          <ul className="space-y-3">
            {importantDates.map((date) => (
              <li key={date.id} className="flex items-start">
                <div className="bg-lilac/10 text-darkLilac text-sm font-semibold px-3 py-1 rounded-md mr-3">
                  {date.date}
                </div>
                <span className="text-gray-700 text-sm">{date.event}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-darkLilac mb-4 flex items-center">
          📞 Need Help?
        </h3>
        <div className="bg-white p-5 rounded-lg border border-lilac/20">
          <p className="text-gray-600 mb-3">
            Questions about an event or registration?
          </p>
          <a
            href="mailto:events@foundation.org"
            className="inline-block w-full text-center py-3 bg-darkLilac text-white font-medium rounded-lg hover:bg-lilac transition-colors duration-300"
          >
            Contact Event Coordinator
          </a>
          <p className="text-sm text-gray-500 mt-3 text-center">
            Or call: (555) 123-4567
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-darkLilac mb-4 flex items-center">
          📢 Subscribe
        </h3>
        <div className="bg-white p-5 rounded-lg border border-lilac/20">
          <p className="text-gray-600 mb-3">
            Get notified about new events and opportunities
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac focus:border-transparent"
            />
            <button className="w-full py-3 bg-lilac text-white font-medium rounded-lg hover:bg-darkLilac transition-colors duration-300">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// const page = () => {
//   return (
//     <>
//       <PagesHero img={"/portfolio/picture1.jpg"} title={" News"} />

//       <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
//         <div className="flex flex-col space-y-12 md:space-y-16">
//           <div className="flex flex-col lg:flex-row justify-start space-y-8 lg:space-y-0 lg:space-x-8">
//             <main className="flex-1">
//               <MainContent />
//             </main>
//             <aside className="w-full lg:w-80 xl:w-96 bg-gray-50 p-6 rounded-lg shadow-md">
//               <Sidebar />
//             </aside>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default page;

// const MainContent = () => {
//   const posts = [
//     {
//       id: 1,
//       date: "March 12, 2018",
//       title: "Toys for Children Campaign",
//       category: "Causes",
//       author: "Tom Phillips",
//       comments: 3,
//       image: "/portfolio/tryout1.png",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris quis aliquam. Integer accumsan sodales odio, id tempus velit ullamc.",
//     },
//     {
//       id: 2,
//       date: "April 5, 2019",
//       title: "Education for All Initiative",
//       category: "Education",
//       author: "Jane Doe",
//       comments: 5,
//       image: "/portfolio/tryout2.png",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris quis aliquam. Integer accumsan sodales odio, id tempus velit ullamc.",
//     },
//     // Add more posts as needed
//   ];

//   return (
//     <div className="flex-1 space-y-12">
//       {posts.map((post) => (
//         <article
//           key={post.id}
//           className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
//         >
//           <img
//             src={post.image}
//             alt={post.title}
//             className="w-full h-64 object-cover"
//           />
//           <div className="p-6">
//             <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
//               <span>{post.date}</span>
//               <span>•</span>
//               <span>{post.category}</span>
//               <span>•</span>
//               <span>By {post.author}</span>
//             </div>
//             <h2 className="text-2xl font-bold text-darkLilac mb-3">
//               {post.title}
//             </h2>
//             <p className="text-gray-700 mb-6 line-clamp-3">
//               {post.description}
//             </p>
//             <a
//               href={`/blog/${post.id}`}
//               className="inline-block px-6 py-3 bg-lilac text-white font-medium rounded-md hover:bg-darkLilac transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2"
//             >
//               Read More
//             </a>
//           </div>
//         </article>
//       ))}
//     </div>
//   );
// };

// const Sidebar = () => {
//   const popularPosts = [
//     {
//       id: 1,
//       title: "A New Cause to Help",
//       date: "March 12, 2018",
//       image: "/portfolio/tryout1.png",
//     },
//     {
//       id: 2,
//       title: "We Love to Help People",
//       date: "March 12, 2018",
//       image: "/portfolio/tryout1.png",
//     },
//     {
//       id: 3,
//       title: "The New Ideas for Helping",
//       date: "March 09, 2018",
//       image: "/portfolio/tryout1.png",
//     },
//   ];

//   const upcomingEvents = [
//     {
//       id: 1,
//       title: "Fundraiser for Kids",
//       date: "Aug 25, 2018",
//       location: "Ballroom New York",
//       image: "/portfolio/tryout1.png",
//     },
//     {
//       id: 2,
//       title: "Support for Children",
//       date: "Aug 25, 2018",
//       location: "Ballroom New York",
//       image: "/portfolio/tryout1.png",
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       <section>
//         <h3 className="text-xl font-bold text-darkLilac mb-4">Popular Posts</h3>
//         <div className="space-y-4">
//           {popularPosts.map((post) => (
//             <a
//               key={post.id}
//               href={`/blog/${post.id}`}
//               className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//             >
//               <img
//                 src={post.image}
//                 alt={post.title}
//                 className="w-16 h-16 object-cover rounded-md mr-4"
//               />
//               <div>
//                 <p className="text-sm font-medium text-gray-800 line-clamp-2">
//                   {post.title}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">{post.date}</p>
//               </div>
//             </a>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h3 className="text-xl font-bold text-darkLilac mb-4">
//           Make a Donation
//         </h3>
//         <a
//           href="/donate"
//           className="block w-full text-center py-3 bg-lilac text-white font-medium rounded-md hover:bg-darkLilac transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2"
//         >
//           Donate Now
//         </a>
//       </section>

//       <section>
//         <h3 className="text-xl font-bold text-darkLilac mb-4">
//           Upcoming Events
//         </h3>
//         <div className="space-y-4">
//           {upcomingEvents.map((event) => (
//             <a
//               key={event.id}
//               href={`/events/${event.id}`}
//               className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//             >
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="w-16 h-16 object-cover rounded-md mr-4"
//               />
//               <div>
//                 <p className="text-sm font-medium text-gray-800 line-clamp-2">
//                   {event.title}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {event.date} | {event.location}
//                 </p>
//               </div>
//             </a>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

{
  /* <div>
            <h2 className="text-3xl md:text-4xl font-bold text-darkLilac mb-8 md:mb-12 text-center lg:text-left">
              Latest Blog Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href="/blog"
                className="inline-block px-6 py-3 bg-lilac text-white font-medium rounded-md hover:bg-darkLilac transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2"
              >
                View All Posts
              </a>
            </div>
          </div> */
}
