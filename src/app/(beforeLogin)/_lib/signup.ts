"use server";

import { signIn } from "@/auth";
import axios from "axios";
import { redirect } from "next/navigation";

export const onSubmit = async (prevState: any, formData: FormData) => {
  if (!formData.get("id") || !(formData.get("id") as string).trim()) {
    return { message: "no_id" };
  }

  if (!formData.get("name") || !(formData.get("name") as string).trim()) {
    return { message: "no_name" };
  }

  if (
    !formData.get("password") ||
    !(formData.get("password") as string).trim()
  ) {
    return { message: "no_password" };
  }

  if (!formData.get("image")) {
    return { message: "no_image" };
  }
  formData.set("nickname", formData.get("name") as string);
  let shouldRedirect = false;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      formData,
      { withCredentials: true }
    );

    if (response.status === 403) {
      return { message: "user_exists" };
    }

    if (response.status === 201) {
      shouldRedirect = true;
      await signIn("credentials", {
        username: formData.get("id"),
        password: formData.get("password"),
        redirect: false,
      });
    }
  } catch (error: any) {
    if (error.response?.status === 403) return { message: "user_exist" };
    return { message: "서버 에러 발생" };
  }

  if (shouldRedirect) redirect("/home");
};
