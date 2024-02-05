import { Suspense } from "react";
import styles from "./home.module.css";
import { TabProvider } from "./_component/TabProvider";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import Loading from "@/app/(afterLogin)/home/loading";

const HomePage = async () => {
  return (
    <main className={styles.main}>
      {/* <Suspense fallback={<Loading />}> */}
      <TabDeciderSuspense />
      {/* </Suspense> */}
    </main>
  );
};

export default HomePage;
