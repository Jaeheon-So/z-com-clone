import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";
import React from "react";
import RepostSvg from "../_svg/RepostSvg";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  post: Post;
  noImage?: boolean;
};

const Post = ({ noImage, post }: Props) => {
  let target = post;

  if (post.Original) {
    target = post.Original;
  }

  const stopPropagation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <PostArticle post={target}>
      {post.Original && (
        <div className={style.postReposted}>
          <RepostSvg />
          재게시했습니다
        </div>
      )}
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link
            href={`/${target.User.id}`}
            className={style.postUserImage}
            onClick={stopPropagation}
          >
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`} onClick={stopPropagation}>
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
            {!noImage && <PostImages post={target} />}
          </div>
          <ActionButtons post={post} />
        </div>
      </div>
    </PostArticle>
  );
};

export default Post;
