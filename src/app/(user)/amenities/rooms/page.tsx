import Breadcrumb from "@/components/common/Breadcrumb";
import RoomAmenities from "@/components/User/Amenities/Rooms/RoomAmenities";
import RoomsContact from "@/components/User/Amenities/Rooms/RoomsContact";
import RoomsGallerySection from "@/components/User/Amenities/Rooms/RoomsGallerySection";
import RoomsWelcomeSection from "@/components/User/Amenities/Rooms/RoomsWelcomeSection";
import RoomsWhyChooseUs from "@/components/User/Amenities/Rooms/RoomsWhyChooseUs";
import WhyChooseRooms from "@/components/User/Amenities/Rooms/WhyChooseRooms";
import AmenitiesSlider from "@/components/User/Home/AmenitiesHighlights";

export default function RoomsPage() {
  return (
    <>
      <Breadcrumb
        heading="Discover Our Rooms"
        bgImage="/images/common/ms-enclave-24.webp"   // ⭐ background image
        items={[
          { label: "Our Rooms", href: "/amenities/rooms" }
        ]}
      />

      <div>
        <RoomsWelcomeSection />
        <RoomsWhyChooseUs />
        <RoomsGallerySection />
        <AmenitiesSlider />
        <RoomAmenities />
        <RoomsContact />
      </div>
    </>
  );
}
