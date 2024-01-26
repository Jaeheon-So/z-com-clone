"use client";

import CommentSvg from "../_svg/CommentSvg";
import HeartSvg from "../_svg/HeartSvg";
import RepostSvg from "../_svg/RepostSvg";
import style from "./actionButtons.module.css";
import React from "react";

type Props = {
  white?: boolean;
};

const ActionButtons = ({ white }: Props) => {
  const commented = true;
  const reposted = true;
  const liked = false;

  const onClickComment = () => {};
  const onClickRepost = () => {};
  const onClickHeart = () => {};

  return (
    <div className={style.actionButtons}>
      <div
        className={`${style.commentButton} ${commented && style.commented} ${
          white && style.white
        }`}
      >
        <button onClick={onClickComment}>
          <CommentSvg />
        </button>
        <div className={style.count}>{1 || ""}</div>
      </div>
      <div
        className={`${style.repostButton} ${reposted && style.reposted} ${
          white && style.white
        }`}
      >
        <button onClick={onClickRepost}>
          <RepostSvg />
        </button>
        <div className={style.count}>{1 || ""}</div>
      </div>
      <div
        className={`${style.heartButton} ${liked && style.liked} ${
          white && style.white
        }`}
      >
        <button onClick={onClickHeart}>
          <HeartSvg />
        </button>
        <div className={style.count}>{0 || ""}</div>
      </div>
    </div>
  );
};

export default ActionButtons;
