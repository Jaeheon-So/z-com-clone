import { Suspense } from "react";
import TrendSection from "./TrendSection";
import style from "./trendSection.module.css";
import Loading from "./Loading";
import QueryErrorReset from "./QueryErrorReset";

const TrendSectionBg = () => {
  return (
    <div className={style.trendBg}>
      <QueryErrorReset message="트렌드 불러오기 실패">
        <Suspense fallback={<Loading />}>
          <TrendSection />
        </Suspense>
      </QueryErrorReset>
    </div>
  );
};

export default TrendSectionBg;
