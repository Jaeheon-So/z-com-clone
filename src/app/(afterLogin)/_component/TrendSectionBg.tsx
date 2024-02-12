import { Suspense } from "react";
import style from "./trendSection.module.css";
import Loading from "./Loading";
import QueryErrorReset from "./QueryErrorReset";
import TrendTest from "./TrendTest";

const TrendSectionBg = () => {
  return (
    <div className={style.trendBg}>
      <QueryErrorReset message="트렌드 불러오기 실패">
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          <Suspense fallback={<Loading />}>
            <TrendTest />
          </Suspense>
        </div>
      </QueryErrorReset>
    </div>
  );
};

export default TrendSectionBg;
