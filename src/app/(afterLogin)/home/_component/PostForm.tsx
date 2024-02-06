"use client";

import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import style from "./postForm.module.css";
import UploadSvg from "../../_svg/UploadSvg";
import { Session } from "@auth/core/types";

type Props = {
  me: Session | null;
};

const PostForm = ({ me }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("dsds");
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  return (
    <form className={style.postForm} onSubmit={onSubmit}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <img src={`${me?.user?.image!}`} alt={me?.user?.email || ""} />
        </div>
      </div>
      <div className={style.postInputSection}>
        <textarea
          value={content}
          onChange={onChange}
          placeholder="무슨 일이 일어나고 있나요?"
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
            <button
              className={style.actionButton}
              disabled={!content}
              type="submit"
            >
              게시하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
