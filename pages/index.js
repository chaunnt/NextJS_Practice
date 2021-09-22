import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SearchAdvanceProvider from '../components/SearchAdvance/SearchAdvanceContext';
import { API_URL } from '../urls';
import { fetchAPI } from '../utils/fetchAPI';
import { buildPathnameForDetailPage } from '../utils/urlUtils';
import SearchAdvance from './../components/SearchAdvance';
import {
  IconCategory,
  IconCheck,
  IconLocation,
  IconChart,
  IconCity,
  IconCoin,
  IconLike,
  IconList,
  IconUnLike,
  IconClick,
  IconInfo,
  IconShare,
  IconStar,
  IconVisibility,
  IconFilter,
  IconSortDown,
} from './../public/static/icons';
import { getFormattedNumber } from '../utils/numberFormat';

export default function Index(props) {
  const { result = {} } = props;
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const { query = {} } = router;
  const { ar_tn, language } = query;
  const getData = useCallback(async (pageNow, perPage, isScroll) => {
    const params = {
      skip: pageNow * perPage,
      limit: perPage,
      language: window.localStorage.getItem('lang') || 'vi',
      ...query,
    };

    if (ar_tn) {
      params['ar_tn'] = ar_tn;
    }
    setLoading(true);

    fetchAPI({
      method: 'POST',
      url: `${API_URL}/Post/list`,
      data: params,
    }).then((res) => {
      if (res) {
        if (res.allCount) {
          const { allCount, resultData } = res;
          setTotal(allCount);
          const newData = isScroll ? [...resultData, ...data] : resultData;
          setData(newData);
          setPage(pageNow + 1);
        } else {
          setData([]);
          setPage(0);
          setTotal(0);
        }
      } else {
        setData([]);
        setPage(0);
        setTotal(0);
      }
      setLoading(false);
    });
  });

  const Scroll = useCallback(() => {
    if (
      document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight &&
      total > page * 20
    ) {
      getData(page, 20, true);
    }
  }, [total, page]);

  useEffect(() => {
    window.addEventListener('scroll', Scroll, false);
    return () => {
      // returned function will be called on component unmount
      window.removeEventListener('scroll', Scroll, false);
    };
  }, [total, page, Scroll]);

  function goToDetailPage(id) {
    let formatQuery = { ...router.query };
    if (language) {
      formatQuery = {
        ...formatQuery,
        language,
      };
    }
    router.push({
      pathname: buildPathnameForDetailPage(query, id),
      query: formatQuery,
    });
  }

  function renderLinkDetail(id) {
    let formatQuery = { ...router.query };
    if (language) {
      formatQuery = {
        ...formatQuery,
        language,
      };
    }
    return buildPathnameForDetailPage(query, id);
  }

  useEffect(() => {
    getData(0, 20, false);
  }, [query]);

  return (
    <>
      {result.metadata ? (
        <Head>
          <title>Hodace</title>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, user-scalable=yes" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Bất động sản Hodace" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          {Object.keys(result.metadata).map((key) => {
            const type = result.metadata[key].type;
            const name = result.metadata[key].name;
            const property = result.metadata[key].property;
            const content = result.metadata[key].content;
            const rel = result.metadata[key].rel;
            const href = result.metadata[key].href;
            if (type === 'title') {
              return <title>{content}</title>;
            } else if (type === 'link') {
              return <link rel={rel} href={href} />;
            } else if (content) {
              return (
                <>
                  {name ? <meta name={name} content={content} /> : ''}
                  {name ? <meta itemProp={name} name={name} content={content} /> : ''}
                  {name ? <meta name={`twitter:${name}`} content={content} /> : ''}
                  {property ? <meta property={property} content={content} key={property} /> : ''}
                </>
              );
            } else {
              return '';
            }
          })}
          <meta
            itemProp="image"
            content="https://bds-web-data.service.hodace.network/static/images/hodacenetwork.png"
          ></meta>
          <meta
            property="og:image"
            content="https://bds-web-data.service.hodace.network/static/images/hodacenetwork.png"
          ></meta>
          <meta
            name="twitter:image"
            content="https://bds-web-data.service.hodace.network/static/images/hodacenetwork.png"
          ></meta>
        </Head>
      ) : null}
      <Container className="home">
        {loading && (
          <div className="loading">
            <CircularProgress />
          </div>
        )}

        <div className="box-filter">
          <div
            className="btn_ btn-filter"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <IconFilter />
            &nbsp;Bộ lọc{'(4)'}
          </div>
          <div>
            <div>
              Sắp xếp theo:&nbsp;
              <span className="btn_">
                {'Mới nhất'}
                <IconSortDown />
              </span>
            </div>
          </div>
        </div>
        {isShow && (
          <SearchAdvanceProvider>
            <SearchAdvance {...props} isShow={isShow} />
          </SearchAdvanceProvider>
        )}
        <h1 id="result-stats">
          {total ? <>Tìm được {getFormattedNumber(total)} kết quả &nbsp;</> : <>không tìm thấy kết quả nào &nbsp;</>}
        </h1>
        {data &&
          Array.isArray(data) &&
          data.map((item) => (
            <div key={item.id} className="content_new">
              {/* <link
                onClick={(e) => {
                  e.preventDefault();
                  goToDetailPage(item.id);
                }}  
                href={renderLinkDetail(item.id)}
                rel="prerender"
              /> */}
              <div className="rc" data-hveid="CAIQAA" data-ved="2ahUKEwjgj9mLmLvsAhVWw4sBHQQvCx0QFSgAMAB6BAgCEAA">
                <div className="yuRUbf">
                  {/* <br /> */}
                  <div className="sub_new">{item.link || ''}</div>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      goToDetailPage(item.id);
                    }}
                    href={renderLinkDetail(item.id)}
                  >
                    <h2 className="title_new">
                      <span>{item.title}</span>
                    </h2>
                  </a>
                </div>
                <div className="list_icons">
                  <div className="icon">
                    <IconCategory />
                    <div className="icon_check">
                      <IconCheck />
                    </div>
                  </div>

                  <div className="icon">
                    <IconLocation />
                    <div className="icon_check">
                      <IconCheck />
                    </div>
                  </div>
                  <div className="icon">
                    <IconList />
                    <div className="icon_check">
                      <IconCheck />
                    </div>
                  </div>
                  <div className="icon">
                    <IconCity />
                    <div className="icon_check">
                      <IconCheck />
                    </div>
                  </div>
                  <div className="icon">
                    <IconChart />
                    <div className="icon_check">
                      <IconCheck />
                    </div>
                  </div>
                  <div className="icon">
                    <IconCoin />
                    <div className="icon_check">
                      <IconCheck />
                    </div>
                  </div>
                  <div className="icon">
                    <IconLike />
                    <div className="icon_check">
                      <IconCheck />
                    </div>
                  </div>
                  <div className="icon">
                    <IconUnLike />
                    <div className="icon_check">
                      <IconCheck />
                    </div>
                  </div>
                </div>
                <div className="des_new">
                  {/* <span>{item.fullDesc}</span> */}
                  <div className="short_desc">{item.shortDesc}</div>
                  <div className="link_info">
                    <div className="info">
                      <IconVisibility />
                      &nbsp;
                      <span>{item.ViewCount || 0}</span>
                      <IconShare />
                      &nbsp;
                      <span>{item.ShareCount || 0}</span>
                      <IconClick />
                      &nbsp;
                      <span>{item.ClickCount || 0}</span>
                      <IconInfo />
                      &nbsp;
                      <span>{item.DataRating || 0}</span>
                      <IconStar />
                      &nbsp;
                      <span>{item.InvestmentRating || 0}</span>
                      {/* {item.ClickCount ? <span>Lượt click: {item.ClickCount}</span> : null}
                        {item.ShareCount ? <span>Lượt chia sẻ: {item.ShareCount}</span> : null}
                        {item.ViewCount ? <span>Lượt xem: {item.ViewCount}</span> : null}
                        {item.DataRating ? <span>Lượng thông tin: {item.DataRating}</span> : null}
                        {item.InvestmentRating ? <span>Điểm đầu tư : {item.InvestmentRating}</span> : null} */}
                    </div>

                    {item.updatedAt && (
                      <div className="relative_time">
                        {moment(item.updatedAt, 'YYYYMMDD HH:mm:ss')
                          .startOf('hour')
                          .fromNow()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query = {} } = context;
  const data = {
    ...query,
    skip: 0,
    limit: 20,
  };

  const result = await fetchAPI({
    method: 'POST',
    url: `${API_URL}/Post/list`,
    data: data,
  });

  return {
    props: {
      result: result || {},
    },
  };
}
