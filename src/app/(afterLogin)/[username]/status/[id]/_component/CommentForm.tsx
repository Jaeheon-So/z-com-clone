"use client";

import { useRef, useState } from "react";
import style from "./commentForm.module.css";
import UploadSvg from "@/app/(afterLogin)/_svg/UploadSvg";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type Props = {
  id: string;
};

const CommentForm = ({ id }: Props) => {
  const { data: me } = useSession();
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["posts", id]);
  const [content, setContent] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);

  const onClickButton = () => {};

  const onSubmit = () => {};

  const onChange = () => {};

  if (!post) {
    return null;
  }

  return (
    <form className={style.postForm} onSubmit={onSubmit}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <img src={`/${me?.user?.image!}`} alt={me?.user?.email || ""} />
        </div>
      </div>
      <div className={style.postInputSection}>
        <textarea
          value={content}
          onChange={onChange}
          placeholder="답글 게시하기"
        />
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input
                type="file"
                name="imageFiles"
                multiple
                hidden
                ref={imageRef}
              />
              <button
                className={style.uploadButton}
                type="button"
                onClick={onClickButton}
              >
                <UploadSvg />
              </button>
            </div>
            <button className={style.actionButton} disabled={!content}>
              답글
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
