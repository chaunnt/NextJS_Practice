// libs
import React from "react";
// components
import FormPhoneNumberLookup from "./FormPhoneNumberLookup";
import HistorySearchForm from "./HistorySearchForm";
// others
import styles from "@/styles/pages/tra-cuu-so-dien-thoai.module.scss";

const PhoneNumberLookup = () => {
  return (
    <div className={styles.form_phone_number_wrapper}>
      <div className={styles.form_phone_number_wrapper_inner}>
        <FormPhoneNumberLookup />
        <HistorySearchForm />
      </div>
    </div>
  );
};

export default PhoneNumberLookup;
