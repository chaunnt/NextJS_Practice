import React, { useEffect } from 'react'
import DefaultLayout from '@/layouts/default'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, setUser } from '../redux/slices/userSlice'
import { useTranslation } from 'react-i18next'
import { Post } from '@/models/post'
import { add } from '../api/index'
import Logo from '@/components/logo'
import Search from '@/components/search'


export default function Landing(props: Post) {
  const { metadata, allCount, resultData } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  // console.log(user, 'example for redux')
  // console.log(metadata, allCount, resultData, 'Model example')
  
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
      <Logo></Logo>
      <Search placeholder="Bạn đang tìm kiếm bất động sản như thế nào?" />
    </DefaultLayout>
  )
}

export const getServerSideProps = async () => {
  const path = `/RealEstateRecord/getLanguageMeta`;
  const getLanguageMeta: any = await add(path, [])
    .then((res: any) => {
      console.log('res : ', res);
      return res.data.Language.values;
    })
  return {
    props: {
      LangList: getLanguageMeta
    }, // will be passed to the page component as props
  }
}

// export async function getServerSideProps(context: any) {
//   const { query = {} } = context
//   const filter = {
//     ...query,
//     skip: 0,
//     limit: 20,
//   }
//   const result: any = await fetchPost(filter)
//   const newData = result.data

//   return {
//     props: newData,
//   }
// }
