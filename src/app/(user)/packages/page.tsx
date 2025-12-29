"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import PackagesSection from "@/components/User/Packages/PackagesSection";
import PackagesSectionNew from "@/components/User/Packages/PackagesSectionNew";

export default function PackagesPage() {
  return (
    <section>
      <Breadcrumb
        heading="Discover Our Packages"
        bgImage="/images/common/ms-enclave-26.webp"
        items={[{ label: "Our Packages", href: "/packages" }]}
      />
      <PackagesSection />
      <PackagesSectionNew />

    </section>
  );
}
