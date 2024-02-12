import { User } from "@/model/User";
import { QueryFunction } from "@tanstack/react-query";

export const getUser: QueryFunction<
  User,
  [_1: string, username: string]
> = async ({ queryKey }) => {
  const [_1, username] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
    {
      next: {
        tags: ["users", username],
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
