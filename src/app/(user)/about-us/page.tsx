import Breadcrumb from "@/components/common/Breadcrumb";

export default function AboutUsPage() {
  return (
    <>
      <Breadcrumb
        heading="About M.S. Enclave Heritage Resort"
        bgImage="/images/home/ms-slider-0.webp"   // ⭐ background image
        items={[
          { label: "About Us", href: "/about-us" }
        ]}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Page content here */}
      </div>
    </>
  );
}
