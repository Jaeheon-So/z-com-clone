import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getUserPosts: QueryFunction<
  Post[],
  [_1: string, _2: string, username: string],
  number
> = async ({ queryKey, pageParam }) => {
  const [_1, _2, username] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}/posts?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "users", username],
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
