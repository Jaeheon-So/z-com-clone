import React from "react";
import styles from "./home.module.css";
import { TabProvider } from "./_component/TabProvider";
import Tab from "./_component/Tab";

const HomePage = () => {
  return (
    <div className={styles.main}>
      HomePage
      <TabProvider>
        <Tab />
        {/* <PostForm />
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/> */}
      </TabProvider>
    </div>
  );
};

export default HomePage;
