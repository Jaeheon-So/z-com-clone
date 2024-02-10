"use client";

import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import style from "../photoModal.module.css";
import { useQuery } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";

type Props = {
  id: string;
};

const ImageZone = ({ id }: Props) => {
  const { data: post } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, Props["id"]]
  >({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  return (
    <div className={style.imageZone}>
      <img src={post?.Images[0].link} alt={post?.content} />
      <div
        className={style.image}
        style={{ backgroundImage: `url(${post?.Images[0].link})` }}
      />
      <div className={style.buttonZone}>
        <div className={style.buttonInner}>
          <ActionButtons white={true} post={post!} />
        </div>
      </div>
    </div>
  );
};

export default ImageZone;
