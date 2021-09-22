// libs
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
// components
import DefaultLayout from "src/frameworks/layouts/default";
import PhoneNumberLookup from "src/components/PhoneNumberLookup";
// others
import RealEstateService from "@/services/realEstate";
import { MPostRealEstate } from "@/models/postRealEstate";

interface PhoneNumberLookupProps {}

const PagePhoneNumberLookup: React.FC<PhoneNumberLookupProps> = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <PhoneNumberLookup />
    </DefaultLayout>
  );
};

export const getServerSideProps = async (context: any) => {
  return {
    props: {},
  };
};

export default PagePhoneNumberLookup;
