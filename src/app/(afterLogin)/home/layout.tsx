import React, { ReactNode } from "react";
import { TabProvider } from "./_component/TabProvider";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import { auth } from "@/auth";

type Props = {
  children: ReactNode;
};

const HomeLayout = async ({ children }: Props) => {
  const session = await auth();

  return (
    <TabProvider>
      <Tab />
      <PostForm me={session} />
      {children}
    </TabProvider>
  );
};

export default HomeLayout;
