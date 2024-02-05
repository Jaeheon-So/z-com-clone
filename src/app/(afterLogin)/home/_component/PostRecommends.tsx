"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecomends";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../../_component/Loading";

const PostRecommends = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
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
      {page.map((post) => (
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

export default PostRecommends;
