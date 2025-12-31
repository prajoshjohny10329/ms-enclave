"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faXTwitter,
  faWhatsapp,
  faGoogle,
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
              <Social icon={faGoogle} href={'https://share.google/bNocpD9oCYBNHBtsD'} />
              <Social icon={faInstagram} href={'https://www.instagram.com/ms_enclaveheritageresort?igsh=cnI4NTdhMTFtcmp3'} />
              <Social icon={faYoutube} href={'https://youtu.be/va9W1NfJ4D4?si=fNHIGIwiklFDz9Sn'} />
              <Social icon={faWhatsapp} href={'https://api.whatsapp.com/send?phone=+919745666642&text=Hello%2C%20I%20would%20like%20to%20make%20an%20enquiry%20about%20your%20packages'} />
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
                <li><Link href={'https://maps.app.goo.gl/MvrRJ2aN9SZZsFHL7'} className="text-gray-300 hover:font-bold hover:text-white text-sm leading-relaxed font-dm">
              Mannuparambil, Paruthipully<br />
              Palakkad, Kerala – 678573
            </Link></li>
            <li><Link href={'tel:+91 97456 66642'} className="text-gray-300 hover:font-bold hover:text-white text-sm mt-3 font-dm">
              📞 +91 97456 66642
            </Link></li>
            <li><Link href={'mailto:msenclaveresort@gmail.com'} className="text-gray-300 hover:font-bold hover:text-white text-sm font-dm">
              ✉️ msenclaveresort@gmail.com
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

function Social({ icon, href }: { icon: any, href:string  }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition"
    >
      <FontAwesomeIcon icon={icon} />
    </Link>
  );
}
