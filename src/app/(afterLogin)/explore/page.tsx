import { Suspense } from "react";
import SearchForm from "../_component/SearchForm";
import style from "./explore.module.css";
import TrendSection from "./_component/TrendSection";
import Loading from "../_component/Loading";

const ExplorePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TrendSection />
    </Suspense>
  );
};

export default ExplorePage;
