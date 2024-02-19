"use client";

import { usePathname, useRouter } from "next/navigation";
import style from "./composeTweet.module.css";
import { ChangeEventHandler, useRef, useState } from "react";
import CloseSvg from "@/app/(beforeLogin)/_svg/CloseSvg";
import UploadSvg from "../_svg/UploadSvg";
import { useSession } from "next-auth/react";
import TextareaAutosize from "react-textarea-autosize";
import { useModalStore } from "@/store/modal";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Post } from "@/model/Post";
import { submitPost } from "../home/_lib/submitPost";
import Link from "next/link";
import { submitComment } from "../_lib/submitComment";

const ComposeTweetModal = () => {
  const { data: me } = useSession();
  const router = useRouter();
  const [content, setContent] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<
    Array<{ dataUrl: string; file: File }>
  >([]);
  const modalStore = useModalStore();
  const queryClient = useQueryClient();
  const parent = modalStore.data;

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
    onSettled() {
      router.back();
    },
  });

  const commentMutation = useMutation({
    mutationFn: submitComment,
    async onSuccess(newPost) {
      setContent("");
      setPreview([]);
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache
        .getAll()
        .map((cache) => cache.queryKey)
        .filter((key) => key[0] === "posts");

      queryKeys.forEach((queryKey) => {
        const value: Post | InfiniteData<Post[]> | undefined =
          queryClient.getQueryData(queryKey);
        if (value && "pages" in value) {
          const obj = value.pages
            .flat()
            .find((v) => v.postId === parent?.postId);
          if (obj) {
            // 존재는 하는지
            const pageIndex = value.pages.findIndex((page) =>
              page.includes(obj)
            );
            const index = value.pages[pageIndex].findIndex(
              (v) => v.postId === parent?.postId
            );
            const shallow = { ...value };
            value.pages = { ...value.pages };
            value.pages[pageIndex] = [...value.pages[pageIndex]];
            shallow.pages[pageIndex][index] = {
              ...shallow.pages[pageIndex][index],
              Comments: [{ userId: me?.user?.email as string }],
              _count: {
                ...shallow.pages[pageIndex][index]._count,
                Comments: shallow.pages[pageIndex][index]._count.Comments + 1,
              },
            };
            shallow.pages[0].unshift(newPost); // 새 답글 추가
            queryClient.setQueryData(queryKey, shallow);
          }
        } else if (value) {
          // 싱글 포스트인 경우
          if (value.postId === parent?.postId) {
            const shallow = {
              ...value,
              Comments: [{ userId: me?.user?.email as string }],
              _count: {
                ...value._count,
                Comments: value._count.Comments + 1,
              },
            };
            queryClient.setQueryData(queryKey, shallow);
          }
        }
      });
      await queryClient.invalidateQueries({
        queryKey: ["trends"],
      });
    },
    onError(error) {
      console.error(error);
      alert("업로드 중 에러가 발생했습니다.");
    },
    onSettled() {
      modalStore.reset();
      router.back();
    },
  });

  const pathname = usePathname();
  if (pathname !== "/compose/tweet") {
    return null;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("content", content);
    preview.forEach((p) => {
      formData.append("images", p.file);
    });

    if (modalStore.mode === "new") {
      return postFormMutation.mutate(formData);
    } else {
      return commentMutation.mutate({ formData, postId: parent?.postId });
    }
  };

  const onClickClose = () => {
    modalStore.reset();
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  };

  const modalOutSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      router.back();
    }
  };

  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
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
          {modalStore.mode === "comment" && parent && (
            <div className={style.modalOriginal}>
              <div className={style.postUserSection}>
                <div className={style.postUserImage}>
                  <img src={parent.User.image} alt={parent.User.id} />
                </div>
              </div>
              <div>
                {parent.content}
                <div>
                  <Link
                    href={`/${parent.User.id}`}
                    style={{ color: "rgb(29, 155, 240)" }}
                  >
                    @{parent.User.id}
                  </Link>{" "}
                  님에게 보내는 답글
                </div>
              </div>
            </div>
          )}
          <div className={style.modalBody}>
            <div className={style.postUserSection}>
              <div className={style.postUserImage}>
                <img src={`${me?.user?.image!}`} alt={me?.user?.email || ""} />
              </div>
            </div>
            <div className={style.inputDiv}>
              <TextareaAutosize
                className={style.input}
                placeholder={
                  modalStore.mode === "comment"
                    ? "답글 게시하기"
                    : "무슨 일이 일어나고 있나요?"
                }
                value={content}
                onChange={onChangeContent}
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
