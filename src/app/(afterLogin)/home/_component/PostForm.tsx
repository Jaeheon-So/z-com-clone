"use client";

import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import style from "./postForm.module.css";
import UploadSvg from "../../_svg/UploadSvg";
import { Session } from "@auth/core/types";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  me: Session | null;
};

const PostForm = ({ me }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("dsds");
  };

  const onUploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    if (e.target.files) {
      if (e.target.files.length + preview.length > 4)
        return alert("사진은 최대 4개까지 등록 가능합니다.");

      Array.from(e.target.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview((prevPreview) => {
            const prev = [...prevPreview];
            prev.push({
              dataUrl: reader.result as string,
              file,
            });
            return prev;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const onRemoveImage = (index: number) => () => {
    setPreview((prevPreview) => {
      const prev = [...prevPreview];
      prev.splice(index, 1);
      return prev;
    });
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
        <TextareaAutosize
          value={content}
          onChange={onChange}
          placeholder="무슨 일이 일어나고 있나요?"
        />
        <div style={{ display: "flex" }}>
          {preview.map(
            (v, index) =>
              v && (
                <div
                  key={index}
                  style={{ flex: 1, cursor: "pointer" }}
                  onClick={onRemoveImage(index)}
                >
                  <img
                    src={v.dataUrl}
                    alt="미리보기"
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      maxHeight: 100,
                    }}
                  />
                </div>
              )
          )}
        </div>
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input
                type="file"
                name="imageFiles"
                multiple
                hidden
                ref={imageRef}
                onChange={onUploadImage}
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
