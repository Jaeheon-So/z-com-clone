import React from "react";
import SearchSvg from "../_svg/SearchSvg";
import style from "./rightSearchForm.module.css";

const SearchForm = () => {
  return (
    <form className={style.search}>
      <SearchSvg />
      <input type="search" />
    </form>
  );
};

export default SearchForm;
