"use client";
import Footer from "@/components/Footer/Footer";
import { PagesHero } from "@/components/hearderCom/hearder";
import { Navbar } from "@/components/Navbar/Navbar";
import { useState } from "react";
import React from "react";
import { useSubmitContactMutation } from "@/store/api/publicContactApi";
import {
  User,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Clock,
  Heart,
} from "lucide-react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [submitContact] = useSubmitContactMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContact(formData).unwrap();
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactDetails = [
    {
      icon: Phone,
      label: "Phone",
      value: "(123) 456-78908888",
      href: "tel:+112345678908888",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@charityorg.org",
      href: "mailto:info@charityorg.org",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Charity Lane, City, State 123458898",
      href: "#",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Mon – Fri, 9:00 AM – 5:00 PM",
      href: "#",
    },
  ];

  return (
    <>
      <Navbar />
      <PagesHero img="/portfolio/picture1.jpg" title="Contact Us" />

      <section className="py-10 bg-gradient-to-b from-white to-lilac/5">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Section header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-darckLilac text-sm font-semibold tracking-widest uppercase mb-3">
              <Heart className="w-4 h-4" /> Reach Out
            </span>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-800">
              We&apos;d Love to Hear From You
            </h2>
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-lilac to-darckLilac mx-auto mt-4" />
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* ── Left: contact info ── */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-br from-darckLilac to-lilac rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-2">Contact Information</h3>
                <p className="text-white/75 text-sm mb-8 leading-relaxed">
                  Fill out the form and our team will get back to you as soon as
                  possible. We look forward to connecting with you!
                </p>

                <div className="space-y-6">
                  {contactDetails.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition-colors">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-xs font-medium uppercase tracking-wide">
                          {label}
                        </p>
                        <p className="text-white text-sm font-medium mt-0.5">
                          {value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* decorative circles */}
                <div className="mt-12 flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10" />
                  <div className="w-6 h-6 rounded-full bg-white/10 self-end" />
                  <div className="w-4 h-4 rounded-full bg-white/10 self-center" />
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl shadow-lilac/10 p-8 border border-lilac/10">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Send a Message
                </h3>
                <p className="text-gray-500 text-sm mb-8">
                  All fields marked with <span className="text-red-400">*</span>{" "}
                  are required.
                </p>

                {/* Success / Error banners */}
                {status === "success" && (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-6 text-sm">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Your message was sent! We&apos;ll get back to you within
                      24 hours.
                    </span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-lilac transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-lilac transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-lilac transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-darckLilac to-lilac text-white text-sm font-semibold rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darckLilac transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Page;
