import RealEstatePostListItem from '@/components/RealEstatePostListItem'
import { MPostRealEstate } from '@/models/postRealEstate'
import RealEstateService from '@/services/realEstate'
import styles from '@/styles/pages/nha-dat-ban.module.scss'
import React from 'react'
import DefaultLayout from 'src/frameworks/layouts/default'

const Landing: React.FC<{ postList: MPostRealEstate[] }>=({postList})=> {

  const listSearchResults= postList.map(post=><RealEstatePostListItem post={post} key={post.id}/>)
   
  return (
    <DefaultLayout>
      <div className={styles.home_container}>
          <div className={styles.search_result}>
            {listSearchResults}
          </div>
      </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps(context: any) {
  const {query = {}} = context

  //TODO: this is demo data, remove later
  const filter = {
    "syt_spt": "Rao bán",
    "ar_cn": "VI",
    "ar_dn": "Quận Gò Vấp",
    "ar_pn": "Thành phố Hồ Chí Minh",
    "ar_tn": "Nhà phố"
  };
  
  const result: any = await RealEstateService.getPostListByArea(filter, 0)

  return {
    props:{
      postList:result
    },
  }
}

export default Landing;