"use client"; // 잠시 편의상 클라이언트로

import React from "react";
import style from "./profile.module.css";
import Post from "../_component/Post";
import BackButton from "../_component/BackButton";
import { usePathname } from "next/navigation";

type Props = {};

const ProfilePage = (props: Props) => {
  const pathname = usePathname();

  const user =
    pathname === "/thwogjs98"
      ? {
          id: "thwogjs98",
          nickname: "소재헌",
          image: "/5Udwvqim.jpg",
        }
      : {
          id: "elonmusk",
          nickname: "Elon Musk",
          image: "/yRsRRjGO.jpg",
        };

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
};

export default ProfilePage;
