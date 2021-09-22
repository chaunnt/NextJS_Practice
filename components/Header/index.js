import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Container } from "@material-ui/core";
// import "./header.scss";
import Head from 'next/head'
import { Html } from "next/document";
import { pathKeys } from "./../../constants";
import Link from 'next/link'
import { useRouter } from 'next/router'
import AddToHome from './../AddToHome'
import { fetchAPI } from "../../utils/fetchAPI";
import { API_URL } from "../../urls";
import { Select } from 'antd';
import { removeVietnameseAccent } from './../../utils/common'
import { buildPathnameForDetailPage, buildPathnameForListPage } from "../../utils/urlUtils";

const Header = () => {
  const router = useRouter()
  const { asPath } = router
  const newAsPath = decodeURI(asPath)
  const activeStyle = {
    fontWeight: "bold",
    borderBottom: "3px solid #1a73e8",
    color: "#1a73e8"
  };
  const [lang, setLang] = useState('vi')
  const [data, setData] = useState({})

  const { query = {} } = router
  const { language } = query
  const menuHeader = [
    {
      name: "Tất cả",
      pathName: pathKeys.ROOT
    },
    {
      name: "Biệt thự",
      pathName: pathKeys.VILLA
    },
    {
      name: "Nhà hẻm",
      pathName: pathKeys.ALLEYHOUSE
    },
    {
      name: "Đất nền",
      pathName: pathKeys.THEGROUND
    },
    {
      name: "Nhà phố",
      pathName: pathKeys.TOWNHOUSE
    },
    {
      name: "Chung cư",
      pathName: pathKeys.APARTMENT
    },
    {
      name: "Dự Án",
      pathName: pathKeys.PROJECT
    },
    {
      name: "Nhà Xưởng",
      pathName: pathKeys.FACTORY
    },
    {
      name: "Đất khu công nghiệp",
      pathName: pathKeys.INDUSTRY
    },
    {
      name: "khác",
      pathName: pathKeys.ANOTHER
    }
  ];



  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    }

    if (window.localStorage.getItem('lang')) {
      setLang(window.localStorage.getItem('lang'))
    }
    handleFetch()
  }, [])

  function handleFetch() {
    fetchAPI({
      method: "POST",
      url: `${API_URL}/RealEstate/getLanguageMeta`,

    }).then(res => {
      if (res) {

        setData(res)
      }
    })

  }


  return (
    <>
      <Head>

        <title>Hodace</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, user-scalable=yes" />
        {/* <meta name="theme-color" content="#000000" /> */}
        <meta name="description" content="Bất động sản Hodace" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;1,300&display=swap" rel="stylesheet" />

        <script
          async
          src="./../../facebook.js"
        />
        <script
          async
          src="./../../zalo.js"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H4WWEHYZQ5"></script>
        <script src="./../../googleAnatys.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "ca-pub-3903897554290828",
                   enable_page_level_ads: true
              });
                `
          }}
        />
        {/* <script data-ad-client="ca-pub-3903897554290828" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}

      </Head>
      <AppBar position="static" className="header-wrapper">
        <Container className="header-wrapper__container">
          <Toolbar className="toolBar">
            {menuHeader.map((item, index) => {

              return (
                <Link
                  href={item.pathName}
                >
                  <a
                    style={{ marginLeft: item.pathName !== "/" ? '20px' : '' }}
                    className={`item-menu ${item.pathName === newAsPath && item.pathName !== "/" ? 'item-menu__active' : ''}`}
                    key={`${index}`}
                  >
                    {item.pathName === pathKeys.ROOT ?
                      (
                        <>
                          <span>
                            <svg
                              width={20}
                              height={20}
                              focusable="false"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#34a853"
                                d="M10 2v2a6 6 0 0 1 6 6h2a8 8 0 0 0-8-8"
                              />
                              <path
                                fill="#ea4335"
                                d="M10 4V2a8 8 0 0 0-8 8h2c0-3.3 2.7-6 6-6"
                              />
                              <path
                                fill="#fbbc04"
                                d="M4 10H2a8 8 0 0 0 8 8v-2c-3.3 0-6-2.69-6-6"
                              />
                              <path
                                fill="#4285f4"
                                d="M22 20.59l-5.69-5.69A7.96 7.96 0 0 0 18 10h-2a6 6 0 0 1-6 6v2c1.85 0 3.52-.64 4.88-1.68l5.69 5.69L22 20.59"
                              />
                            </svg>
                          </span>
                          <span> {item.name}</span>
                        </>
                      ) : (<>  {item.name}</>)
                    }

                  </a>

                </Link>
              );
            })}
            {/* <div onClick={(e) => {
              e.preventDefault(); setShow(!isShow); setLang(lang === 'vi' ? 'en' : 'vi');
              window.localStorage.setItem('lang', lang === 'vi' ? 'en' : 'vi')
              router.push({
                pathname: `/`,
              })
            }}>
              <div className="lang">
                <span style={{ display: 'flex', alignItems: 'center', paddingTop: '5px' }}>
                  {lang === 'vi' ? (
                    <>
                      <img src="/static/images/ic_vi.png" width={16} alt="Vietnamese" />VNI
                </>
                  ) : (<>
                    <img src="/static/images/ic_end.png" width={16} alt="English" />ENG
                </>)}
                </span>


              </div>
            </div> */}

          </Toolbar>
          <AddToHome />
        </Container>
      </AppBar>
      <Container>

        {Object.keys(data).map(key => {
          return (
            <Select
              size="large"
              filterOption={(input, option) => {
                return option && option.props && typeof option.props.label === "string" ? removeVietnameseAccent(option.props.label.toLowerCase()).indexOf(removeVietnameseAccent(input.toLowerCase())) >= 0 : false
              }
              }
              value={language}
              style={{ marginRight: '10px', marginTop: '10px', minWidth: '200px' }}
              showSearch
              name={data[key].key ? data[key].key : key}
              onSelect={(value, dataOb) => {
                const { name } = dataOb
                const {query, params, asPath} = router;
                if (value && value !== '') {
                  query[name] = value
                }
                router.push({
                  pathname:
                  asPath.indexOf("/list") > 0
                      ? buildPathnameForListPage(query)
                      : (asPath.indexOf("/detail") > 0
                        ? buildPathnameForDetailPage(query, params.id)
                        : "/"),
                  query: {
                    ...query,
                  },
                });
              }}
              placeholder={data[key] && data[key].title || 'ngôn ngữ'}
            >
              <Select.Option name={data[key].key ? data[key].key : key} label={'Chọn tất cả'} value={''}>Chọn tất cả</Select.Option>
              {
                data[key].values.map(el => {
                  if (typeof el === 'object') {
                    return (
                      <Select.Option name={data[key].key ? data[key].key : key} label={el.label} value={el.label}>{el.label}</Select.Option>

                    )
                  } else {
                    return (
                      <Select.Option name={data[key].key ? data[key].key : key} label={el} value={el}>{el}</Select.Option>

                    )
                  }
                })
              }

            </Select>

            // <select onChange={(e) => {
            //   const { value, name } = e.target
            //   const query = router.query
            //   if (value && value !== '') {
            //     query[name] = value
            //   }
            //   router.push({
            //     pathname: `/`,
            //     query: {
            //       ...query,
            //     }
            //   })
            // }} name={data[key].key ? data[key].key : key} style={{ marginRight: '10px', marginTop: '10px' }} >
            //   <option value={''}>{data[key] && data[key].title || 'ngôn ngữ'}</option>
            //   {
            //     data[key].values.map(el => {

            //       return (
            //         <option value={el}>{el}</option>
            //       )
            //     })
            //   }


            // </select>
          )
        })}
      </Container>
    </>
  );
};

export default Header;
