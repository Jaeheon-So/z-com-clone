"use client";

import React, { useEffect, useState } from "react";
import SearchSvg from "../_svg/SearchSvg";
// import style from "@/app/(afterLogin)/layout.module.css";
import style from "./rightSearchForm.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchForm from "./SearchForm";

const RightSearchForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("all");

  const onChangeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    setFilter("all");
    newSearchParams.delete("pf");
    router.push(`/search?${newSearchParams.toString()}`);
  };

  const onChangeFollow = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    setFilter("fol");
    newSearchParams.set("pf", "on");
    router.push(`/search?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    if (!searchParams.get("pf")) setFilter("all");
    else setFilter("fol");
  }, [searchParams]);

  if (pathname === "/explore") {
    return null;
  }

  if (pathname === "/search") {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <div>모든 사용자</div>
              <input
                type="radio"
                name="pf"
                value="all"
                checked={filter === "all"}
                onChange={onChangeAll}
              />
            </div>
            <div className={style.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input
                type="radio"
                name="pf"
                value="fol"
                checked={filter === "fol"}
                onChange={onChangeFollow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  );
};

export default RightSearchForm;
