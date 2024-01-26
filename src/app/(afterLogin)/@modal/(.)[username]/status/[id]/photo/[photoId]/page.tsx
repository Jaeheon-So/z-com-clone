"use client";

import Post from "@/app/(afterLogin)/_component/Post";
import style from "./photoModal.module.css";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import { usePathname } from "next/navigation";

const PhotoModalPage = () => {
  const pathname = usePathname();
  if (!pathname.includes("/photo/")) {
    return null;
  }

  const photo = {
    imageId: 1,
    link: "/zlogo.png",
    Post: {
      content: "임시 글귀!!",
    },
  };

  return (
    <div className={style.container}>
      <PhotoModalCloseButton />
      <div className={style.imageZone}>
        <img src={photo.link} alt={photo.Post?.content} />
        <div
          className={style.image}
          style={{ backgroundImage: `url(${photo.link})` }}
        />
        <div className={style.buttonZone}>
          <div className={style.buttonInner}>
            <ActionButtons white={true} />
          </div>
        </div>
      </div>
      <div className={style.commentZone}>
        <Post noImage />
        <CommentForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default PhotoModalPage;
