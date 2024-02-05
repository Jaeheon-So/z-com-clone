"use clent";

import style from "@/app/(afterLogin)/[username]/profile.module.css";
import BackSvg from "../_svg/BackSvg";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  };

  return (
    <button className={style.backButton} onClick={onClickBack}>
      <BackSvg />
    </button>
  );
};

export default BackButton;
