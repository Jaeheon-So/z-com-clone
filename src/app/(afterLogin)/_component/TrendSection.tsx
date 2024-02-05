"use client";

import style from "./trendSection.module.css";
import Trend from "./Trend";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTrends } from "../_lib/getTrends";
import { Hashtag } from "@/model/Hashtag";

const TrendSection = () => {
  const { data: session } = useSession();
  const { data } = useSuspenseQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
    // enabled: !!session?.user,
  });

  if (!session?.user) {
    return <div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>;
  }

  return (
    <div className={style.trend}>
      <h3>나를 위한 트렌드</h3>
      {data?.map((trend) => (
        <Trend key={trend.tagId} trend={trend} />
      ))}
    </div>
  );
};

export default TrendSection;
