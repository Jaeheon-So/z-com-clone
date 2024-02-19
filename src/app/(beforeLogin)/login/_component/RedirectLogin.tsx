"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectLogin = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/i/flow/login");
  }, []);

  return null;
};

export default RedirectLogin;
