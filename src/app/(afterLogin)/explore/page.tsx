import { Suspense } from "react";
import TrendSection from "./_component/TrendSection";
import Loading from "../_component/Loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "탐색하기 / Z",
  description: "탐색해보세요.",
};

const ExplorePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TrendSection />
    </Suspense>
  );
};

export default ExplorePage;
