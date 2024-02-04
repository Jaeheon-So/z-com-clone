import { Post } from "@/model/Post";
import { User } from "@/model/User";
import { QueryFunction } from "@tanstack/react-query";

export const getSinglePost: QueryFunction<
  Post,
  [_1: string, id: string]
> = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
    {
      next: {
        tags: ["posts", id],
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
