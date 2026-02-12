"use client";
import "yet-another-react-lightbox/styles.css";
import Breadcrumb from "@/components/common/Breadcrumb";
import GalleryGrid from "@/components/User/Gallery/GalleryGrid";
import GalleryHorizontalScrollSection from "@/components/User/Gallery/GalleryHorizontalScrollSection";


export default function GallerySection() {
  return (
    <section>
      <Breadcrumb
        heading="Experiences"
        bgImage="/images/new/ms-enclave-inside-rain.webp"
        items={[{ label: "Gallery", href: "/gallery" }]}
      />
      {/* <GalleryIntroduction /> */}
      <GalleryHorizontalScrollSection />
      <GalleryGrid />
    </section>
  );
}
