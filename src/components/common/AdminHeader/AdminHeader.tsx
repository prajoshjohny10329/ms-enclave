"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-700">
          M.S. Enclave Resort Admin
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/admin/add-room" className="hover:text-blue-600">
            Add Room
          </Link>
          <Link href="/rooms" className="hover:text-blue-600">
            Rooms
          </Link>
          <Link href="/bookings" className="hover:text-blue-600">
            Booking
          </Link>
          <Link href="/gallery" className="hover:text-blue-600">
            Gallery
          </Link>
          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>
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
                  <User className="w-8 h-8 text-gray-700" />
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
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col items-center py-3 space-y-2">
            <Link href="/" onClick={toggleMenu} className="hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/rooms"
              onClick={toggleMenu}
              className="hover:text-blue-600"
            >
              Rooms
            </Link>
            <Link
              href="/bookings"
              onClick={toggleMenu}
              className="hover:text-blue-600"
            >
              Booking
            </Link>
            <Link
              href="/gallery"
              onClick={toggleMenu}
              className="hover:text-blue-600"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
