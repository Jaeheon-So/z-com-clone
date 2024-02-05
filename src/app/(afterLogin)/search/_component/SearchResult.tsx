"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import Post from "../../_component/Post";
import { getSearchResult } from "../_lib/getSearchResult";
import Loading from "../../_component/Loading";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

const SearchResult = ({ searchParams }: Props) => {
  const { data, isFetching } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  if (isFetching) {
    return <Loading />;
  }

  return data?.map((post) => <Post key={post.postId} post={post} />);
};

export default SearchResult;
