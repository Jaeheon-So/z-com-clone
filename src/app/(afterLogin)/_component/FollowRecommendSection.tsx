"use client";

import { useQuery } from "@tanstack/react-query";
import { getFollowRecommends } from "../_lib/getFollowRecommends";
import { User } from "@/model/User";
import FollowRecommend from "./FollowRecommend";

const FollowRecommendSection = () => {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  return data?.map((user) => <FollowRecommend key={user.id} user={user} />);
};

export default FollowRecommendSection;
