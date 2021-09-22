import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Col, Container, Dropdown, Form, Image, Nav, Row } from 'react-bootstrap'
import cx from 'classnames'
import styles from '@/styles/widgets/header-home.module.scss'
import tenures from '@/public/customizations/tenures.json'
import propertyTypes from '@/public/customizations/property-types.json'
import { INavItem, ISearchTenureItem, ITranslationItem } from '@/models/dom.models'
import { ICommonStore, TranslationLang } from '@/models/store.models'
import { commonStateSelectors, commonStateActions } from '@/redux/slices/common'


const HomeHeader = () => {
  const {t} = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const commonSelectors: ICommonStore = useSelector(commonStateSelectors)
  const [searchTenures, setSearchTenures] = useState([tenures.all])
  const [isSearchTenuresToggle, setIsSearchTenuresToggle] = useState(false)

  const setLang: any = (e: any) => dispatch(commonStateActions.setLang(e))

  const isMenuItemActive = (path: string) => router.pathname === path

  const toggleSearchForm = (e: any) => console.log(e)

  const displaySearchTenures = (searchTenures: any) => {
    return (
      <>
        {searchTenures.map((s: any) => (
          <span key={s.translationKey}>
            <span className={styles.icon}><Image src={s.activeIcon} width="16" /></span>
            <span>{t(s.translationKey)}</span>
          </span>
        ))}
      </>
    )
  }

  const submitSearchForm = (e: any) => {
    e.preventDefault()
    console.log(e)
  }

  const handleSearchTenuresClick = (obj: ISearchTenureItem) => {
    console.log('click', obj)
    const idx = searchTenures.findIndex(s => s.translationKey === obj.translationKey)
    const tmp: Array<ISearchTenureItem> = searchTenures
    if (idx > -1) {
      tmp.splice(idx, 1)
    } else {
      tmp.push(obj)
    }
    setSearchTenures([...tmp])
  }

  const displaySearchTenuresDropdown = () => {
    let html: JSX.Element[] = []
    Object.entries(tenures).map(([k, v]) => {
      const isExisted = searchTenures.some(s => s.translationKey === v.translationKey)
      html.push(
        <div className={cx(styles['dropdown-item'], 'd-flex align-items-center')} key={k} onClick={() => handleSearchTenuresClick(v)}>
          <span className={cx(styles.checkbox, isExisted ? styles.active : '')}></span>
          <Image src={v.icon} width="16" className={styles.icon} />
          <span>{t(v.translationKey)}</span>
        </div>
      )
    })

    return html
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <title>{t('header.title')}</title>
      </Head>

      <header className={styles.header}>
        <Container>
          <Row className="align-items-center">

            <Col className={styles.logo} xs={8} md={{order: 1, span: 3}}>
              <Image src="/images/logo.png" />
            </Col>

            <Col className={styles.search} xs={4} md={{order: 4, span: 12}}>
              <Button className={cx(styles['btn-search'], 'd-md-none')} variant="" onClick={e => toggleSearchForm(e)}>
                <Image src="/icons/magnify-black.svg" />
              </Button>
              <Form className={cx(styles['search-form'], 'd-none d-md-flex align-items-center')} onSubmit={e => submitSearchForm(e)}>
                <Form.Group className={cx(styles['main-group'], 'd-flex align-items-center')}>
                  <div className={styles.multiselect}>
                    <div className={styles.toggle} onClick={() => setIsSearchTenuresToggle(!isSearchTenuresToggle)}>
                      {displaySearchTenures(searchTenures)}
                      <Image src="/icons/carret-down.svg" width="10" className={styles.arrow} />
                    </div>
                    <div className={cx(styles.dropdown, isSearchTenuresToggle ? styles.active : '')}>
                      {displaySearchTenuresDropdown()}
                    </div>
                  </div>
                  <Form.Control type="text" name="tenures" className="d-none" />
                  <Form.Control type="text" name="s" className={cx(styles['input-text'], 'border-0')} placeholder={t('search.mainSearchText')} />
                  <Button type="reset" className={cx(styles.reset, 'border-0')}><Image src="/icons/close.svg" width="12" /></Button>
                  <Button type="submit" className={cx(styles.magnify)}><Image src="/icons/magnify-blue.svg" /></Button>
                </Form.Group>
                <Form.Group className={styles['advanced-group']}>
                  <Button className={styles['toggle-advanced-form']}>{t('advancedFilter.btnText')}</Button>
                </Form.Group>
              </Form>
            </Col>

            <Col className={styles.navigation} xs={12} md={{order: 2, span: 7}}>
              <Nav className="d-md-none justify-content-around">
                {mobileNavItems.map(item => (
                  <Nav.Item onClick={() => router.push(item.path)} key={item.path}>
                    <Nav.Link><Image src={item.src} /></Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Nav className={cx(styles.nav, 'd-none d-md-flex')}>
                {desktopNavItems.map(item => (
                  <Nav.Item className={styles['nav-item']} onClick={() => router.push(item.path)} key={item.path}>
                    <Nav.Link className={cx(styles['nav-link'], isMenuItemActive(item.path) ? styles.active : '')}>{t(item.src)}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>

            <Col className={styles['property-types']} xs={12} md={{order: 'last', span: 12}}>
              <Nav className={cx(styles.nav, 'flex-nowrap flex-shrink-0 overflow-auto')}>
                {Object.entries(propertyTypes).map(([k, v]) => (
                  <Nav.Item className={styles['nav-item']} key={k}>
                    <Nav.Link className={cx(styles['nav-link'], 'text-nowrap')}>{t(v.translationKey)}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>

            <Col className={cx(styles.translation, 'd-none d-md-block text-end')} md={{order: 3, span: 2}}>
              <Dropdown className="" onSelect={e => setLang(e)} align="end">
                <Dropdown.Toggle variant="" id="dropdown-autoclose-true" className={styles['dropdown-toggle']}>
                  {getTranslation(commonSelectors.lang)}
                </Dropdown.Toggle>
                <Dropdown.Menu className="text-end">
                  {translationItems.map(i => (
                    <Dropdown.Item className={styles['dropdown-item']} eventKey={i.key} key={i.key}>
                      <span>{i.text}</span>
                      <Image src={i.flag} width="29" />
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

          </Row>
        </Container>
      </header>
    </>
  )
}

export default HomeHeader

const mobileNavItems: Array<INavItem> = [
  {src: '/icons/menu-home.svg', path: '/'},
  {src: '/icons/menu-tag.svg', path: '/tag'},
  {src: '/icons/menu-key.svg', path: '/key'},
  {src: '/icons/menu-account.svg', path: '/account'},
  {src: '/icons/menu-settings.svg', path: '/settings'},
]
const desktopNavItems: Array<INavItem> = [
  {src: 'menu.home', path: '/'},
  {src: 'menu.contact', path: '/contact'},
]
const translationItems: Array<ITranslationItem> = [
  {key: TranslationLang.Vi, text: 'Tiếng Việt', flag: '/icons/flag-vn.svg'},
  {key: TranslationLang.En, text: 'English', flag: '/icons/flag-vn.svg'},
]

const getTranslation = (lang: TranslationLang) => {
  const selected: ITranslationItem = translationItems.reduce((prev, c) => {
    if (c.key === lang) prev = c
    return prev
  })
  return (
    <>
      <span>{selected.text}</span>
      <Image src={selected.flag} width="29" />
    </>
  )
}
