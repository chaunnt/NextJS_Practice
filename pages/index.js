import React, { useCallback, useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import SearchAdvanceProvider from "../components/SearchAdvance/SearchAdvanceContext";
import { API_URL } from "../urls";
import { fetchAPI } from "../utils/fetchAPI";
import { buildPathnameForDetailPage } from "../utils/urlUtils";
import SearchAdvance from "./../components/SearchAdvance";

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
      language: window.localStorage.getItem("lang") || "vi",
      ...query,
    };

    if (ar_tn) {
      params["ar_tn"] = ar_tn;
    }
    setLoading(true);

    fetchAPI({
      method: "POST",
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
      document.documentElement.scrollHeight ===
      document.documentElement.scrollTop + window.innerHeight &&
      total > page * 20
    ) {
      getData(page, 20, true);
    }
  }, [total, page]);

  useEffect(() => {
    window.addEventListener("scroll", Scroll, false);
    return () => {
      // returned function will be called on component unmount
      window.removeEventListener("scroll", Scroll, false);
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
          <meta
            name="viewport"
            content="width=device-width, user-scalable=yes"
          />
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
            if (type === "title") {
              return <title>{content}</title>;
            } else if (type === "link") {
              return <link rel={rel} href={href} />;
            } else if (content) {
              return (
                <>
                  {name ? <meta name={name} content={content} /> : ""}
                  {name ? (
                    <meta itemProp={name} name={name} content={content} />
                  ) : (
                      ""
                    )}
                  {name ? (
                    <meta name={`twitter:${name}`} content={content} />
                  ) : (
                      ""
                    )}
                  {property ? (
                    <meta
                      property={property}
                      content={content}
                      key={property}
                    />
                  ) : (
                      ""
                    )}
                </>
              );
            } else {
              return "";
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
        {loading ? (
          <div className="loading">
            {" "}
            <CircularProgress />
          </div>
        ) : null}
        <div className="appbar">
          <div id="extabar">
            <div style={{ position: "relative" }}>
              <div className="WE0UJf" id="slim_appbar">
                <div className="LHJvCe">
                  <h1 id="result-stats">
                    {total ? (
                      <>Tìm được {total} kết quả</>
                    ) : (
                        <>không tìm thấy kết quả nào &nbsp;</>
                      )}

                    <img
                      style={{ marginRight: 10, cursor: "pointer" }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="App Hodace"
                      src={"/static/images/apps.svg"}
                      alt="app"
                      loading="lazy"
                    />

                    <img
                      onClick={() => {
                        setIsShow(!isShow);
                      }}
                      style={{ marginRight: 10, cursor: "pointer" }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Bộ lọc Hodace"
                      src={"/static/images/filter_list.svg"}
                      alt="filter"
                      loading="lazy"
                    />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isShow && (
          <SearchAdvanceProvider>
            <SearchAdvance {...props} isShow={isShow} />
          </SearchAdvanceProvider>
        )}
        {data &&
          Array.isArray(data) &&
          data.map((item) => (
            <div key={item.id} className="content_new">
              <link
                onClick={(e) => {
                  e.preventDefault();
                  goToDetailPage(item.id);
                }}
                href="!#"
                rel="prerender"
              />
              <div
                className="rc"
                data-hveid="CAIQAA"
                data-ved="2ahUKEwjgj9mLmLvsAhVWw4sBHQQvCx0QFSgAMAB6BAgCEAA"
              >
                <div className="yuRUbf">
                  <br />
                  <div className="sub_new">{item.link || ""}</div>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      goToDetailPage(item.id);
                    }}
                    href="/"
                  >
                    <h2 className="title_new">
                      <span>{item.title}</span>
                    </h2>
                  </a>
                </div>
                <div className="des_new">
                  <div>
                    <span>{item.fullDesc}</span>
                    <div className="link_new">{item.shortDesc}</div>
                    <div className="link_info">
                      {item.updatedAt ? (
                        <div>{moment(item.datetime).format("YYYY/MM/DD")}</div>
                      ) : null}
                      {item.ClickCount ? (
                        <div>Lượt click: {item.ClickCount}</div>
                      ) : null}
                      {item.ShareCount ? (
                        <div>Lượt chia sẻ: {item.ShareCount}</div>
                      ) : null}
                      {item.ViewCount ? (
                        <div>Lượt xem: {item.ViewCount}</div>
                      ) : null}
                      {item.DataRating ? (
                        <div>Lượng thông tin: {item.DataRating}</div>
                      ) : null}
                      {item.InvestmentRating ? (
                        <div>Điểm đầu tư : {item.InvestmentRating}</div>
                      ) : null}
                    </div>
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
    method: "POST",
    url: `${API_URL}/Post/list`,
    data: data,
  });

  return {
    props: {
      result: result || {},
    },
  };
}
