import style from "./profile.module.css";
import UserPosts from "./_component/UserPosts";
import UserInfo from "./_component/UserInfo";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUser } from "./_lib/getUser";
import { getUserPosts } from "./_lib/getUserPosts";

type Props = {
  params: { username: string };
};

const ProfilePage = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", params.username],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", params.username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main className={style.main}>
        <UserInfo username={params.username} />
        <div>
          <UserPosts username={params.username} />
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default ProfilePage;
