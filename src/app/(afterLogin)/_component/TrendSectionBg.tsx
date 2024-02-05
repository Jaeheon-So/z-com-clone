"use client";

import { Suspense } from "react";
import TrendSection from "./TrendSection";
import style from "./trendSection.module.css";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "./Loading";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const TrendSectionBg = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>
      </div>
    );
  }
  if (pathname === "/explore") {
    return null;
  }

  return (
    <div className={style.trendBg}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                <h2>트렌드 불러오기 실패</h2>
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
              <TrendSection />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
};

export default TrendSectionBg;
