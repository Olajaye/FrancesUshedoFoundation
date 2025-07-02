import React from "react";
import { blogPosts } from "@/constant/constant";
import BlogCard from "@/components/Blogs/BlogCard";

const page = () => {
  return (
    <>
      <section className="bg-portfoilio bg-cover h-[35vh] py-12 bg-center relative overflow-hidden">
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
      </section>

      <section className="container px-4 mx-auto py-12">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col">
            {/* <Header /> */}
            <div className="flex flex-1 space-x-6 overflow-hidden">
              <MainContent />
               <Sidebar />
            </div>
          </div>
          <div className="">
            <h2 className="text-3xl font-bold text-darckLilac mb-8">
              Latest Blog
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
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
      category: "in Causes",
      author: "by Tom Phillips",
      comments: "3 comments",
      image: "/portfolio/tryout1.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris quis aliquam. Integer accumsan sodales odio, id tempus velit ullamc.",
    },
     {
      id: 1,
      date: "March 12, 2018",
      title: "Toys for Children Campaign",
      category: "in Causes",
      author: "by Tom Phillips",
      comments: "3 comments",
      image: "/portfolio/tryout1.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris quis aliquam. Integer accumsan sodales odio, id tempus velit ullamc.",
    },
    // Add more posts as needed
  ];

  return (
    <div className="flex-1  overflow-y-scroll h-screen">
      {posts.map((post) => (
        <div key={post.id} className="mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[500px] object-cover rounded-md"
          />
          <div className="mt-2 text-gray-600 text-sm">
            {post.date} | {post.category} | {post.author} | {post.comments}
          </div>
          <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
          <p className="mt-2 text-gray-700">{post.description}</p>
          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
            Read More
          </button>
        </div>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const popularPosts = [
    {
      id: 1,
      title: "A new cause to help",
      date: "March 12, 2018",
      image: "/portfolio/tryout1.png",
    },
    {
      id: 2,
      title: "We love to help people",
      date: "March 12, 2018",
      image: "/portfolio/tryout1.png",
    },
    {
      id: 3,
      title: "The new ideas for helping",
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
      title: "The childrens",
      date: "Aug 25, 2018",
      location: "Ballroom New York",
      image: "/portfolio/tryout1.png",
    },
  ];

  return (
    <div className="w-[40%]">
      <h3 className="text-lg font-semibold mb-4">Popular Posts</h3>
      {popularPosts.map((post) => (
        <div key={post.id} className="mb-4 flex items-center">
          <img
            src={post.image}
            alt={post.title}
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          <div>
            <p className="text-sm font-medium">{post.title}</p>
            <p className="text-xs text-gray-500">{post.date}</p>
          </div>
        </div>
      ))}
      <h3 className="text-lg font-semibold mt-6 mb-4">Donate</h3>
      <button className="w-36 bg-darckLilac text-white px-4 py-2 rounded-full hover:bg-lilac mb-4">
        Donate
      </button>
      <h3 className="text-lg font-semibold mt-6 mb-4">Upcoming Events</h3>
      {upcomingEvents.map((event) => (
        <div key={event.id} className="mb-4 flex items-center">
          <img
            src={event.image}
            alt={event.title}
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          <div>
            <p className="text-sm font-medium">{event.title}</p>
            <p className="text-xs text-gray-500">
              {event.date} | {event.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
