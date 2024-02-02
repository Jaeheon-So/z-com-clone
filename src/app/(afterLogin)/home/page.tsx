import React from "react";
import styles from "./home.module.css";
import { TabProvider } from "./_component/TabProvider";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PostRecommends from "./_component/PostRecommends";
import { getPostRecommends } from "./_lib/getPostRecomends";
import TabDecider from "./_component/TabDecider";

const HomePage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
};

export default HomePage;
