import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, setUser } from '../redux/slices/userSlice'
import { useTranslation } from 'react-i18next'
import { MPostRealEstate } from '@/models/postRealEstate'
import BaseLogo from '@/components/Logo'
import BaseSearchBox from '@/components/SearchBox'

export default function Landing(props: MPostRealEstate) {
  const { t: translation } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector(getUser)

  useEffect(() => {
    dispatch(
      setUser({
        id: 1,
        username: 'benja',
      })
    )
  })

  return (
    <>
      <BaseLogo customClass=""></BaseLogo>
      <BaseSearchBox placeholder={translation("baseSearchBox.placeHolder.timNhuTheNao")} />
    </>
  )
}
