"use client";

import { ReactNode, useRef } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";
import { Post } from "@/model/Post";

type Props = {
  children: ReactNode;
  post: Post;
};

const PostArticle = ({ children, post }: Props) => {
  const router = useRouter();
  const articleRef = useRef<HTMLDivElement>(null);
  let target = post;

  if (post.Original) {
    target = post.Original;
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/${target.User.id}/status/${target.postId}`);
  };

  return (
    <article className={style.post} onClick={onClick} ref={articleRef}>
      {children}
    </article>
  );
};

export default PostArticle;
