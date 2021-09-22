import styles from '@/styles/pages/nha-dat-ban.module.scss'
import { IconClick, IconInfo, IconInvestPoint, IconShare, IconView } from "public/icons"
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MPost } from './../../models/post'

const PostListItem: React.FC<{ post: MPost }>=({post})=> {
  const {t:translation} = useTranslation();
   
  return (
    <>
        <a href="/">
            <h4>{post.title}</h4>
        </a>
        <div className={styles.post_summary}>
        <ul>
            <li> <IconView/> {post.viewCount} <span> {translation('realEstateForSale.viewCount')} </span> </li>
            <li> <IconShare/>  {post.shareCount} <span> {translation('realEstateForSale.shareCount')} </span> </li>
            <li> <IconClick/> {post.clickCount} <span> {translation('realEstateForSale.clickCount')} </span> </li>
            <li> <IconInfo /> <span> {translation('realEstateForSale.infomation')}</span> </li>
            <li> <IconInvestPoint /> <span>{translation('realEstateForSale.investment_point')}</span>  </li>
        </ul>
        </div>
        <div className={styles.detail_info}>
            <p>{post.description} </p>
        </div>
    </>
  )
}

export default PostListItem;