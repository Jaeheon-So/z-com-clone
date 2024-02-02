"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import PostRecommends from "./PostRecommends";
import FollowingPosts from "./FollowingPosts";

const TabDecider = () => {
  const tabContext = useContext(TabContext);

  return tabContext?.tab === "rec" ? <PostRecommends /> : <FollowingPosts />;
};

export default TabDecider;
