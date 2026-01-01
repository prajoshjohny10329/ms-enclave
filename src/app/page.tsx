import AboutUsSection from "@/components/User/Home/AboutUsSection";
import AmenitiesSlider from "@/components/User/Home/AmenitiesHighlights";
import BookNowSection from "@/components/User/Home/BookNowSection";
import HeroSlider from "@/components/User/Home/HeroSlider";
import HomeAboutSection from "@/components/User/Home/HomeAboutSection";
import ReasonsTimeline from "@/components/User/Home/ReasonsTimeline";
import HomeVideoSection from "@/components/User/Home/HomeVideoSection";
import SecondGallery from "@/components/User/Home/SecondGallery";
import VideoHeroSection from "@/components/User/Home/VideoHeroSection";
import RoomsPreviewSection from "@/components/User/Home/RoomsPreviewSection";
import HomeGallery from "@/components/User/Home/HomeGallery";
import PartyHall from "@/components/User/Home/PartyHall";
import PackageSwiper from "@/components/User/Packages/PackageSwiper";
import ActivitiesSwiper from "@/components/User/Home/ActivitiesSwiper";

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
   </> 
  );
}
