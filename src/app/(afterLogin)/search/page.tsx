import React from "react";
import style from "./search.module.css";
import Post from "../_component/Post";
import BackButton from "../_component/BackButton";
import SearchForm from "../_component/SearchForm";
import Tab from "./_component/Tab";
import SearchResult from "./_component/SearchResult";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

const SearchPage = ({ searchParams }: Props) => {
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  );
};

export default SearchPage;
