"use client";

import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { Fragment, useEffect } from "react";
import { getFollowingPosts } from "../_lib/getFollowingPosts";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { useInView } from "react-intersection-observer";
import Loading from "../../_component/Loading";
import { useSession } from "next-auth/react";

const FollowingPosts = () => {
  const { data: session } = useSession();
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["posts", "followings"],
      queryFn: getFollowingPosts,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
      staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
      gcTime: 300 * 1000,
    });
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 50,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView]);

  return data?.pages.map((page, index) => (
    <Fragment key={index}>
      {page
        .filter((post) => post.User.id !== session?.user?.email)
        .map((post) => (
          <Post key={post.postId} post={post} />
        ))}
      <div
        ref={ref}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
        }}
      >
        {isFetching && <Loading />}
      </div>
    </Fragment>
  ));
};

export default FollowingPosts;
