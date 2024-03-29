import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.css";
import CommentForm from "./_component/CommentForm";
import SinglePosts from "./_component/SinglePosts";
import Comments from "./_component/Comments";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getSinglePost } from "./_lib/getSinglePost";
import { getComments } from "./_lib/getComments";
import { User } from "@/model/User";
import { Post } from "@/model/Post";
import { getUserServer } from "../../_lib/getUserServer";
import { getSinglePostServer } from "./_lib/getSinglePostServer";

// export async function generateMetadata({params}: Props) {
//   const user: User = await getUserServer({queryKey: ["users", params.username]});
//   const post: Post = await getSinglePostServer({queryKey: ["posts", params.id]});
//   return {
//     title: `Z에서 ${user.nickname} 님 : ${post.content}`,
//     description: post.content,
//     openGraph: {
//       title: `Z에서 ${user.nickname} 님 : ${post.content}`,
//       description: post.content,
//       images: post.Images?.length > 0
//         ? post.Images?.map((v) => ({
//           url: `https://z.nodebird.com${v.link}`,
//           width: 600,
//           height: 400,
//         }))
//         : [
//           {
//             url: `https://z.nodebird.com${user.image}`,
//             width: 400,
//             height: 400,
//           },
//         ],
//     }
//   }
// }

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  const post: Post = await getSinglePostServer({
    queryKey: ["posts", params.id],
  });
  return {
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
  };
}

type Props = {
  params: { id: string; username: string };
};

const SinglePostPage = async ({ params }: Props) => {
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
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <div className={style.marginTop}></div>
        <SinglePosts id={params.id} />
        <CommentForm id={params.id} />
        <div>
          <Comments id={params.id} />
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default SinglePostPage;
