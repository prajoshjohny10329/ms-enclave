"use client";

import UserCalendarAvailability from "@/components/User/Booking/UserCalendarAvailability";
import PackageDetails from "@/components/User/Packages/package/PackageDetails";

export default function PackageSinglePage() {
  return (
    <section>
        <div className="max-w-6xl mx-auto p-6  text-gray-900 py-20 grid  md:grid-cols-10 gap-10">
          {/* LEFT SIDE */}
          <div className="md:col-span-6">
            <PackageDetails />
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-4">
            <div className="sticky top-24">
              <div className="rounded-xl bg-white relative w-full overflow-hidden transition shadow-sm">
                <UserCalendarAvailability />
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
