"use client";

import React, { ReactNode, createContext, useState } from "react";

export type TabContextValueType = {
  tab: string;
  setTab: (value: string) => void;
};

export const TabContext = createContext<TabContextValueType | null>(null);

type Props = {
  children: ReactNode;
};

export const TabProvider = ({ children }: Props) => {
  const [tab, setTab] = useState("rec");

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
};
