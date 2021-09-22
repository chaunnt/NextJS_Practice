import React from 'react'
import { useTranslation } from 'react-i18next'
import { getPosts } from '@/api/posts'
import { Post } from '@/models/post'
import HomeLayout from '@/layouts/home'
import Swal from 'sweetalert2'
import { Container, Image, ListGroup } from 'react-bootstrap'
import { CONFIGURATION } from '@/constants/configuration'
import Posts from '@/components/posts'
import Link from 'next/link'


export default function Landing(props: Post) {
  const {metadata, allCount, resultData} = props
  const {t} = useTranslation()
  console.log(props)
  if (props.error) {
    Swal.fire('Oops...', t(props.error) || 'API Error', 'error')
  }

  return (
    <HomeLayout>
      <section className="section-sorting">
        <Container className="d-none d-md-block">
          <div className="container__inner d-flex justify-content-between align-items-center">
            <div className="left">
              {t('home.sorting.found')} {allCount} {t('home.sorting.results')}
            </div>
            <div className="right">
              <span>{t('home.sorting.orderBy')}</span>
              <span></span>
            </div>
          </div>
        </Container>
      </section>
      <section className="section-pagination-top d-none d-md-block">
        <Container className="d-none d-md-block">
          <div className="container__inner d-flex align-items-center">
            <div className="pagination">
              <Image src="/icons/arrow-left.svg" className="nav-arrow nav-arrow-prev" width="5" />
              <span className="text-capitalize">{t('pagination.page')} 1</span>
              <Image src="/icons/arrow-right.svg" className="nav-arrow nav-arrow-next" width="5" />
            </div>
            <div className="separator"></div>
            <div className="display">
              <span>{t('pagination.display')} {CONFIGURATION.POSTS_PER_PAGE} {t('pagination.on')} {allCount} {t('pagination.results')}</span>
            </div>
          </div>
        </Container>
      </section>
      <section className="section-posts">
        <Posts className="d-md-none" data={resultData}></Posts>
        <Container className="d-none d-md-block">
          <div className="container__inner">
            <Posts data={resultData}></Posts>
          </div>
        </Container>
      </section>
      <section className="section-pagination-bottom d-none d-md-block">
        <Container>
          <div className="container__inner d-flex justify-content-between align-items-center">
            <div className="left">
              <span className="text-capitalize">{t('pagination.page')}</span>
              <span className="active-page">1</span>
              <span>{t('pagination.on')} {t('pagination.allCount')} {} {t('pagination.page')}</span>
            </div>
            <div className="right">
              <Link href=""><a className="btn-page btn-page-prev">{t('pagination.prev')}</a></Link>
              <ListGroup horizontal as="ul">
                {Array.from({length: 10}, (_, i) => i + 1).map(i => (
                  <ListGroup.Item key={i}>{i}</ListGroup.Item>
                ))}
              </ListGroup>
              <Link href=""><a className="btn-page btn-page-next">{t('pagination.next')}</a></Link>
            </div>
          </div>
        </Container>
      </section>
    </HomeLayout>
  )
}

export async function getServerSideProps(context: any) {
  const {query = {}} = context

  let posts: any = {}
  try {
    posts = await getPosts({
      limit: 10,
      filter: {
        syt_spt: 'Rao bán',
        ar_cn: 'VI',
        ar_dn: 'Quận Gò Vấp',
        ar_pn: 'Thành phố Hồ Chí Minh',
        ar_tn: 'Nhà phố',
      },
      ...query
    })
  } catch (e) {
    console.log(e)
    posts.error = 'error.apiServerError'
  }

  return {
    props: posts,
  }
}
