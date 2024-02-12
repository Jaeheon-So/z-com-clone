"use client";

import style from "./trendSection.module.css";
import Trend from "./Trend";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTrends } from "../_lib/getTrends";
import { Hashtag } from "@/model/Hashtag";

const TrendSection = () => {
  const { data } = useSuspenseQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
    // enabled: !!session?.user,
  });

  return (
    <>
      {data?.map((trend, index) => (
        <Trend key={index} trend={trend} />
      ))}
    </>
  );
};

export default TrendSection;
