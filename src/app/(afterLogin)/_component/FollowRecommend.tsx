"use client";

import React from "react";
import style from "./followRecommend.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "@/model/User";

type Props = {
  user: User;
};

const FollowRecommend = ({ user }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const onFollow = () => {
    if (!session?.user) router.push("/");
  };

  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  );
};

export default FollowRecommend;
