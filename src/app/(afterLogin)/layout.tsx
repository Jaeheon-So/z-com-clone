import { ReactNode } from "react";
import style from "@/app/(afterLogin)/layout.module.css";
import Link from "next/link";
import Image from "next/image";
import zLogo from "../../../public/zlogo.png";
import NavMenu from "./_component/NavMenu";
import LogoutButton from "./_component/LogoutButton";
import RightSearchForm from "./_component/RightSearchForm";
import { auth } from "@/auth";
import RQProvider from "./_component/RQProvider";
import TrendSectionBg from "./_component/TrendSectionBg";
import FollowRecommendWrapper from "./_component/FollowRecommendWrapper";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const AfterLoginLayout = async ({ children, modal }: Props) => {
  const session = await auth();

  return (
    <RQProvider>
      <div className={style.container}>
        <header className={style.leftSectionWrapper}>
          <section className={style.leftSection}>
            <div className={style.leftSectionFixed}>
              <Link className={style.logo} href={session?.user ? "/home" : "/"}>
                <div className={style.logoPill}>
                  <Image src={zLogo} alt="logo" width={40} height={40} />
                </div>
              </Link>
              {session?.user && <NavMenu />}
              <LogoutButton me={session} />
            </div>
          </section>
        </header>
        <div className={style.rightSectionWrapper}>
          <div className={style.rightSectionInner}>
            <main className={style.main}>{children}</main>
            <section className={style.rightSection}>
              <RightSearchForm />
              {session?.user && <TrendSectionBg />}
              <div className={style.followRecommend}>
                <FollowRecommendWrapper />
              </div>
            </section>
          </div>
        </div>
        {modal}
      </div>
    </RQProvider>
  );
};

export default AfterLoginLayout;
