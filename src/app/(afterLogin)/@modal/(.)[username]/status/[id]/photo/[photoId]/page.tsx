import style from "./photoModal.module.css";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";

import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
// import { usePathname } from "next/navigation";
import SinglePosts from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePosts";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import ImageZone from "./_component/ImageZone";

type Props = {
  params: { id: string };
};

const PhotoModalPage = async ({ params }: Props) => {
  // const pathname = usePathname();
  // if (!pathname.includes("/photo/")) {
  //   return null;
  // }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", params.id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", params.id, "comments"],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={params.id} />
        <div className={style.commentZone}>
          <SinglePosts id={params.id} noImage />
          <CommentForm />
          <Comments id={params.id} />
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default PhotoModalPage;
