import Breadcrumb from "@/components/common/Breadcrumb";
import PartyHallGallery from "@/components/User/Amenities/PartyHall/PartyHallGallery";
import PartyHallHighlights from "@/components/User/Amenities/PartyHall/PartyHallHighlights";
import PartyHallWelcome from "@/components/User/Amenities/PartyHall/PartyHallWelcome";
import WhyChoosePartyHall from "@/components/User/Amenities/PartyHall/WhyChoosePartyHall";
import type { Metadata } from "next";
import Image from "next/image";


export const metadata: Metadata = {
  title:
    "Mini Party Hall in Palakkad | Wedding & Corporate Events – M.S. Enclave",
  description:
    "Mini party hall in Palakkad with AC facility for weddings, birthday parties, corporate meetings & family events. Capacity up to 200 guests at M.S. Enclave Heritage Resort, Paruthipully.",
  keywords: [
    "party hall in Palakkad",
    "mini party hall Palakkad",
    "wedding venue Palakkad",
    "corporate meeting hall Palakkad",
    "birthday party hall Palakkad",
    "AC party hall Kerala",
    "event venue near Paruthipully",
  ],
};

export default function PartyHallPage() {
  return (
    <section>
        <Breadcrumb
                heading="Our Party Hall"
                bgImage="/images/common/ms-enclave-31.webp"   // ⭐ background image
                items={[
                  { label: "Party Hall", href: "/amenities/party-hall" }
                ]}
              />
        <PartyHallWelcome />
        <WhyChoosePartyHall />
        <PartyHallGallery />
        
    </section>
  );
}
