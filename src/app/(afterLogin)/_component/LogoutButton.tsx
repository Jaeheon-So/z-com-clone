"use client";

import style from "./logoutButton.module.css";
import React from "react";

const LogoutButton = () => {
  const me = {
    // 임시로 내 정보 있는것처럼
    id: "thwogjs98",
    nickname: "소재헌",
    image: "/5Udwvqim.jpg",
  };

  const onLogout = () => {};

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.image} alt={me.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  );
};

export default LogoutButton;
