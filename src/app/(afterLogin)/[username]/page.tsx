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
