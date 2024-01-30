"use server";

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

    if (response.status === 200) shouldRedirect = true;
  } catch (error: any) {
    console.log("여기는 catch", error.response);

    if (error.response?.status === 403) return { message: "user_exists" };
    return { message: "서버 에러 발생" };
  }

  if (shouldRedirect) redirect("/home");
};
