import Breadcrumb from "@/components/common/Breadcrumb";
import AboutSectionHistory from "@/components/User/About/AboutSectionHistory";
import AmenitiesSection from "@/components/User/About/AmenitiesSection";
import HeritageArchitectureSection from "@/components/User/About/HeritageArchitectureSection";
import NearbyTouristPlaces from "@/components/User/About/NearbyTouristPlaces";

export default function AboutUsPage() {
  return (
    <>
      <Breadcrumb
        heading="M.S. Enclave Heritage Resort"
        bgImage="/images/home/ms-slider-0.webp"   // ⭐ background image
        items={[
          { label: "About Us", href: "/about-us" }
        ]}
      />

         <AboutSectionHistory />
         <HeritageArchitectureSection />
         <AmenitiesSection />
         <NearbyTouristPlaces />
      
    </>
  );
}
