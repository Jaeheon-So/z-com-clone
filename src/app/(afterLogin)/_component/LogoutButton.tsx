"use client";

import { signOut } from "next-auth/react";
import style from "./logoutButton.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { Session } from "@auth/core/types";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  me: Session | null;
};

const LogoutButton = ({ me }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const onLogout = () => {
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
    signOut({ redirect: false })
      .then(async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
          method: "post",
          credentials: "include",
        });
        alert("로그아웃 성공");
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
        <img src={`${me?.user?.image!}`} alt={me.user?.email || ""} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
};

export default LogoutButton;
