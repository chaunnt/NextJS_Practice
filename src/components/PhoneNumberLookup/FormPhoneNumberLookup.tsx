// libs
import React from "react";
import { useTranslation } from "react-i18next";
// others
import styles from "@/styles/pages/tra-cuu-so-dien-thoai.module.scss";
import { IconSearch } from "public/icons";

const FormPhoneNumberLookup = () => {
  const { t: translation } = useTranslation();
  return (
    <form>
      <div className="input-group">
        <select
          className={styles.form_select}
          id="inputGroupSelect04"
          aria-label="Example select with button addon"
        >
          <option selected>
            {translation("realEstateForSale.province/city")}
          </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="input-group">
        <select
          className={styles.form_select}
          id="inputGroupSelect04"
          aria-label="Example select with button addon"
        >
          <option selected>{translation("realEstateForSale.district")}</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="input-group">
        <select
          className={styles.form_select}
          id="inputGroupSelect04"
          aria-label="Example select with button addon"
        >
          <option selected>{translation("realEstateForSale.wards")}</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="input-group">
        <select
          className={styles.form_select}
          id="inputGroupSelect04"
          aria-label="Example select with button addon"
        >
          <option selected>
            {translation("realEstateForSale.lending-partner")}
          </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div className={styles.search}>
        <button className={styles.btn_delete}>
          {translation("realEstateForSale.clear-filter")}
        </button>
        <button className={styles.btn_search}>
          <IconSearch />
          <span style={{ marginLeft: "5px" }}>
            {translation("realEstateForSale.search")}
          </span>
        </button>
      </div>
    </form>
  );
};

export default FormPhoneNumberLookup;
