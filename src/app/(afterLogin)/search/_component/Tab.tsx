"use client";

import { useState } from "react";
import style from "../search.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const Tab = () => {
  const router = useRouter();
  const [current, setCurrent] = useState("hot");
  const searchParams = useSearchParams();

  const onClickHot = () => {
    setCurrent("hot");
    router.replace(`/search?q=${searchParams.get("q") || ""}`);
  };

  const onClickNew = () => {
    setCurrent("new");
    router.replace(`/search?q=${searchParams.get("q") || ""}&f=live`);
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div onClick={onClickHot}>
          인기
          <div className={style.tabIndicator} hidden={current === "new"}></div>
        </div>
        <div onClick={onClickNew}>
          최신
          <div className={style.tabIndicator} hidden={current === "hot"}></div>
        </div>
      </div>
    </div>
  );
};

export default Tab;