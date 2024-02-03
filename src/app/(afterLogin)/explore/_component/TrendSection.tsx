"use client";

import { Hashtag } from "@/model/Hashtag";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Trend from "../../_component/Trend";
import { getTrends } from "../../_lib/getTrends";

const TrendSection = () => {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  return data?.map((trend) => <Trend key={trend.tagId} trend={trend} />);
};

export default TrendSection;
