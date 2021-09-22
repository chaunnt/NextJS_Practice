import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import styles from './header.module.scss'
import {
  Navbar,
  Container,
  Nav,
  NavDropdown
} from 'react-bootstrap'
import Link from 'next/link'
import RealEstateService from '@/services/realEstate'
import { routes } from '@/constants/common'

const Header = () => {
  const { t: translation } = useTranslation();
  const router = useRouter();
  const [languageList, setLanguageList] = useState([]);
  const [items, setItems] = useState(routes);

  useEffect(() => {
    const getLanguageMeta = async () => {
      const res = await RealEstateService.getLangguageMeta();
      setLanguageList(res);
    }
    getLanguageMeta();
  }, []);

  return (
    <header className={styles.header}>
      <Navbar expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" className={styles["nav-bar"]}>
              {
                items.map((value, key) => {
                  return <Link key={key} href={value.link}>
                    <a className={router.pathname === value.link ? styles["active-nav"] : ''} >{value.name}</a>
                  </Link>
                })
              }
            </Nav>
          </Navbar.Collapse>
          <NavDropdown className={styles["language"]} title={languageList ? languageList[0] : ''}>
            {
              languageList !== null &&
              languageList.map((value, key): any => {
                return <NavDropdown.Item key={key} href="#action/3.1">{value}</NavDropdown.Item>
              })
            }
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.1">{languageList ? languageList[0] : ''}</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </header>
  )
}


export default Header;