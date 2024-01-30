"use client";

import React from "react";
import CloseSvg from "../_svg/CloseSvg";
import { useRouter } from "next/navigation";
import style from "@/app/(beforeLogin)/_component/signup.module.css";

const BackButton = () => {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  };

  return (
    <button className={style.closeButton} onClick={onClickClose}>
      <CloseSvg />
    </button>
  );
};

export default BackButton;
