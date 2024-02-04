"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import style from "../photoModal.module.css";

type Props = {
  children: ReactNode;
};

const PhotoModal = ({ children }: Props) => {
  const pathname = usePathname();
  if (!pathname.includes("/photo/")) {
    return null;
  }

  return <div className={style.container}>{children}</div>;
};

export default PhotoModal;
