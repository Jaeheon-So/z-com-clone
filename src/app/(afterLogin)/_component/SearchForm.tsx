import React from "react";
import SearchSvg from "../_svg/SearchSvg";
import style from "./rightSearchForm.module.css";

type Props = {
  q?: string;
};

const SearchForm = ({ q }: Props) => {
  return (
    <form className={style.search}>
      <SearchSvg />
      <input type="search" defaultValue={q || ""} />
    </form>
  );
};

export default SearchForm;
