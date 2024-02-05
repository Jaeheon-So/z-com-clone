import React, { ReactNode } from "react";
import { TabProvider } from "./_component/TabProvider";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <TabProvider>
      <Tab />
      <PostForm />
      {children}
    </TabProvider>
  );
};

export default layout;
