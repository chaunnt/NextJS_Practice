import React from "react";
import { useRouter } from 'next/router'
import { Container } from "@material-ui/core";
import { fetchAPI } from "../../utils/fetchAPI";
import { API_URL } from "../../urls";
import Head from 'next/head'
import { toast } from "react-toastify";
import { buildPathnameForListPage } from '../../utils/urlUtils';
function Detail({ data = {} }) {
  const router = useRouter()

  function copyToClipboard(text) {
    var selected = false;
    var el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    if (document.getSelection().rangeCount > 0) {
      selected = document.getSelection().getRangeAt(0)
    }
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  }

  return (
    <>

      {data && data.metadata ? (
        <Head>
          <title>Hodace</title>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, user-scalable=yes" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Bất động sản Hodace" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          {
            Object.keys(data.metadata).map(key => {
              const type = data.metadata[key].type
              const name = data.metadata[key].name
              const content = data.metadata[key].content
              const rel = data.metadata[key].rel
              const href = data.metadata[key].href
              const property = data.metadata[key].property
              if (type === 'title') {
                return (<title>{content}</title>)
              } else if (type === 'link') {
                return (<link rel={rel} href={href} />)
              } else if (content) {

                return (
                  <>
                    {name && content ? <meta name={name} content={content} /> : ''}
                    {name && content ? <meta itemProp={name} name={name} content={content} /> : ""}
                    {name && content ? <meta name={`twitter:${name}`} content={content} /> : ""}
                    {property && content ? (<meta property={property} content={content} key={property} />) : ""}
                  </>
                )
              } else {
                return ""
              }
            })
          }
          <meta itemProp="image" content="https://bds-web-data.service.hodace.network/static/images/hodacenetwork.png"></meta>
          <meta property="og:image" content="https://bds-web-data.service.hodace.network/static/images/hodacenetwork.png"></meta>
          <meta name="twitter:image" content="https://bds-web-data.service.hodace.network/static/images/hodacenetwork.png"></meta>

        </Head>
      ) : <div></div>}


      <Container className="detailView">
        <div style={{ margin: "0 auto" }}>
          <div className="bacon-blog-post bacon-shadow">
            <img
              src="/static/images/hodacenetwork.png"
              className="wp-post-image"
              alt="hodacenetwork"
              title="hodacenetwork"
              loading="lazy" />

            <div className="bacon-blog-post-inner">
              <div className="back-content">
                <h1>
                  <a
                    onClick={e => e.preventDefault()}
                    href="!#"
                    rel="bookmark"
                    title="Permanent link to Finding What Challenges You"
                    className="title-row"
                  >
                    {data.title}
                    <button style={{ color: '#fff', marginLeft: '10px', cursor: 'copy' }} className="btn" onClick={() => {
                      const link = window.location.href
                      copyToClipboard(link)
                      toast.success("Đã copy link thành công")
                    }}>Copy link</button>
                  </a>
                </h1>
                <div
                  onClick={() => {
                    router.push({
                      pathname: buildPathnameForListPage(router.query),
                      query: {
                        ...router.query
                      }
                    })
                  }}
                  className="backBtn"
                >
                  <span className="line tLine"></span>
                  <span className="line mLine"></span>
                  <span className="label">Trở về</span>
                  <span className="line bLine"></span>
                </div>
              </div>
              <div contentEditable='true' dangerouslySetInnerHTML={{ __html: data.fullDesc }}></div>

              <p>
                {data.fullDesc ? (<div dangerouslySetInnerHTML={{ __html: data.fullDesc || '' }}></div>) : null}
              </p>
            </div>
          </div>
        </div>
      </Container>

    </>

  )
}

export default Detail

export async function getServerSideProps(props) {

  const { params, query } = props
  const { id } = params
  const { language } = query

  const newData = {
    id,
    mode: 'html',
  }
  if (language && language !== '') {
    newData.language = language
  }
  const result = await fetchAPI({
    method: "GET",
    url: `${API_URL}/Post/searchById`,
    params: newData
  });

  return {
    props: {
      data: result || {},

    },
  }
}