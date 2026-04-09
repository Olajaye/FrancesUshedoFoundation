"use client";
// import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Heart,
  Globe,
  DollarSign,
  Clock,
  ChevronRight,
  MoreVertical,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-montserrat">
          Welcome back, Admin! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Here&apos;s what&apos;s happening with your foundation today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          {
            icon: DollarSign,
            label: "Total Donations",
            value: "$124,567",
            change: "+12.5%",
            bg: "from-lilac/20 to-transparent",
            iconBg: "bg-lilac",
          },
          {
            icon: Users,
            label: "Active Donors",
            value: "2,345",
            change: "+8.2%",
            bg: "from-darckLilac/20 to-transparent",
            iconBg: "bg-darckLilac",
          },
          {
            icon: Heart,
            label: "Campaigns",
            value: "18",
            change: "+3",
            bg: "from-lilac/20 to-transparent",
            iconBg: "bg-lilac",
          },
          {
            icon: Globe,
            label: "Impact Reach",
            value: "15K+",
            change: "+2.3K",
            bg: "from-darckLilac/20 to-transparent",
            iconBg: "bg-darckLilac",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-lilac/20 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 ${stat.iconBg} bg-opacity-20 rounded-xl`}>
                <stat.icon
                  className={`w-6 h-6 ${index % 2 === 0 ? "text-lilac" : "text-darckLilac"}`}
                />
              </div>
              <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Donation Chart */}
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-lilac/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Donation Overview
            </h2>
            <select className="text-sm border border-lilac/30 rounded-lg px-3 py-1.5 bg-white/50">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>

          {/* Simple chart bars */}
          <div className="flex items-end justify-between h-40 gap-2">
            {[65, 45, 75, 55, 85, 70, 60].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-lilac to-darckLilac rounded-t-lg hover:from-darckLilac hover:to-lilac transition-all"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-600">M{7 - i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Donors */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-lilac/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Donors
            </h2>
            <Link
              href="#"
              className="text-sm text-darckLilac hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "John Smith",
                amount: "$500",
                time: "5 min ago",
                avatar: "JS",
              },
              {
                name: "Emma Wilson",
                amount: "$1,200",
                time: "15 min ago",
                avatar: "EW",
              },
              {
                name: "Michael Brown",
                amount: "$350",
                time: "1 hour ago",
                avatar: "MB",
              },
              {
                name: "Sarah Lee",
                amount: "$2,500",
                time: "2 hours ago",
                avatar: "SL",
              },
            ].map((donor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-lilac/5 rounded-xl transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-lilac to-darckLilac rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                    {donor.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{donor.name}</p>
                    <p className="text-xs text-gray-500">{donor.time}</p>
                  </div>
                </div>
                <span className="font-semibold text-darckLilac">
                  {donor.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaigns and Events */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Active Campaigns */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-lilac/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Active Campaigns
            </h2>
            <button className="text-sm bg-gradient-to-r from-lilac to-darckLilac text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all flex items-center gap-1">
              <Plus className="w-4 h-4" /> New
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "Education for All",
                progress: 75,
                goal: "$50,000",
                raised: "$37,500",
                days: 15,
              },
              {
                name: "Clean Water Initiative",
                progress: 45,
                goal: "$30,000",
                raised: "$13,500",
                days: 22,
              },
              {
                name: "Healthcare Access",
                progress: 90,
                goal: "$100,000",
                raised: "$90,000",
                days: 5,
              },
            ].map((campaign, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-800">{campaign.name}</p>
                  <span className="text-xs text-gray-500">
                    {campaign.days} days left
                  </span>
                </div>
                <div className="w-full h-2 bg-lilac/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-lilac to-darckLilac rounded-full"
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-darckLilac font-medium">
                    {campaign.raised}
                  </span>
                  <span className="text-gray-600">of {campaign.goal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-lilac/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Upcoming Events
            </h2>
            <Link
              href="#"
              className="text-sm text-darckLilac hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Annual Charity Gala",
                date: "Mar 15, 2024",
                time: "7:00 PM",
                attendees: 156,
              },
              {
                title: "Community Outreach",
                date: "Mar 18, 2024",
                time: "10:00 AM",
                attendees: 45,
              },
              {
                title: "Fundraising Workshop",
                date: "Mar 22, 2024",
                time: "2:00 PM",
                attendees: 89,
              },
              {
                title: "Donor Appreciation Day",
                date: "Mar 25, 2024",
                time: "11:00 AM",
                attendees: 234,
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 hover:bg-lilac/5 rounded-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-lilac to-darckLilac rounded-xl flex flex-col items-center justify-center text-white">
                  <span className="text-xs">{event.date.split(" ")[0]}</span>
                  <span className="text-sm font-bold">
                    {event.date.split(" ")[1]}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{event.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {event.attendees}
                    </span>
                  </div>
                </div>
                <button className="p-1.5 hover:bg-lilac/20 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Stories Preview */}
      <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-lilac/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Latest Impact Stories
          </h2>
          <Link
            href="#"
            className="text-sm text-darckLilac hover:underline flex items-center gap-1"
          >
            View all stories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white/50 rounded-xl overflow-hidden border border-lilac/20 hover:shadow-md transition-all"
            >
              <div className="h-32 bg-gradient-to-r from-lilac to-darckLilac/50 relative">
                <div className="absolute inset-0 bg-dark-overlay flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white/50" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">
                  Changing Lives Through Education
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
                <Link
                  href="#"
                  className="mt-3 text-sm text-darckLilac hover:underline inline-flex items-center gap-1"
                >
                  Read more <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
