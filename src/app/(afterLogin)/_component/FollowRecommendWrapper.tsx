import { Suspense } from "react";
import Loading from "./Loading";
import QueryErrorReset from "./QueryErrorReset";
import FollowTest from "./FollowTest";

const FollowRecommendWrapper = () => {
  return (
    <QueryErrorReset message="팔로우 추천 불러오기 실패">
      <h3>팔로우 추천</h3>
      <Suspense fallback={<Loading />}>
        <FollowTest />
      </Suspense>
    </QueryErrorReset>
  );
};

export default FollowRecommendWrapper;
