import { Header } from "@/components/common/Header";
import HeroSlider from "@/components/HeroSlider";
import AboutUsSection from "@/components/User/Home/AboutUsSection";
import BookNowSection from "@/components/User/Home/BookNowSection";
import GallerySection from "@/components/User/Home/GallerySection";
import IntroductionSection from "@/components/User/Home/IntroductionSection";
import RestaurantVideoSection from "@/components/User/Home/RestaurantVideoSection";
import RoomsPreviewSection from "@/components/User/Home/RoomsPreviewSection";
import SecondGallery from "@/components/User/Home/SecondGallery";
import VideoHeroSection from "@/components/User/Home/VideoHeroSection";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <HeroSlider />
   <IntroductionSection />
   <VideoHeroSection />
   <RoomsPreviewSection />
   <AboutUsSection />
   <BookNowSection />
   <RestaurantVideoSection />
   <GallerySection />
   <RestaurantVideoSection />
   <SecondGallery />
   </> 
  );
}
