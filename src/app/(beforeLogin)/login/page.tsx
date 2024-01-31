"use client";

import { useRouter } from "next/navigation";
import Main from "../_component/Main";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  // const { data: session } = useSession();

  // if (session?.user) {
  //   router.replace("/home");
  // }

  useEffect(() => {
    router.replace("/i/flow/login");
  }, []);

  return <Main />;
};

export default Login;
