import NearbyTouristPlacesVideo from '@/components/User/About/NearbyTouristPlacesVideo'
import ReasonsTimeline from '@/components/User/Home/ReasonsTimeline'
import AboutUsSection from "@/components/User/Home/AboutUsSection";
import BookNowSection from '@/components/User/Home/BookNowSection';
import SecondGallery from '@/components/User/Home/SecondGallery';


const page = () => {
  return (
    <>
    <NearbyTouristPlacesVideo />
    <AboutUsSection />
   <ReasonsTimeline />
   <BookNowSection />
   <SecondGallery />
    </>
  )
}

export default page