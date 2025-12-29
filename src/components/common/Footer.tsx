"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faXTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="mt-20">

      {/* ================= MAIN FOOTER ================= */}
      <div className="bg-black text-white mt-20 rounded-t-3xl">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">

          {/* BRAND */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              M.S. Enclave
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed font-dm">
              Experience luxury, comfort, and tradition in the heart of Kerala.
            </p>

            <div className="flex gap-4 mt-6">
              <Social icon={faFacebookF} />
              <Social icon={faInstagram} />
              <Social icon={faYoutube} />
              <Social icon={faXTwitter} />
              <Social icon={faWhatsapp} />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-300  text-sm font-dm">
              <li className="hover:font-bold hover:text-white"><Link href="/">Home</Link></li>
              <li className="hover:font-bold hover:text-white"><Link href="/packages">Packages</Link></li>
              <li className="hover:font-bold hover:text-white"><Link href="/amenities/rooms">Rooms</Link></li>
              <li className="hover:font-bold hover:text-white"><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-gray-300  text-sm font-dm">
              <li className="hover:font-bold hover:text-white"><Link href="#">Help Center</Link></li>
              <li className="hover:font-bold hover:text-white"><Link href="#">Privacy Policy</Link></li>
              <li className="hover:font-bold hover:text-white"><Link href="#">Terms & Conditions</Link></li>
              <li className="hover:font-bold hover:text-white"><Link href="#">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-300  text-sm font-dm">
                <li><p className="text-gray-300 hover:font-bold hover:text-white text-sm leading-relaxed font-dm">
              Mannuparambil, Paruthipully<br />
              Palakkad, Kerala – 678573
            </p></li>
            <li><Link href={'tel:+91 858 999 6642'} className="text-gray-300 hover:font-bold hover:text-white text-sm mt-3 font-dm">
              📞 +91 858 999 6642
            </Link></li>
            <li><Link href={'mailto:info@msenclave.com'} className="text-gray-300 hover:font-bold hover:text-white text-sm font-dm">
              ✉️ info@msenclave.com
            </Link></li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} M.S Enclave. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ================= SOCIAL ICON ================= */

function Social({ icon }: { icon: any }) {
  return (
    <a
      href="#"
      className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}
