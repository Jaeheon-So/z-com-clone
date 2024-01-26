"use client";

import { usePathname, useRouter } from "next/navigation";
import style from "./composeTweet.module.css";
import { useRef, useState } from "react";
import CloseSvg from "@/app/(beforeLogin)/_svg/CloseSvg";
import UploadSvg from "../_svg/UploadSvg";

const ComposeTweetModal = () => {
  const router = useRouter();
  const [content, setContent] = useState();
  const imageRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  if (pathname !== "/compose/tweet") {
    return null;
  }

  const onSubmit = () => {};

  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  };

  const modalOutSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      router.back();
    }
  };

  const onClickButton = () => {};

  const onChangeContent = () => {};

  const me = {
    id: "thwogjs98",
    image: "/5Udwvqim.jpg",
  };

  return (
    <div
      className={style.modalBackground}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div className={style.modal}>
        <button className={style.closeButton} onClick={onClickClose}>
          <CloseSvg />
        </button>
        <form className={style.modalForm} onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.postUserSection}>
              <div className={style.postUserImage}>
                <img src={me.image} alt={me.id} />
              </div>
            </div>
            <div className={style.inputDiv}>
              <textarea
                className={style.input}
                placeholder="무슨 일이 일어나고 있나요?"
                value={content}
                onChange={onChangeContent}
              />
            </div>
          </div>
          <div className={style.modalFooter}>
            <div className={style.modalDivider} />
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
                게시하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeTweetModal;
