"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getComments } from "../_lib/getComments";

type Props = {
  id: string;
};

const Comments = ({ id }: Props) => {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["posts", id]);
  const { data, error } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, Props["id"], _3: string]
  >({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  if (post) {
    return data?.map((post) => <Post post={post} key={post.postId} />);
  }

  return null;
};

export default Comments;
