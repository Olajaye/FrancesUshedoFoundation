import React from "react";
import { blogPosts } from "@/constant/constant";
import BlogCard from "@/components/Blogs/BlogCard";
import { PagesHero } from "@/components/hearderCom/hearder";

const page = () => {
  return (
    <>
      {/* <section className="bg-portfoilio bg-cover h-[35vh] py-12 bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80"></div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4"
          style={{ zIndex: 999 }}
        >
          <div className="container mx-auto px-6 ">
            <div>
              <h2 className="text-6xl font-montserrat font-semibold text-start">
                News
              </h2>
              <div className="w-[100px] h-2 bg-darckLilac"></div>
            </div>
          </div>
        </div>
      </section> */}

      <PagesHero img={"/portfolio/picture1.jpg"} title={" News"} />

      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col space-y-12 md:space-y-16">
          {/* Header component can be uncommented and customized as needed */}
          {/* <Header /> */}

          <div className="flex flex-col lg:flex-row justify-start space-y-8 lg:space-y-0 lg:space-x-8">
            <main className="flex-1">
              <MainContent />
            </main>
            <aside className="w-full lg:w-80 xl:w-96 bg-gray-50 p-6 rounded-lg shadow-md">
              <Sidebar />
            </aside>
          </div>

          <div>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

// const Header = () => {
//   return (
//     <div className="bg-white p-4 shadow-md flex justify-end items-center">
//       <div className="flex items-center w-1/3">
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//         />
//         <button className="bg-orange-500 text-white p-2 rounded-r-md hover:bg-orange-600">
//           GO
//         </button>
//       </div>
//     </div>
//   );
// };

const MainContent = () => {
  const posts = [
    {
      id: 1,
      date: "March 12, 2018",
      title: "Toys for Children Campaign",
      category: "Causes",
      author: "Tom Phillips",
      comments: 3,
      image: "/portfolio/tryout1.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris quis aliquam. Integer accumsan sodales odio, id tempus velit ullamc.",
    },
    {
      id: 2,
      date: "April 5, 2019",
      title: "Education for All Initiative",
      category: "Education",
      author: "Jane Doe",
      comments: 5,
      image: "/portfolio/tryout2.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris quis aliquam. Integer accumsan sodales odio, id tempus velit ullamc.",
    },
    // Add more posts as needed
  ];

  return (
    <div className="flex-1 space-y-12">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.category}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
            <h2 className="text-2xl font-bold text-darkLilac mb-3">
              {post.title}
            </h2>
            <p className="text-gray-700 mb-6 line-clamp-3">
              {post.description}
            </p>
            <a
              href={`/blog/${post.id}`}
              className="inline-block px-6 py-3 bg-lilac text-white font-medium rounded-md hover:bg-darkLilac transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2"
            >
              Read More
            </a>
          </div>
        </article>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const popularPosts = [
    {
      id: 1,
      title: "A New Cause to Help",
      date: "March 12, 2018",
      image: "/portfolio/tryout1.png",
    },
    {
      id: 2,
      title: "We Love to Help People",
      date: "March 12, 2018",
      image: "/portfolio/tryout1.png",
    },
    {
      id: 3,
      title: "The New Ideas for Helping",
      date: "March 09, 2018",
      image: "/portfolio/tryout1.png",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Fundraiser for Kids",
      date: "Aug 25, 2018",
      location: "Ballroom New York",
      image: "/portfolio/tryout1.png",
    },
    {
      id: 2,
      title: "Support for Children",
      date: "Aug 25, 2018",
      location: "Ballroom New York",
      image: "/portfolio/tryout1.png",
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-bold text-darkLilac mb-4">Popular Posts</h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                  {post.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{post.date}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-darkLilac mb-4">
          Make a Donation
        </h3>
        <a
          href="/donate"
          className="block w-full text-center py-3 bg-lilac text-white font-medium rounded-md hover:bg-darkLilac transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2"
        >
          Donate Now
        </a>
      </section>

      <section>
        <h3 className="text-xl font-bold text-darkLilac mb-4">
          Upcoming Events
        </h3>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <a
              key={event.id}
              href={`/events/${event.id}`}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                  {event.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {event.date} | {event.location}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
