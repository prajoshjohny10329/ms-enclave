import Breadcrumb from "@/components/common/Breadcrumb";

export default function RoomsPage() {
  return (
    <>
      <Breadcrumb
        heading="Discover Our Rooms"
        bgImage="/images/common/ms-enclave-24.webp"   // ⭐ background image
        items={[
          { label: "Our Rooms", href: "/rooms" }
        ]}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Page content here */}
      </div>
    </>
  );
}
