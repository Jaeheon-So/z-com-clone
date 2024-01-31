"use client";

import { signOut, useSession } from "next-auth/react";
import style from "./logoutButton.module.css";
import React from "react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const { data: me } = useSession();

  const onLogout = () => {
    signOut({ redirect: false })
      .then(() => {
        router.replace("/");
      })
      .catch((error) => {
        alert(`로그아웃 실패 => ${error}`);
      });
  };

  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image!} alt={me.user?.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
};

export default LogoutButton;
