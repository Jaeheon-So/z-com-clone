"use client";

import { ReactNode, useRef } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  post: {
    postId: number;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    content: string;
    createdAt: Date;
    Images: any[];
  };
};

const PostArticle = ({ children, post }: Props) => {
  const router = useRouter();
  const articleRef = useRef<HTMLDivElement>(null);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(`${post.User.id}/status/${post.postId}`);
  };

  return (
    <article className={style.post} onClickCapture={onClick} ref={articleRef}>
      {children}
    </article>
  );
};

export default PostArticle;
