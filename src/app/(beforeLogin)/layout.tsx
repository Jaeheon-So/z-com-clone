import React, { ReactNode } from "react";
import styles from "@/app/(beforeLogin)/_component/main.module.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const BeforeLoginLayout = async ({ children, modal }: Props) => {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
};

export default BeforeLoginLayout;
