import { SponsorProps } from "@/components/Sponsor/Sponsor";

export const sponsors: SponsorProps[] = [
  {
    name: "TechCorp",
    logoUrl: "/sponsor/meettoaspire.webp",
    logoAlt: "TechCorp Logo",
    tier: "platinum",
    url: "https://techcorp.example.com",
  },
  {
    name: "DesignHub",
    logoUrl: "/sponsor/HWD.webp",
    logoAlt: "DesignHub Logo",
    tier: "gold",
    url: "",
  },
  {
    name: "WebServices",
    logoUrl: "/sponsor/logo5.png",
    logoAlt: "WebServices Logo",
    tier: "silver",
    url: "",
  },
  {
    name: "TechCorp",
    logoUrl: "/sponsor/meettoaspire.webp",
    logoAlt: "TechCorp Logo",
    tier: "platinum",
    url: "https://techcorp.example.com",
  },
  {
    name: "DesignHub",
    logoUrl: "/sponsor/HWD.webp",
    logoAlt: "DesignHub Logo",
    tier: "gold",
    url: "",
  },
  {
    name: "WebServices",
    logoUrl: "/sponsor/logo5.png",
    logoAlt: "WebServices Logo",
    tier: "silver",
    url: "",
  },
];

export const blogPosts = [
  {
    title: "5 Ways to Make a Difference in Your Community Today",
    excerpt:
      "Discover simple yet impactful actions you can take to support those in need and create positive change.",
    imageUrl: "/junks/Untitled-3.jpg",
    imageAlt: "Volunteers serving food at community kitchen",
    author: {
      name: "Sarah Johnson",
      avatar: "/junks/IMG_2792.JPG",
    },
    date: "March 20, 2024",
    readTime: "5 min read",
    tags: ["Community", "Volunteering", "Social Impact"],
    slug: "making-a-difference-in-community",
  },
  {
    title: "The Ripple Effect: How Small Donations Create Big Change",
    excerpt:
      "Learn how even modest contributions can transform lives through our transparent funding model.",
    imageUrl: "/junks/IMG_2792.JPG",
    imageAlt: "Children smiling while receiving school supplies",
    author: {
      name: "Michael Chen",
      avatar: "/junks/Untitled-5.jpg",
    },
    date: "April 5, 2024",
    readTime: "8 min read",
    tags: ["Donations", "Transparency", "Education"],
    slug: "small-donations-big-impact",
  },
  {
    title: "Volunteer Spotlight: Transforming Lives Through Service",
    excerpt:
      "Meet our dedicated volunteers and hear their inspiring stories of compassion in action.",
    imageUrl: "/junks/Untitled-4.jpg",
    imageAlt: "Group of volunteers planting trees",
    author: {
      name: "Emma Rodriguez",
      avatar: "/junks/Untitled-5.jpg",
    },
    date: "February 15, 2024",
    readTime: "6 min read",
    tags: ["Volunteering", "Community", "Environment"],
    slug: "volunteer-spotlight-stories",
  },
];

export const Sponsors = [
  {
    name: "TechCorp",
    logo: "/sponsor/meettoaspire.webp",
  },
  {
    name: "DesignHub",
    logo: "/sponsor/HWD.webp",
  },
  {
    name: "WebServices",
    logo: "/sponsor/logo5.png",
  },
  {
    name: "TechCorp",
    logo: "/sponsor/meettoaspire.webp",
  },
  {
    name: "DesignHub",
    logo: "/sponsor/HWD.webp",
  },
  {
    name: "WebServices",
    logo: "/sponsor/logo5.png",
  },
];

export const eventData = [
  {
    id: "1",
    date: "November 6, 2025",
    time: "6:00 PM - 9:00 PM",
    title: "Preventing Diabetes",
    category: "Fundraising",
    location: "Virtual Event",
    featured: true,
    image: "/events/event1.jpeg",
    description:
      "Join us for our premier fundraising event of the year featuring live music, silent auction, and keynote speakers. Black tie optional.",
    longDescription: `Join us for an unforgettable evening dedicated to raising awareness and funds for diabetes prevention. Our annual Preventing Diabetes Gala brings together healthcare professionals, community leaders, and advocates in a night of inspiration and action.

      This virtual event will feature:
      • Keynote speech by Dr. Sarah Johnson, renowned endocrinologist
      • Live panel discussion with diabetes survivors
      • Silent auction with exclusive items
      • Interactive workshops on healthy living
      • Virtual networking opportunities

      All proceeds will support our community outreach programs providing free diabetes screening and education to underserved populations.`,
    registrationLink: "/donate",
    speakers: [
      {
        name: "Dr. Sarah Johnson",
        title: "Chief Endocrinologist",
        image: "/team/doctor1.jpg",
      },
      {
        name: "Michael Chen",
        title: "Diabetes Survivor & Advocate",
        image: "/team/advocate1.jpg",
      },
      {
        name: "Lisa Rodriguez",
        title: "Nutrition Specialist",
        image: "/team/nutritionist1.jpg",
      },
    ],
    agenda: [
      { time: "6:00 PM", activity: "Welcome & Opening Remarks" },
      {
        time: "6:30 PM",
        activity: "Keynote: Modern Approaches to Diabetes Prevention",
      },
      { time: "7:15 PM", activity: "Panel Discussion: Living with Diabetes" },
      { time: "8:00 PM", activity: "Silent Auction & Virtual Networking" },
      { time: "8:45 PM", activity: "Closing Remarks & Future Initiatives" },
    ],
    goals: [
      "Raise $50,000 for community screening programs",
      "Educate 500+ attendees about diabetes prevention",
      "Connect 100+ individuals with local health resources",
    ],
  },
  {
    id: "2",
    date: "September 20, 2025",
    time: "11:00 AM - 12:00 PM",
    title: "Overcoming Self Stigmatization among Sickle-cell Survivors",
    category: "Volunteering",
    location: "Main Street Community Center",
    featured: false,
    image: "/events/event2.jpeg",
    description:
      "Help us collect and distribute food to families in need. Volunteer shifts available throughout the day.",
    longDescription: `Join us for a transformative workshop focused on empowering sickle-cell survivors to overcome self-stigma and build resilience. This in-person event at the Main Street Community Center brings together survivors, caregivers, and mental health professionals.

      What to expect:
      • Interactive workshops on self-acceptance and empowerment
      • Group discussions led by licensed therapists
      • Art therapy sessions for emotional expression
      • Resource fair with local support services
      • Networking with fellow survivors

      This event is designed to create a safe, supportive space for individuals to share experiences and learn coping strategies. Light refreshments will be provided.`,
    registrationLink: "/donate",
    speakers: [
      {
        name: "Dr. James Wilson",
        title: "Clinical Psychologist",
        image: "/team/psychologist1.jpg",
      },
      {
        name: "Maria Gonzalez",
        title: "Sickle-cell Survivor Advocate",
        image: "/team/advocate2.jpg",
      },
      {
        name: "Robert Thompson",
        title: "Art Therapist",
        image: "/team/therapist1.jpg",
      },
    ],
    agenda: [
      { time: "11:00 AM", activity: "Welcome & Icebreaker Activities" },
      { time: "11:20 AM", activity: "Workshop: Breaking the Stigma Cycle" },
      { time: "11:45 AM", activity: "Group Therapy Session" },
      { time: "12:15 PM", activity: "Art Therapy Workshop" },
      { time: "12:45 PM", activity: "Resource Fair & Networking" },
    ],
    goals: [
      "Provide support to 50+ sickle-cell survivors",
      "Connect attendees with mental health resources",
      "Create a sustainable peer support network",
    ],
  },
];
