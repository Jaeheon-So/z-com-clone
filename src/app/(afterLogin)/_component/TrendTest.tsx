import { getTrendsServer } from "../_lib/getTrendsServer";
import TrendSection from "./TrendSection";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const TrendTest = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["trends"],
    queryFn: getTrendsServer,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <TrendSection />
    </HydrationBoundary>
  );
};

export default TrendTest;
