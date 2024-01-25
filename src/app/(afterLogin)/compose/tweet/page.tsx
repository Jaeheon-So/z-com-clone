import React from "react";
import HomePage from "@/app/(afterLogin)/home/page";
import ComposeTweetModal from "../../_component/ComposeTweetModal";

const ComposeTweetPage = () => {
  return (
    <>
      <HomePage />
      <ComposeTweetModal />
    </>
  );
};

export default ComposeTweetPage;
