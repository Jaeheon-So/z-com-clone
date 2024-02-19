"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectAuth = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    console.log("hi", session?.user);
    if (session?.user) {
      router.push("/home");
    }
  }, []);

  return null;
};

export default RedirectAuth;
