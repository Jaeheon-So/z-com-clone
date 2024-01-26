import React from "react";
import style from "@/app/(afterLogin)/[username]/profile.module.css";
import BackSvg from "../_svg/BackSvg";

const BackButton = () => {
  return (
    <button className={style.backButton}>
      <BackSvg />
    </button>
  );
};

export default BackButton;
