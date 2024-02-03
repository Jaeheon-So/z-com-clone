import React from "react";
import RightSearchForm from "../_component/RightSearchForm";
import SearchForm from "../_component/SearchForm";
import style from "./explore.module.css";
import Trend from "../_component/Trend";
import TrendSection from "./_component/TrendSection";

const ExplorePage = () => {
  return (
    <main className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        <TrendSection />
      </div>
    </main>
  );
};

export default ExplorePage;
