import { ReactNode } from "react";
import style from "@/app/(afterLogin)/layout.module.css";
import Link from "next/link";
import Image from "next/image";
import zLogo from "../../../public/zlogo.png";
import NavMenu from "./_component/NavMenu";
import SearchSvg from "./_svg/SearchSvg";
import LogoutButton from "./_component/LogoutButton";
import TrendSection from "./_component/TrendSection";

type Props = {
  children: ReactNode;
};

const AfterLoginLayout = ({ children }: Props) => (
  <div className={style.container}>
    <header className={style.leftSectionWrapper}>
      <section className={style.leftSection}>
        <div className={style.leftSectionFixed}>
          <Link className={style.logo} href="/home">
            <div className={style.logoPill}>
              <Image src={zLogo} alt="logo" width={40} height={40} />
            </div>
          </Link>
          <NavMenu />
          <LogoutButton />
        </div>
      </section>
    </header>
    <div className={style.rightSectionWrapper}>
      <div className={style.rightSectionInner}>
        <main className={style.main}>{children}</main>
        <section className={style.rightSection}>
          <div style={{ marginBottom: 60, width: "inherit" }}>
            <form className={style.search}>
              <SearchSvg />
              <input type="search" />
            </form>
          </div>
          <TrendSection />
          <div className={style.followRecommend}>
            <h3>팔로우 추천</h3>
            {/* <FollowRecommend /> */}
            {/* <FollowRecommend /> */}
            {/* <FollowRecommend /> */}
          </div>
        </section>
      </div>
    </div>
  </div>
);

export default AfterLoginLayout;
