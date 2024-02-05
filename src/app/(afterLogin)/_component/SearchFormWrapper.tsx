"use client";

import { useSearchParams } from "next/navigation";
import SearchForm from "./SearchForm";

const SearchFormWrapper = () => {
  const searchParams = useSearchParams();
  return <SearchForm q={searchParams.get("q") || ""} />;
};

export default SearchFormWrapper;
