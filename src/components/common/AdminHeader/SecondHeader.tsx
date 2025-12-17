"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { menuData } from "./adminMenu";

export default function SecondHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState<number | null>(null);

  const { data: session } = useSession();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  return (
    <header className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto py-4 flex justify-between items-center px-10">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black">
          a
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-black font-medium relative">
  {menuData.map((item) => (
    <div key={item.id} className="group relative">

      {/* Main Link */}
      <Link
        href={item.path}
        target={item.newTab ? "_blank" : "_self"}
        className="hover:text-blue-600"
      >
        {item.title} {item.submenu ? " ▾" : ""}
      </Link>

      {item.submenu && (
        <>
          {/* FIX: Invisible hover buffer to fill mt-5 gap */}
          <div className="absolute left-0 top-full w-full h-5"></div>

          {/* Dropdown */}
          <div
            className="
              absolute left-0 top-full mt-5
              w-48 bg-white shadow-lg rounded-lg
              hidden group-hover:flex flex-col
            "
          >
            {item.submenu.map((sub) => (
              <Link
                key={sub.id}
                href={sub.path}
                target={sub.newTab ? "_blank" : "_self"}
                className="px-4 py-2 hover:bg-gray-100"
              >
                {sub.title}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  ))}
</nav>


        {/* User Section */}
        <div className="flex items-center gap-4">
          {!session ? (
            <button
              onClick={() => signIn("google")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center focus:outline-none"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="rounded-full border"
                  />
                ) : (
                  <User className="w-8 h-8 text-black" />
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg border rounded-lg overflow-hidden">
                  <div className="px-4 py-2 text-gray-800 text-sm">
                    {session.user?.name}
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/my-bookings"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Your Bookings
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-black focus:outline-none"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col items-center py-3 space-y-2">
            {menuData.map((item) => (
              <div key={item.id} className="w-full text-center">
                {/* Toggle if submenu exists */}
                {item.submenu ? (
                  <>
                    <button
                      onClick={() =>
                        setRoomsOpen(roomsOpen === item.id ? null : item.id)
                      }
                      className="text-black hover:text-blue-600 w-full"
                    >
                      {item.title} ▾
                    </button>

                    {roomsOpen === item.id && (
                      <div className="flex flex-col items-center space-y-2">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.id}
                            href={sub.path}
                            onClick={toggleMenu}
                            className="text-black hover:text-blue-600  text-sm"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    onClick={toggleMenu}
                    className="text-black hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
