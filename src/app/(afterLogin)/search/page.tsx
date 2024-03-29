import style from "./search.module.css";
import SearchResult from "./_component/SearchResult";
import { Suspense } from "react";
import Loading from "../_component/Loading";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: `${searchParams.q} - 검색 / Z`,
    description: `${searchParams.q} - 검색 / Z`,
  };
}

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

const SearchPage = ({ searchParams }: Props) => {
  return (
    <div className={style.list}>
      <Suspense fallback={<Loading />}>
        <SearchResult searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
