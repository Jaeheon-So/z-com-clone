import { Suspense } from "react";
import styles from "./home.module.css";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import Loading from "@/app/(afterLogin)/home/loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈 / Z",
  description: "홈",
};

const HomePage = async () => {
  return (
    <main className={styles.main}>
      <Suspense fallback={<Loading />}>
        <TabDeciderSuspense />
      </Suspense>
    </main>
  );
};

export default HomePage;
