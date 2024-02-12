import { Suspense } from "react";
import FollowRecommendSection from "./FollowRecommendSection";
import Loading from "./Loading";
import QueryErrorReset from "./QueryErrorReset";

const FollowRecommendWrapper = () => {
  return (
    <QueryErrorReset message="팔로우 추천 불러오기 실패">
      <h3>팔로우 추천</h3>
      <Suspense fallback={<Loading />}>
        <FollowRecommendSection />
      </Suspense>
    </QueryErrorReset>
  );
};

export default FollowRecommendWrapper;
