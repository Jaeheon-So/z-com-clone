import { ReactNode } from "react";
import style from "./explore.module.css";
import SearchForm from "../_component/SearchForm";

type Props = {
  children: ReactNode;
};

const ExploreLayOut = ({ children }: Props) => {
  return (
    <main className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        {children}
      </div>
    </main>
  );
};

export default ExploreLayOut;