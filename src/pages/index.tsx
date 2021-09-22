import React, { useEffect } from 'react'
import DefaultLayout from '@/layouts/default'
import { Button } from '../common/components/Button'
import { Text } from '../common/components/Text'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, setUser } from '../redux/slices/userSlice'
import { useTranslation } from 'react-i18next'
import { fetchPost } from '../api/post'
import { Post } from '@/models/post'
import styles from '@/styles/pages/home.module.scss'

export default function Landing(props: Post) {
  const {metadata, allCount, resultData} = props
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  console.log(user, 'example for redux')
  console.log(metadata, allCount, resultData, 'Model example')
  useEffect(() => {
    dispatch(
      setUser({
        id: 1,
        username: 'benja',
      })
    )
  })

  return (
    <DefaultLayout>
      <h1 className={styles.title}>{t('home.title')}</h1>
      <Button size="md">{t('home.filter')}</Button>
      <Text>{t('home.content')}</Text>
    </DefaultLayout>
  )
}

export async function getServerSideProps(context: any) {
  const {query = {}} = context

  const filter = {
    ...query,
    skip: 0,
    limit: 20,
  }
  const result: any = await fetchPost(filter)
  const newData = result.data

  return {
    props: newData,
  }
}
