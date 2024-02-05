"use client";

import style from "./navMenu.module.css";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import HomeSvg from "../_svg/HomeSvg";
import ExploreSvg from "../_svg/ExploreSvg";
import MessageSvg from "../_svg/MessageSvg";
import ProfileSvg from "../_svg/ProfileSvg";
import PostSvg from "../_svg/PostSvg";
import { useSession } from "next-auth/react";

const NavMenu = () => {
  const { data: me } = useSession();
  const segment = useSelectedLayoutSegment();

  const navMenuData = [
    {
      id: "menu1",
      name: "홈",
      path: "/home",
      segment: ["home"],
      svg: <HomeSvg active={false} />,
      activeSvg: <HomeSvg active={true} />,
    },
    {
      id: "menu2",
      name: "탐색하기",
      path: "/explore",
      segment: ["explore", "search"],
      svg: <ExploreSvg active={false} />,
      activeSvg: <ExploreSvg active={true} />,
    },
    {
      id: "menu3",
      name: "쪽지",
      path: "/messages",
      segment: ["messages"],
      svg: <MessageSvg active={false} />,
      activeSvg: <MessageSvg active={true} />,
    },
    {
      id: "menu4",
      name: "프로필",
      path: `/${me?.user?.email}`,
      segment: [me?.user?.email],
      svg: <ProfileSvg active={false} />,
      activeSvg: <ProfileSvg active={true} />,
    },
  ];

  return (
    <nav>
      <ul>
        {navMenuData.map((menu) => (
          <li key={menu.id}>
            <Link href={menu.path}>
              <div className={style.navPill}>
                {menu.segment.includes(segment as string)
                  ? menu.activeSvg
                  : menu.svg}
                <div
                  style={
                    menu.segment.includes(segment as string)
                      ? { fontWeight: "bold" }
                      : {}
                  }
                >
                  {menu.name}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/compose/tweet" className={style.postButton}>
        <span>게시하기</span>
        <PostSvg />
      </Link>
    </nav>
  );
};

export default NavMenu;
