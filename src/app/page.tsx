import { Header } from "@/components/common/Header";
import AboutUsSection from "@/components/User/Home/AboutUsSection";
import AmenitiesSlider from "@/components/User/Home/AmenitiesHighlights";
import BookNowSection from "@/components/User/Home/BookNowSection";
import GalleryHome from "@/components/User/Home/GalleryHome";
import GallerySection from "@/components/User/Home/GallerySection";
import HeroSlider from "@/components/User/Home/HeroSlider";
import HomeAboutSection from "@/components/User/Home/HomeAboutSection";
import IntroductionSection from "@/components/User/Home/IntroductionSection";
import ReasonsTimeline from "@/components/User/Home/ReasonsTimeline";
import RestaurantVideoSection from "@/components/User/Home/RestaurantVideoSection";
import PreviewSection from "@/components/User/Home/PreviewSection";
import SecondGallery from "@/components/User/Home/SecondGallery";
import VideoHeroSection from "@/components/User/Home/VideoHeroSection";
import RoomsPreviewSection from "@/components/User/Home/RoomsPreviewSection";

export default function Home() {
  return (
   <>
   <HeroSlider />
   <HomeAboutSection />
   <VideoHeroSection />
   <AmenitiesSlider />
   <RoomsPreviewSection />
   <PreviewSection />
   <AboutUsSection />
   <ReasonsTimeline />
   <GalleryHome />
   <BookNowSection />
   <RestaurantVideoSection />
   <GallerySection />
   <RestaurantVideoSection />
   <SecondGallery />
   </> 
  );
}
