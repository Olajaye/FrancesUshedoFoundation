"use client";

import {
  Calendar,
  Globe,
  Home,
  LogOut,
  Mail,
  PictureInPicture,
  Loader2,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLogoutMutation } from "@/store/api/authApi";
import { clearCredentials } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [logout] = useLogoutMutation();

  // Guard: redirect to login if not authenticated.
  // PersistGate ensures the store is rehydrated before this component mounts,
  // so isAuthenticated is already the persisted value on first render.
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-lilac/10">
        <Loader2 className="w-8 h-8 animate-spin text-lilac" />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout().unwrap().catch(() => {});
    dispatch(clearCredentials());
    router.push("/admin");
  };

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      link: "/admin/dashboard",
    },
    // { icon: Users, label: "Donors", link: "/admin/dashboard/donors" },
    // {
    //   icon: DollarSign,
    //   label: "Donations",
    //   link: "/admin/dashboard/donations",
    // },
    { icon: Globe, label: "News", link: "/admin/dashboard/news" },
    {
      icon: Calendar,
      label: "Events",
      link: "/admin/dashboard/events",
    },
    {
      icon: PictureInPicture,
      label: "Events Gallery",
      link: "/admin/dashboard/events-gallery",
    },
    {
      icon: Mail,
      label: "Messages",
      link: "/admin/dashboard/messages",
    },
  ];

  return (
    <section
      className={`min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-lilac/10"`}
    >
      <nav className="bg-white/80 backdrop-blur-xl border-b border-lilac/20 sticky top-0 z-50 py-2">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and mobile menu */}
            <Link href="/" className="flex items-center ">
              <Image
                src="/logo/logoImg.png"
                alt="Foundation Logo"
                width={180}
                height={60}
                className="w-auto h-10 md:h-16"
                priority
              />
              <Image
                src="/logo/title.png"
                alt="Foundation Logo"
                width={180}
                height={60}
                className="w-auto h-10 md:h-13 hidden md:block"
                priority
              />
            </Link>

            {/* Right side - Icons and Profile */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-px bg-lilac/30 mx-2 hidden sm:block"></div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-r from-lilac to-darckLilac rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : "AD"}
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name ?? "Admin"}
                  </p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="hidden lg:block w-64 h-[85vh] sticky top-20 bg-white/50 backdrop-blur-xl border-r border-lilac/20 min-h-[calc(100vh-64px)] p-4">
          <nav className="space-y-1">
            {navItems.map((item, index) => {
              const isActive =
                pathname === item.link ||
                (item.link !== "/admin/dashboard" &&
                  pathname?.startsWith(item.link + "/"));

              return (
                <Link
                  key={index}
                  href={item.link}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    isActive
                      ? "bg-gradient-to-r from-lilac to-darckLilac text-white shadow-lg"
                      : "hover:bg-lilac/10 text-gray-700"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-darckLilac"
                    }`}
                  />
                  <span className="flex-1 text-sm font-poppins">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="absolute bottom-4 w-56">
            <div className="border-t border-lilac/20 pt-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-gray-700 transition-all w-full"
              >
                <LogOut className="w-5 h-5 text-gray-500" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </section>
  );
}
