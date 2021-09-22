import { AppBar, Container } from '@material-ui/core';
import { Select } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../urls';
import { removeVietnameseAccent } from '../../utils/common';
import { fetchAPI } from '../../utils/fetchAPI';
import { buildPathnameForDetailPage, buildPathnameForListPage } from '../../utils/urlUtils';
import { pathKeys } from './../../constants';
import Adsense from './../Adsense';
import Menu from './menu';

const Header = () => {
  const router = useRouter();
  const [lang, setLang] = useState('vi');
  const [data, setData] = useState({});

  const { query = {} } = router;
  const { language } = query;

  const menuHeaderLv1 = [
    {
      name: 'Rao bán',
      pathName: pathKeys.FOR_SALE,
    },
    {
      name: 'Cho thuê',
      pathName: pathKeys.FOR_RENT,
    },
  ];

  const menuHeaderLv2 = [
    {
      name: 'Tất cả',
      pathName: pathKeys.ROOT,
    },
    {
      name: 'Biệt thự',
      pathName: pathKeys.VILLA,
    },
    {
      name: 'Nhà hẻm',
      pathName: pathKeys.ALLEYHOUSE,
    },
    {
      name: 'Đất nền',
      pathName: pathKeys.THEGROUND,
    },
    {
      name: 'Nhà phố',
      pathName: pathKeys.TOWNHOUSE,
    },
    {
      name: 'Chung cư',
      pathName: pathKeys.APARTMENT,
    },
    {
      name: 'Dự Án',
      pathName: pathKeys.PROJECT,
    },
    {
      name: 'Nhà Xưởng',
      pathName: pathKeys.FACTORY,
    },
    {
      name: 'Đất khu công nghiệp',
      pathName: pathKeys.INDUSTRY,
    },
    {
      name: 'khác',
      pathName: pathKeys.ANOTHER,
    },
  ];

  useEffect(() => {
    if (window.localStorage.getItem('lang')) {
      setLang(window.localStorage.getItem('lang'));
    }
    handleFetch();
  }, []);

  function handleFetch() {
    fetchAPI({
      method: 'POST',
      url: `${API_URL}/RealEstate/getLanguageMeta`,
    }).then((res) => {
      if (res) {
        setData(res);
      }
    });
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

      </Head>
      <AppBar position="static" className="header-wrapper">
        <Menu menus={menuHeaderLv1} />
        <Menu menus={menuHeaderLv2} combineQuery={true} />
      </AppBar>
      <Container>
        {Object.keys(data).map((key) => {
          return (
            <Select
              size="large"
              filterOption={(input, option) => {
                return option && option.props && typeof option.props.label === 'string'
                  ? removeVietnameseAccent(option.props.label.toLowerCase()).indexOf(
                      removeVietnameseAccent(input.toLowerCase()),
                    ) >= 0
                  : false;
              }}
              value={language}
              style={{ marginRight: '10px', marginTop: '10px', minWidth: '200px' }}
              showSearch
              name={data[key].key ? data[key].key : key}
              onSelect={(value, dataOb) => {
                const { name } = dataOb;
                const { query, params, asPath } = router;
                if (value && value !== '') {
                  query[name] = value;
                }
                router.push({
                  pathname:
                    asPath.indexOf('/list') > 0
                      ? buildPathnameForListPage(query)
                      : asPath.indexOf('/detail') > 0
                      ? buildPathnameForDetailPage(query, params.id)
                      : '/',
                  query: {
                    ...query,
                  },
                });
              }}
              placeholder={(data[key] && data[key].title) || 'ngôn ngữ'}
            >
              <Select.Option name={data[key].key ? data[key].key : key} label={'Chọn tất cả'} value={''}>
                Chọn tất cả
              </Select.Option>
              {data[key].values.map((el) => {
                if (typeof el === 'object') {
                  return (
                    <Select.Option name={data[key].key ? data[key].key : key} label={el.label} value={el.label}>
                      {el.label}
                    </Select.Option>
                  );
                } else {
                  return (
                    <Select.Option name={data[key].key ? data[key].key : key} label={el} value={el}>
                      {el}
                    </Select.Option>
                  );
                }
              })}
            </Select>
          );
        })}
        <Adsense />
      </Container>
    </>
  );
};

export default Header;
