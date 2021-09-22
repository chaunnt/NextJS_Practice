import React, { useEffect } from 'react'
import DefaultLayout from 'src/frameworks/layouts/default'
import { useTranslation } from 'react-i18next'
import RealEstateService from '@/services/realEstate'
import { MPostRealEstate } from '@/models/postRealEstate'

export default function Landing(props: MPostRealEstate) {
  const { t } = useTranslation()

  return (
    <DefaultLayout>

    </DefaultLayout>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {},
  }
}
