import React, { useEffect } from 'react'
import DefaultLayout from 'src/frameworks/layouts/default'
import { useTranslation } from 'react-i18next'
import styles from '@/styles/pages/home.module.scss'

export default function Landing(props: any) {
  const { t:translation } = useTranslation()

  return (
    <DefaultLayout>
      <h1>{translation('Home')}</h1>
    </DefaultLayout>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {},
  }
}
