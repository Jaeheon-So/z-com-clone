import React from "react";
import styles from "./home.module.css";
import { TabProvider } from "./_component/TabProvider";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import Post from "../_component/Post";

const HomePage = () => {
  return (
    <div className={styles.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </TabProvider>
    </div>
  );
};

export default HomePage;
