import React from "react";
import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
import { faker } from "@faker-js/faker";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
};

const Post = ({ noImage }: Props) => {
  const target = {
    postId: 1,
    User: {
      id: "elonmusk",
      nickname: "Elon Musk",
      image: "/yRsRRjGO.jpg",
    },
    content: "클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ",
    createdAt: new Date(),
    Images: [] as any[],
  };

  if (Math.random() < 0.5 && !noImage) {
    target.Images.push(
      { imageId: 1, link: "/zLogo.png" },
      { imageId: 2, link: "/favicon.png" },
      { imageId: 3, link: "/yRsRRjGO.jpg" },
      { imageId: 4, link: "/5Udwvqim.jpg" }
    );
  }
  const index = Math.floor(Math.random() * 3);

  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div className={style.postImageSection}>
            {target.Images && target.Images.length > 0 && (
              <Link
                href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[index].imageId}`}
                className={style.postImageSection}
              >
                <img src={target.Images[index].link} alt="" />
              </Link>
            )}
            {/* <PostImages post={target} /> */}
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
};

export default Post;
