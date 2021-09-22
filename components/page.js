// import { useDispatch } from 'react-redux'
// import { useRouter } from 'next/router'
// import React, { useState, useEffect, useCallback } from "react";
// import { Container } from "@material-ui/core";
// import { fetchAPI } from "../utils/fetchAPI";
// import { API_URL } from "../urls";
// import Head from 'next/head'
// import moment from 'moment'

// function Page(props) {
//   const { result = {} } = props

//   const [page, setPage] = useState(0);
//   const router = useRouter()
//   const [data, setData] = useState([]);
//   const [total, setTotal] = useState(0);
//   const { ar_tn } = router.query
//   const getData = useCallback(async (pageNow, perPage, isScroll) => {
//     const params = {
//       skip: pageNow * perPage,
//       limit: perPage,
//       language: "vi"
//     }
//     if (ar_tn) {
//       params['ar_tn'] = ar_tn
//     }

//     const res = await fetchAPI({
//       method: "GET",
//       url: `${API_URL}/Post/list`,
//       params
//     });
//     if (res) {
//       if (res.allCount) {
//         const { allCount, resultData } = res;
//         setTotal(allCount);
//         const newData = isScroll ? [...resultData, ...data] : resultData;
//         setData(newData);
//         setPage(pageNow + 1);
//       }
//     }
//   });

//   const Scroll = useCallback(() => {
//     if (
//       document.documentElement.scrollHeight ===
//       document.documentElement.scrollTop + window.innerHeight &&
//       total > page * 20
//     ) {
//       getData(page, 20, true);
//     }
//   }, [total, page]);

//   useEffect(() => {
//     window.addEventListener("scroll", Scroll, false);
//     return () => {
//       // returned function will be called on component unmount
//       window.removeEventListener("scroll", Scroll, false);
//     };
//   }, [total, page, Scroll]);

//   useEffect(() => {
//     getData(0, 20, false);
//   }, []);

//   function handleLink(id) {
//     router.push({
//       pathname: `/detail/${id}`,
//     })
//   }

//   useEffect(() => {
//     getData(0, 20, false);
//   }, [ar_tn]);
//   return (
//     <div>

//       {result.metadata ? (
//         <Head>
//           <title>Hodace</title>
//           <meta charSet="utf-8" />
//           <link rel="icon" href="/favicon.ico" />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <meta name="theme-color" content="#000000" />
//           <meta name="description" content="Bất động sản Hodace" />
//           <link rel="apple-touch-icon" href="/logo192.png" />
//           <link rel="manifest" href="/manifest.json" />
//           {
//             Object.keys(result.metadata).map(key => {
//               const type = result.metadata[key].type
//               const name = result.metadata[key].name
//               const property = result.metadata[key].property
//               const content = result.metadata[key].content
//               const rel = result.metadata[key].rel
//               const href = result.metadata[key].href
//               if (type === 'title') {
//                 return (<title>{content}</title>)
//               } else if (type === 'link') {
//                 return (<link rel={rel} href={href} />)
//               } else if (name && content) {

//                 return (
//                   <>
//                     <meta name={name} content={content} />
//                     <meta itemProp={name} name={name} content={content} />
//                     <meta name={`twitter:${name}`} content={content} />
//                     {property ? (<meta property={property} content={content} key={property} />) : ""}
//                   </>
//                 )
//               } else {
//                 return ""
//               }
//             })
//           }
//           <meta itemProp="image" content="https://bds-web-data.service.hodace.network/static/images/hodacenetwork.png"></meta>
//           <meta property="og:image" content="https://bds-web-data.service.hodace.network/static/images/hodacenetwork.png"></meta>
//           <meta name="twitter:image" content="https://bds-web-data.service.hodace.network/static/images/hodacenetwork.png"></meta>
//         </Head>
//       ) : null}
//       <Container className="home">
//         <div className="appbar">
//           <div id="extabar">
//             <div style={{ position: "relative" }}>
//               <div className="WE0UJf" id="slim_appbar">
//                 <div className="LHJvCe">
//                   <div id="result-stats">
//                     About {total} results
//                   <nobr> (0.64 seconds)&nbsp;</nobr>
//                     <img
//                       style={{ marginRight: 10, cursor: "pointer" }}
//                       data-toggle="tooltip"
//                       data-placement="top"
//                       title="App Hodace"
//                       src={'/static/images/apps.svg'}
//                       alt="app"
//                     />
//                     <img
//                       style={{ marginRight: 10, cursor: "pointer" }}
//                       data-toggle="tooltip"
//                       data-placement="top"
//                       title="Bộ lọc Hodace"
//                       src={'/static/images/filter_list.svg'}
//                       alt="filter"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {data.map(item => (
//           <div key={item.id} className="content_new">
//             <link
//               onClick={e => {
//                 e.preventDefault();
//                 handleLink(item.id);
//               }}
//               href="!#"
//               rel="prerender"
//             />
//             <div
//               className="rc"
//               data-hveid="CAIQAA"
//               data-ved="2ahUKEwjgj9mLmLvsAhVWw4sBHQQvCx0QFSgAMAB6BAgCEAA"
//             >
//               <div className="yuRUbf">
//                 <br />
//                 <div className="sub_new">{item.link || ""}</div>
//                 <a
//                   onClick={e => {
//                     e.preventDefault();
//                     handleLink(item.id);
//                   }}
//                   href="https://batdongsan.com.vn/"
//                   ping="/url?sa=t&source=web&rct=j&url=https://batdongsan.com.vn/&ved=2ahUKEwjgj9mLmLvsAhVWw4sBHQQvCx0QFjAAegQIAhAC"
//                 >
//                   <h2 className="title_new">
//                     <span>{item.title}</span>
//                   </h2>
//                 </a>
//               </div>
//               <div className="des_new">
//                 <div>
//                   <span>{item.fullDesc}</span>
//                   <div className="link_new">{item.shortDesc}</div>
//                   <div>
//                     {item.updatedAt ? <div>{moment(item.updatedAt).format("YYYY/MM/DD")}</div> : null}
//                     {item.ClickCount ? <div>Lượt click: {item.ClickCount}</div> : null}
//                     {item.ShareCount ? <div>Lượt chia sẻ: {item.ShareCount}</div> : null}
//                     {item.ViewCount ? <div>Lượt xem: {item.ViewCount}</div> : null}
//                     {item.DataRating ? <div>Lượng thông tin: {item.DataRating}</div> : null}
//                     {item.InvestmentRating ? <div>Điểm đầu tư : {item.InvestmentRating}</div> : null}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Container>


//     </div>
//   )
// }


// export default Page
