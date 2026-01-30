import Breadcrumb from "@/components/common/Breadcrumb";
import ArtificialRainPreviewSection from "@/components/User/Amenities/ArtificialRainPreviewSection";
import ConferenceHallPreviewSection from "@/components/User/Amenities/ConferenceHallPreviewSection";
import IndoorGamesPreviewSection from "@/components/User/Amenities/IndoorGamesPreviewSection";
import PoolPreviewSection from "@/components/User/Amenities/PoolPreviewSection";
import RoomPreviewSection from "@/components/User/Amenities/RoomPreviewSection";

export default function AmenitiesPage() {
  return (
    <>
      <Breadcrumb
        heading="Discover Our Amenities"
        bgImage="/images/common/ms-enclave-17.webp" 
        items={[{ label: "Our Amenities", href: "/amenities" }]}
      />

      <div className="">
        <RoomPreviewSection />
        {/* <ConferenceHallPreviewSection />
        <PoolPreviewSection />
        <IndoorGamesPreviewSection />*/}
        <ArtificialRainPreviewSection /> 
      </div>
    </>
  );
}
