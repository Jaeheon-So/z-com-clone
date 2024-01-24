import React, { ReactNode } from "react";
import styles from "@/app/page.module.css";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const BeforeLoginLayout = ({ children, modal }: Props) => {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
};

export default BeforeLoginLayout;
