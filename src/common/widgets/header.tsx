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

interface Props {
  LangList?: Array<any> | []
}

const Header = ({ LangList }: Props): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const [langList, setLangList] = useState(LangList);
  const list_nav = [
    { title: 'Rao Bán', active: false, href: '#' },
    { title: 'Cho Thuê', active: false, href: '#' },
    { title: 'Liên Hệ', active: false, href: '/contacts' }
  ]
  const [items, setItems] = useState(list_nav);
  const [checkActive, setCheckActive] = useState('');
  const [getItemActive, setGetItemActive] = useState(<div></div>);

  useEffect(() => {
    items.map((value) => {
      if (value.title == checkActive || router.pathname == value.href) {
        value.active = true;
        setGetItemActive(<Link key={value.title} href={value.href}>
          <a onClick={() => setCheckActive(value.title)} className={styles.active_nav}>{value.title}</a>
        </Link>)
      }
      else {
        value.active = false;
      }
    });
  }, [items, checkActive]);

  return (
    <header className={styles.header}>
      {console.log('render ui header')
      }
      <Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" className={styles.navBar}>
              {
                items.map((value,key) => {
                  return value.active && router.pathname !== '/' ? getItemActive :
                    <Link key={key} href={value.href}>
                      <a onClick={() => setCheckActive(value.title)}>{value.title}</a>
                    </Link>
                })
              }
            </Nav>
          </Navbar.Collapse>
          <NavDropdown className={styles.lang} title="Ngôn Ngữ">
            {
              langList !== undefined &&
                langList.map((value): any => {
                  return <NavDropdown.Item href="#action/3.1">{value}</NavDropdown.Item>
                })
              }
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.1">Tiếng Việt</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </header>
  )
}

// Header.propTypes = {
//   LangList: PropTypes.object
// }

// Header.defaultProps = {
//   LangList: {}
// }

export default Header;