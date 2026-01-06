import Breadcrumb from "@/components/common/Breadcrumb";
import AmenitiesSection from "@/components/User/About/AmenitiesSection";

export default function AmenitiesPage() {
  return (
    <>
      <Breadcrumb
        heading="Discover Our Amenities"
        bgImage="/images/common/ms-enclave-17.webp" 
        items={[{ label: "Our Amenities", href: "/amenities" }]}
      />

      <div className="">
        <AmenitiesSection />
      </div>
    </>
  );
}
