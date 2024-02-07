"use client";

import { useRouter } from "next/navigation";
import SearchSvg from "../_svg/SearchSvg";
import style from "./rightSearchForm.module.css";
import { useEffect, useState } from "react";

type Props = {
  q?: string;
};

const SearchForm = ({ q }: Props) => {
  const router = useRouter();
  const [input, setInput] = useState(q);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/search?q=${encodeURIComponent(e.currentTarget.search.value)}`
    );
  };

  useEffect(() => {
    setInput(q);
  }, [q]);

  return (
    <form className={style.search} onSubmit={onSubmit}>
      <SearchSvg />
      <input
        type="search"
        name="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
