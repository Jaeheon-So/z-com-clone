"use client";

import { useRouter } from "next/navigation";
import Main from "../_component/Main";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/i/flow/login");
  }, []);

  return <Main />;
};

export default Login;
