import { redirect } from "next/navigation";

const InterceptRedirectLoginPage = () => {
  redirect("/i/flow/login");
};

export default InterceptRedirectLoginPage;
