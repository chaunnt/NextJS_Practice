import styles from '@/styles/pages/nha-dat-ban.module.scss'
import { IconPhone, IconEmail, IconMessage, IconShare, IconView } from "public/icons"
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
            <li> 
              <IconView className={styles.icon_summary}/> 
              {post.viewCount} 
              <span> {translation('realEstateForSale.viewCount')} </span> 
            </li>
            <li>
               <IconShare className={styles.icon_summary}/> 
                {post.shareCount}
                <span> {translation('realEstateForSale.shareCount')} </span> 
            </li>
            <li>
               <IconPhone className={styles.icon_summary}/>
               {post.phoneCallCount} 
               <span> {translation('realEstateForSale.phoneCallCount')} </span>
            </li>
            <li>
              <IconMessage className={styles.icon_summary} />
              {post.messageCallCount} 
              <span> {translation('realEstateForSale.messageCallCount')}</span>
            </li>
            <li>
              <IconEmail className={styles.icon_summary} />
              {post.emailCount} 
              <span>{translation('realEstateForSale.emailCount')}</span> 
            </li>
        </ul>
        </div>
        <div className={styles.detail_info}>
            <p>
              <span className={styles.dateTime}>
                 {new Date(post.updatedAt)
                  .toLocaleString('en',{
                  year:"numeric",
                  month:"short",
                  day:"numeric",
                  })
                  } 
                  &nbsp; - &nbsp;
              </span>
              {post.description} </p>
        </div>
    </>
  )
}

export default PostListItem;