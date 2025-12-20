import Breadcrumb from "@/components/common/Breadcrumb";
import AmenitiesSection from "../hi/page";

export default function AboutUsPage() {
  return (
    <>
      <Breadcrumb
        heading="About M.S. Enclave Heritage Resort"
        bgImage="/images/home/ms-slider-0.webp"   // ⭐ background image
        items={[
          { label: "About Us", href: "/about-us" }
        ]}
      />

         <AmenitiesSection />
      
    </>
  );
}
