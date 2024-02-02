"use client";

import { useRouter } from "next/navigation";
import SearchSvg from "../_svg/SearchSvg";
import style from "./rightSearchForm.module.css";

type Props = {
  q?: string;
};

const SearchForm = ({ q }: Props) => {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${e.currentTarget.search.value}`);
  };

  return (
    <form className={style.search} onSubmit={onSubmit}>
      <SearchSvg />
      <input type="search" name="search" defaultValue={q || ""} />
    </form>
  );
};

export default SearchForm;
