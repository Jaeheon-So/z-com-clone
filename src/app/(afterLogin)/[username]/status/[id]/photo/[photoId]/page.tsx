import PhotoModalPage from "@/app/(afterLogin)/@modal/(.)[username]/status/[id]/photo/[photoId]/page";
import HomePage from "@/app/(afterLogin)/home/page";

type Props = {
  params: { id: string };
};

const PhotoIdPage = ({ params }: Props) => {
  return (
    <>
      <HomePage />
      <PhotoModalPage params={params} />
    </>
  );
};

export default PhotoIdPage;
