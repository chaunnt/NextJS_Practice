// libs
import React from "react";
import { useTranslation } from "react-i18next";
// others
import styles from "@/styles/pages/tra-cuu-so-dien-thoai.module.scss";
import { IconSearch } from "public/icons";

const HistorySearchForm = () => {
  const { t: translation } = useTranslation();
  return (
    <div className={styles.history}>
      <h4 className={styles.search_text}>
        {translation("realEstateForSale.recent-search")}
      </h4>
      <div className={styles.result}>
        <span className={styles.icon_search}>
          <IconSearch />
        </span>
        <span className={styles.result_text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </span>
      </div>
      <div className={styles.result}>
        <span className={styles.icon_search}>
          <IconSearch />
        </span>
        <span className={styles.result_text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </span>
      </div>
      <div className={styles.result}>
        <span className={styles.icon_search}>
          <IconSearch />
        </span>
        <span className={styles.result_text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </span>
      </div>
    </div>
  );
};

export default HistorySearchForm;
