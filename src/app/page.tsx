import AboutUsSection from "@/components/User/Home/AboutUsSection";
import AmenitiesSlider from "@/components/User/Home/AmenitiesHighlights";
import BookNowSection from "@/components/User/Home/BookNowSection";
import HeroSlider from "@/components/User/Home/HeroSlider";
import HomeAboutSection from "@/components/User/Home/HomeAboutSection";
import ReasonsTimeline from "@/components/User/Home/ReasonsTimeline";
import RestaurantVideoSection from "@/components/User/Home/RestaurantVideoSection";
import PreviewSection from "@/components/User/Home/PreviewSection";
import SecondGallery from "@/components/User/Home/SecondGallery";
import VideoHeroSection from "@/components/User/Home/VideoHeroSection";
import RoomsPreviewSection from "@/components/User/Home/RoomsPreviewSection";
import HomeGallery from "@/components/User/Home/HomeGallery";

export default function Home() {
  return (
   <>
   <HeroSlider />
   <HomeAboutSection />
   <VideoHeroSection />
   <AmenitiesSlider />
   <RoomsPreviewSection />
   <HomeGallery />
   <PreviewSection />
   <AboutUsSection />
   <ReasonsTimeline />
   <BookNowSection />
   <RestaurantVideoSection />
   <SecondGallery />
   </> 
  );
}
