"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import BookingSection from "@/components/User/Booking/BookingSection";
import BookingSectionDummy from "@/components/User/Booking/BookingSectionDummy";

export default function PackageBookingPage() {
  return (
    <section>
      <Breadcrumb
        heading="Discover Our Packages"
        bgImage="/images/common/ms-enclave-26.webp"
        items={[{ label: "Our Packages", href: "/packages" }]}
      />
      {/* <BookingSectionDummy /> */}
      <BookingSection />

    </section>
  );
}
