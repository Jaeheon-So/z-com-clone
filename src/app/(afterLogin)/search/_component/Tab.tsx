"use client";

import { useEffect, useState } from "react";
import style from "../search.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const Tab = () => {
  const router = useRouter();
  const [current, setCurrent] = useState("hot");
  const searchParams = useSearchParams();

  const onClickHot = () => {
    setCurrent("hot");
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("f");
    router.push(`/search?${newSearchParams.toString()}`);
  };

  const onClickNew = () => {
    setCurrent("new");
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("f", "live");
    router.push(`/search?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    console.log("hi");
    if (!searchParams.get("f")) setCurrent("hot");
    else setCurrent("new");
  }, [searchParams]);

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
