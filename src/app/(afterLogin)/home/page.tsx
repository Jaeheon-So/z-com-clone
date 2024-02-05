import { Suspense } from "react";
import styles from "./home.module.css";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import Loading from "../_component/Loading";

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
