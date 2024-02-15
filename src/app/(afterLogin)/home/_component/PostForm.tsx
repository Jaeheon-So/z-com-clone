"use client";

import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import style from "./postForm.module.css";
import UploadSvg from "../../_svg/UploadSvg";
import { Session } from "@auth/core/types";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/model/Post";
import { submitPost } from "../_lib/submitPost";

type Props = {
  me: Session | null;
};

const PostForm = ({ me }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<
    Array<{ dataUrl: string; file: File }>
  >([]);
  const queryClient = useQueryClient();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("content", content);
    preview.forEach((p) => {
      formData.append("images", p.file);
    });

    return postFormMutation.mutate(formData);
  };

  const postFormMutation = useMutation({
    mutationFn: submitPost,
    async onSuccess(response) {
      const newPost = response;
      setContent("");
      setPreview([]);
      if (queryClient.getQueryData(["posts", "recommends"])) {
        queryClient.setQueryData(
          ["posts", "recommends"],
          (prevData: { pages: Post[][] }) => {
            const shallow = {
              ...prevData,
              pages: [...prevData.pages],
            };
            shallow.pages[0] = [...shallow.pages[0]];
            shallow.pages[0].unshift(newPost);
            return shallow;
          }
        );
      }
      // queryClient.invalidateQueries({
      //   queryKey: ["posts", "recommends"],
      // });
      if (queryClient.getQueryData(["posts", "followings"])) {
        queryClient.setQueryData(
          ["posts", "followings"],
          (prevData: { pages: Post[][] }) => {
            const shallow = {
              ...prevData,
              pages: [...prevData.pages],
            };
            shallow.pages[0] = [...shallow.pages[0]];
            shallow.pages[0].unshift(newPost);
            return shallow;
          }
        );
      }
      // queryClient.invalidateQueries({
      //   queryKey: ["posts", "followings"],
      // });
      await queryClient.invalidateQueries({
        queryKey: ["trends"],
      });
    },
    onError(error) {
      console.error(error);
      alert("업로드 중 에러가 발생했습니다.");
    },
  });

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
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
