"use client";

import { Post as IPost } from "@/model/Post";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getUserPosts } from "../_lib/getUserPosts";
import Post from "../../_component/Post";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";
import Loading from "../../_component/Loading";

type Props = {
  username: string;
};

const UserPosts = ({ username }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string, Props["username"]],
    number
  >({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 50,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView]);

  if (user) {
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
  }
  return null;
};

export default UserPosts;
