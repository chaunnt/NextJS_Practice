import { Image } from 'react-bootstrap'
import styles from '@/styles/components/posts.module.scss'
import Link from 'next/link'
import cx from 'classnames'
import { IPostsProps } from '@/models/dom.models'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

const Posts = (props: IPostsProps) => {
  const {t} = useTranslation()

  return (
    <div className={cx(styles.posts, props.className)}>
      {props.data.map(p => (
        <article className={styles['post-item']} key={p._id}>
          <p className={styles['entry-title']}><Link href={p.SystemPostUrl}><a>{p.SystemRecordTitle}</a></Link></p>
          <div className={styles.counters}>
            <span className={cx(styles['counter-item'], 'd-inline-block')}>
              <Image src="/icons/post-view.svg" className={styles.icon} />
              <span className="align-middle">{p.ViewCount} <span className="d-none d-md-inline">{t('post.counters.view')}</span></span>
            </span>
            <span className={cx(styles['counter-item'], 'd-inline-block')}>
              <Image src="/icons/post-share.svg" className={styles.icon} />
              <span className="align-middle">{p.ShareCount} <span className="d-none d-md-inline">{t('post.counters.share')}</span></span>
            </span>
            <span className={cx(styles['counter-item'], 'd-inline-block')}>
              <Image src="/icons/post-click.svg" className={styles.icon} />
              <span className="align-middle">{p.ClickCount} <span className="d-none d-md-inline">{t('post.counters.click')}</span></span>
            </span>
            <span className={cx(styles['counter-item'], 'd-inline-block')}>
              <Image src="/icons/post-info.svg" className={styles.icon} />
              <span className="align-middle">{p.DataRating} <span className="d-none d-md-inline">{t('post.counters.info')}</span></span>
            </span>
            <span className={cx(styles['counter-item'], 'd-inline-block d-md-none')}>
              <Image src="/icons/post-star.svg" className={styles.icon} />
              <span className="align-middle">{}</span>
            </span>
            <span className={cx(styles['counter-item'], 'd-none d-md-inline-block')}>
              <Image src="/icons/post-points.svg" className={styles.icon} />
              <span className="align-middle">{p.InvestmentRating} {t('post.counters.points')}</span>
            </span>
          </div>
          <div className={styles['entry-content']}>
            <span className={styles['entry-date']}>{displayDateFormat(p.UpdatedAt)} -- </span>
            {/*@ts-ignore*/}
            <span className={styles['entry-summary']}>{p.SystemRecordContent?.length > 140 ? `${p.SystemRecordContent?.substring(0, 140)}...` : p.SystemRecordContent}</span>
          </div>
          <div className={cx(styles['entry-redirect'], 'd-none d-md-block')}>
            <Link href="">
              <a className={styles['redirect-item']}>{t('post.particularsTitles.plan')}</a>
            </Link>
            <Link href="">
              <a className={styles['redirect-item']}>{t('post.particularsTitles.location')}</a>
            </Link>
            <Link href="">
              <a className={styles['redirect-item']}>{t('post.particularsTitles.type')}</a>
            </Link>
            <Link href="">
              <a className={styles['redirect-item']}>{t('post.particularsTitles.utility')}</a>
            </Link>
            <Link href="">
              <a className={styles['redirect-item']}>{t('post.particularsTitles.investmentValue')}</a>
            </Link>
            <Link href="">
              <a className={styles['redirect-item']}>{t('post.particularsTitles.loanValue')}</a>
            </Link>
            <Link href="">
              <a className={styles['redirect-item']}>{t('post.particularsTitles.advantage')}</a>
            </Link>
            <Link href="">
              <a className={styles['redirect-item']}>{t('post.particularsTitles.disadvantage')}</a>
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Posts

const displayDateFormat = (d: string | undefined) => {
  require('moment/locale/vi')
  return moment(d).format('DD MMM, YYYY')
}
