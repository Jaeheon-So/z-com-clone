"use client";

import React, { useContext, useState } from "react";
import style from "./tab.module.css";
import { TabContext } from "./TabProvider";

const Tab = () => {
  const tabContext = useContext(TabContext);

  const onClickRec = () => {
    tabContext?.setTab("rec");
  };

  const onClickFol = () => {
    tabContext?.setTab("fol");
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}>홈</div>
      <div className={style.homeTab}>
        <div onClick={onClickRec}>
          추천
          <div
            className={style.tabIndicator}
            hidden={tabContext?.tab === "fol"}
          ></div>
        </div>
        <div onClick={onClickFol}>
          팔로우 중
          <div
            className={style.tabIndicator}
            hidden={tabContext?.tab === "rec"}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Tab;
