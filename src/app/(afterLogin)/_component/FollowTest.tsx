import FollowRecommendSection from "./FollowRecommendSection";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getFollowRecommendsServer } from "../_lib/getFollowRecommendServer";

const FollowTest = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommendsServer,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <FollowRecommendSection />
    </HydrationBoundary>
  );
};

export default FollowTest;
