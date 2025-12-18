import Breadcrumb from "@/components/common/Breadcrumb";

export default function AmenitiesPage() {
  return (
    <>
      <Breadcrumb
        heading="Discover Our Amenities"
        bgImage="/images/common/ms-enclave-17.webp" // ⭐ background image
        items={[{ label: "Our Amenities", href: "/amenities" }]}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Page content here */}
      </div>
    </>
  );
}
