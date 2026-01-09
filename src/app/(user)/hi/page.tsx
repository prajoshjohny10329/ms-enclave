import GalleryGrid from '@/components/User/Gallery/GalleryGrid'
import GalleryIntroduction from '@/components/User/Gallery/GalleryIntroduction'
import CTA from '@/components/User/Home/ContactFormSection'
import React from 'react'

const page = () => {
  return (
    <>
    <GalleryIntroduction />
    <GalleryGrid />
    </>
  )
}

export default page