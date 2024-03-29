"use client";

import style from "@/app/(beforeLogin)/_component/login.module.css";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import CloseSvg from "../_svg/CloseSvg";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  if (pathname !== "/i/flow/login") {
    return null;
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!id.trim()) {
      idRef.current?.focus();
      setMessage("아이디를 입력해주세요.");
      return;
    }

    if (!password) {
      pwRef.current?.focus();
      setMessage("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const res = await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      });
      if (res?.error === "CallbackRouteError") {
        idRef.current?.focus();
        setMessage("아이디가 존재하지 않습니다.");
      } else if (res?.error === "CredentialsSignin") {
        pwRef.current?.focus();
        setMessage("비밀번호가 일치하지 않습니다.");
      } else {
        alert("로그인 성공");
        router.replace("/home");
      }
    } catch (error) {
      setMessage("아이디 혹은 패스워드가 일치하지 않습니다.");
    }
  };

  const onClickClose = () => {
    router.back();
  };

  const modalOutSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      router.back();
    }
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const setClassName = (label: string, message: string) => {
    if (label === "id") {
      if (
        message === "아이디를 입력해주세요." ||
        message === "아이디가 존재하지 않습니다."
      ) {
        return `${style.inputLabel} ${style.errorLabel}`;
      } else return style.inputLabel;
    } else if (label === "pw") {
      if (
        message === "비밀번호가 일치하지 않습니다." ||
        message === "비밀번호를 입력해주세요."
      ) {
        return `${style.inputLabel} ${style.errorLabel}`;
      } else return style.inputLabel;
    }
  };

  return (
    <div
      className={style.modalBackground}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <button className={style.closeButton} onClick={onClickClose}>
            <CloseSvg />
          </button>
          <div>로그인하세요.</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={setClassName("id", message)} htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                className={style.input}
                value={id}
                ref={idRef}
                onChange={onChangeId}
                type="text"
                placeholder=""
                // required
              />
            </div>
            <div className={style.inputDiv}>
              <label className={setClassName("pw", message)} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className={style.input}
                value={password}
                ref={pwRef}
                onChange={onChangePassword}
                type="password"
                placeholder=""
                // required
              />
            </div>
          </div>
          <div className={style.message}>{message}</div>
          <div className={style.modalFooter}>
            <button className={style.actionButton}>로그인하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
