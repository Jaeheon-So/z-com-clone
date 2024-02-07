"use client";

import {
  InfiniteData,
  useQuery,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import Post from "../../_component/Post";
import { getSearchResult } from "../_lib/getSearchResult";
import Loading from "../../_component/Loading";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

const SearchResult = ({ searchParams }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string, Props["searchParams"]],
      number
    >({
      queryKey: ["posts", "search", searchParams],
      queryFn: getSearchResult,
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

export default SearchResult;
