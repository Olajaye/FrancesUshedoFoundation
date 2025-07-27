"use client";
import { PagesHero } from "@/components/hearderCom/hearder";
import { useState } from "react";
import React from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // Replace with your actual form submission logic (e.g., API call)
      // This is a placeholder for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus(`Error sending message. Please try again. ${error}`);
    }
  };
  return (
    <>
      {/* <section className="bg-portfoilio bg-cover h-[45vh] py-12 bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80"></div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4"
          style={{ zIndex: 999 }}
        >
          <div className="container mx-auto px-6 ">
            <div>
              <h2 className="text-6xl font-serif text-start">Contact Us</h2>
              <div className="w-[120px] h-2 bg-darckLilac"></div>
            </div>
          </div>
        </div>
      </section> */}

      <PagesHero img={"/portfolio/picture1.jpg"} title={"Contact Us"} />

      <section className="container px-4 mx-auto py-12">
        <div className="flex items-center justify-between">
          <div className="w-[50%]">
            <h2 className="text-3xl font-bold text-center text-darckLilac mb-8">
              Get in Touch
            </h2>
            <p className="text-center text-gray-600 mb-6">
              We would love to hear from you! Please fill out the form below and
              we will get back to you as soon as possible.
            </p>
          </div>
          <div className="w-[50%]">
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-lilac focus:border-lilac focus:z-10 sm:text-sm"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lilac focus:border-lilac focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-liborder-lilac focus:border-lilac focus:z-10 sm:text-sm"
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-lilac hover:bg-darckLilac focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lilac"
                >
                  Send Message
                </button>
              </div>

              {status && (
                <p
                  className={`text-center text-sm ${
                    status.includes("success")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
