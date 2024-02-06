"use client";

import style from "@/app/(beforeLogin)/_component/signup.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import BackButton from "./BackButton";
import { onSubmit } from "../_lib/signup";
import { useFormState, useFormStatus } from "react-dom";

const SignupModal = () => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const [state, formAction] = useFormState(onSubmit, {
    message: "",
  });
  const { pending } = useFormStatus();

  const pathname = usePathname();
  if (pathname !== "/i/flow/signup") {
    return null;
  }

  const modalOutSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      router.back();
    }
  };

  const showMessage = (messasge: string) => {
    if (messasge === "no_id") {
      idRef.current?.focus();
      return "아이디를 입력하세요.";
    }
    if (messasge === "no_name") {
      nameRef.current?.focus();
      return "닉네임을 입력하세요.";
    }
    if (messasge === "no_password") {
      pwRef.current?.focus();
      return "비밀번호를 입력하세요.";
    }
    if (messasge === "no_image") {
      return "이미지를 업로드하세요.";
    }
    if (messasge === "user_exist") {
      idRef.current?.focus();
      return "이미 사용 중인 아이디입니다.";
    }
    return messasge;
  };

  const setClassName = (label: string, message: string) => {
    if (label === "id") {
      if (message === "no_id" || message === "user_exist") {
        return `${style.inputLabel} ${style.errorLabel}`;
      } else return style.inputLabel;
    } else if (label === "name") {
      if (message === "no_name") {
        return `${style.inputLabel} ${style.errorLabel}`;
      } else return style.inputLabel;
    } else if (label === "pw") {
      if (message === "no_password") {
        return `${style.inputLabel} ${style.errorLabel}`;
      } else return style.inputLabel;
    } else if (label === "img") {
      if (message === "no_image") {
        return `${style.inputLabel} ${style.errorLabel}`;
      } else return style.inputLabel;
    }
  };

  // const onSubmit: FormEventHandler = (e) => {
  //   e.preventDefault();
  //   fetch("http://localhost:9090/api/users", {
  //     method: "post",
  //     body: JSON.stringify({
  //       id,
  //       nickname,
  //       image,
  //       password,
  //     }),
  //     credentials: "include",
  //   })
  //     .then((response: Response) => {
  //       console.log(response.status);
  //       if (response.status === 200) {
  //         router.replace("/home");
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  return (
    <>
      <div
        className={style.modalBackground}
        ref={modalRef}
        onClick={modalOutSideClick}
      >
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={formAction}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label
                  className={setClassName("id", state?.message!)}
                  htmlFor="id"
                >
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  ref={idRef}
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                  // pattern="\S(.*\S)?"
                />
              </div>
              <div className={style.inputDiv}>
                <label
                  className={setClassName("name", state?.message!)}
                  htmlFor="name"
                >
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
                  ref={nameRef}
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                  // pattern="\S(.*\S)?"
                />
              </div>
              <div className={style.inputDiv}>
                <label
                  className={setClassName("pw", state?.message!)}
                  htmlFor="password"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  ref={pwRef}
                  className={style.input}
                  type="password"
                  placeholder=""
                  required
                  // pattern="\S(.*\S)?"
                />
              </div>
              <div className={style.inputDiv}>
                <label
                  className={`${setClassName("img", state?.message!)} ${
                    style.inputProfileLabel
                  }`}
                  htmlFor="image"
                >
                  프로필
                </label>
                <input
                  id="image"
                  name="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className={style.error}>
              {showMessage(state?.message || "")}
            </div>
            <div className={style.modalFooter}>
              <button
                type="submit"
                className={style.actionButton}
                disabled={pending}
              >
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
