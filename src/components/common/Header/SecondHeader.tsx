"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function SecondHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  return (
    <header className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black">
          M.S. 
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-black font-medium relative">

          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          {/* ROOMS DROPDOWN — FIXED */}
          <div className="group relative cursor-pointer">
            <span className="hover:text-blue-600">Rooms ▾</span>

            {/* FIXED DROPDOWN */}
            <div
              className="
                absolute left-0 top-full
                w-40 bg-white shadow-lg  rounded-lg
                hidden group-hover:flex flex-col
              "
            >
              <Link
                href="/admin/add-room"
                className="px-4 py-2 hover:bg-gray-100"
              >
                Add Room
              </Link>
              <Link
                href="/rooms"
                className="px-4 py-2 hover:bg-gray-100"
              >
                View Rooms
              </Link>
            </div>
          </div>
          {/* ROOMS DROPDOWN — FIXED */}
          <div className="group relative cursor-pointer">
            <span className="hover:text-blue-600">Rooms ▾</span>

            {/* FIXED DROPDOWN */}
            <div
              className="
                absolute left-0 top-full
                w-40 bg-white shadow-lg  rounded-lg
                hidden group-hover:flex flex-col
              "
            >
              <Link
                href="/admin/add-room"
                className="px-4 py-2 hover:bg-gray-100"
              >
                Add Room
              </Link>
              <Link
                href="/rooms"
                className="px-4 py-2 hover:bg-gray-100"
              >
                View Rooms
              </Link>
            </div>
          </div>

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

            <Link href="/" onClick={toggleMenu} className="hover:text-blue-600">
              Home
            </Link>

            {/* Rooms Expandable */}
            <button
              onClick={() => setRoomsOpen(!roomsOpen)}
              className="hover:text-blue-600"
            >
              Rooms ▾
            </button>

            {roomsOpen && (
              <div className="flex flex-col items-center space-y-2">
                <Link
                  href="/admin/add-room"
                  onClick={toggleMenu}
                  className="hover:text-blue-600 text-sm"
                >
                  Add Room
                </Link>

                <Link
                  href="/rooms"
                  onClick={toggleMenu}
                  className="hover:text-blue-600 text-sm"
                >
                  View Rooms
                </Link>
              </div>
            )}

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
