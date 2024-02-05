import { ReactNode } from "react";
import style from "./search.module.css";
import BackButton from "../_component/BackButton";
import Tab from "./_component/Tab";
import SearchFormWrapper from "../_component/SearchFormWrapper";

type Props = {
  children: ReactNode;
};

const SearchLayout = ({ children }: Props) => {
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchFormWrapper />
          </div>
        </div>
        <Tab />
      </div>
      {children}
    </main>
  );
};

export default SearchLayout;
