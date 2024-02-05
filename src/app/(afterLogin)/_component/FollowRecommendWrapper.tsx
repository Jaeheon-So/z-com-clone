"use client";

import { Suspense } from "react";
import FollowRecommendSection from "./FollowRecommendSection";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "./Loading";

const FollowRecommendWrapper = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              <h2>팔로우 추천 불러오기 실패</h2>
              <button
                onClick={
                  // Attempt to recover by trying to re-render the segment
                  () => resetErrorBoundary()
                }
              >
                다시 시도
              </button>
            </div>
          )}
          onReset={reset}
          onError={() => {}}
        >
          <Suspense fallback={<Loading />}>
            <h3>팔로우 추천</h3>
            <FollowRecommendSection />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default FollowRecommendWrapper;
