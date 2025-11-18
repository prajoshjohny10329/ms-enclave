import HeroSlider from "@/components/HeroSlider";
import AboutUsSection from "@/components/User/Home/AboutUsSection";
import BookNowSection from "@/components/User/Home/BookNowSection";
import GallerySection from "@/components/User/Home/GallerySection";
import RestaurantVideoSection from "@/components/User/Home/RestaurantVideoSection";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <HeroSlider />
   <AboutUsSection />
   <BookNowSection />
   <RestaurantVideoSection />
   <GallerySection />
   <RestaurantVideoSection />
   <RestaurantVideoSection />
   <h1>Hi</h1>
   </> 
  );
}
