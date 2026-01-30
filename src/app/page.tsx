import AmenitiesSlider from "@/components/User/Home/AmenitiesHighlights";
import HeroSlider from "@/components/User/Home/HeroSlider";
import HomeAboutSection from "@/components/User/Home/HomeAboutSection";
import HomeVideoSection from "@/components/User/Home/HomeVideoSection";
import VideoHeroSection from "@/components/User/Home/VideoHeroSection";
import RoomsPreviewSection from "@/components/User/Home/RoomsPreviewSection";
import HomeGallery from "@/components/User/Home/HomeGallery";
import PartyHall from "@/components/User/Home/PartyHall";
import PackageSwiper from "@/components/User/Packages/PackageSwiper";
import ActivitiesSwiper from "@/components/User/Home/ActivitiesSwiper";
import ContactFormSection from "@/components/User/Home/ContactFormSection";

export default function Home() {
  return (
   <>
   <HeroSlider />
   <HomeAboutSection />
   <VideoHeroSection />
   <AmenitiesSlider />
   <RoomsPreviewSection />
   <PartyHall />
   <HomeVideoSection />
   <PackageSwiper />
   <ActivitiesSwiper />
   <HomeGallery />
   <ContactFormSection />
   </> 
  );
}
