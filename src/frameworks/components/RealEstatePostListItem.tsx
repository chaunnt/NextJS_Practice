import { MPostRealEstate } from '@/models/postRealEstate'
import styles from '@/styles/pages/nha-dat-ban.module.scss'
import React from 'react'
import PostListItem from './PostListItem'
import RealEstateAnalysisBar from './RealEstateAnalysisBar'

const Landing: React.FC<{ post: MPostRealEstate }>=({post})=> {
   
  return (
    <div className={styles.search_result_item} key={post.id}>
        <PostListItem post={post}/>
        <RealEstateAnalysisBar/>
    </div>
  )
}
    
export default Landing;