import style from "./profile.module.css";
import UserPosts from "./_component/UserPosts";
import UserInfo from "./_component/UserInfo";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserPosts } from "./_lib/getUserPosts";
import { auth } from "@/auth";
import { getUserServer } from "./_lib/getUserServer";
import { User } from "@/model/User";

// export async function generateMetadata({params}: Props) {
//   const user: User = await getUserServer({ queryKey: ["users", params.username] });
//   return {
//     title: `${user.nickname} (${user.id}) / Z`,
//     description: `${user.nickname} (${user.id}) 프로필`,
//     openGraph: {
//       title: `${user.nickname} (${user.id}) / Z`,
//       description: `${user.nickname} (${user.id}) 프로필`,
//       images: [
//         {
//           url: `https://z.nodebird.com${user.image}`,
//           width: 400,
//           height: 400,
//         },
//       ]
//     }
//   }
// }

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  return {
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
  };
}

type Props = {
  params: { username: string };
};

const ProfilePage = async ({ params }: Props) => {
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", params.username],
    queryFn: getUserServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", params.username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main className={style.main}>
        <UserInfo username={params.username} session={session} />
        <div>
          <UserPosts username={params.username} />
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default ProfilePage;
