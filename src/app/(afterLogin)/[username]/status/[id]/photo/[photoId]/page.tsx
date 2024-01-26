import PhotoModalPage from "@/app/(afterLogin)/@modal/(.)[username]/status/[id]/photo/[photoId]/page";
import HomePage from "@/app/(afterLogin)/home/page";
import React from "react";

const PhotoIdPage = () => {
  return (
    <>
      <HomePage />
      <PhotoModalPage />
    </>
  );
};

export default PhotoIdPage;
