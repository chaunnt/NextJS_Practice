import React from 'react';
import { useRouter } from 'next/router';
import { Container } from '@material-ui/core';
import { fetchAPI } from '../../utils/fetchAPI';
import { API_URL } from '../../urls';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { buildPathnameForListPage } from '../../utils/urlUtils';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  IconCategoryOutlined,
  IconCheck,
  IconWarning,
  IconArrowRight,
  IconChartOutlined,
  IconCityOutlined,
  IconCoinOutlined,
  IconLikeOutlined,
  IconListOutlined,
  IconLocationOutlined,
  IconUnLikeOutlined,
  IconShare,
  IconClick,
  IconVisibility,
  IconStar,
} from '../../public/static/icons';
function Detail({ data = {} }) {

  const router = useRouter();

  function copyToClipboard(text) {
    var selected = false
    var el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    if (document.getSelection().rangeCount > 0) {
      selected = document.getSelection().getRangeAt(0);
    }
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
      document.getSelection().removeAllRanges()
      document.getSelection().addRange(selected)
    }
  }

  const exchangeCurrency = str => {
    const currencyUnit = ['đồng', 'ngàn', 'triệu', 'tỷ']
    let [num, ...unknown] = str.toString().split('.')
    let reversedNum = num.split('').reverse().join('')
    const strArr = []
    for (const [i, unit] of currencyUnit.entries()) {
      num = reversedNum.substring(0, 3) || reversedNum
      num = parseInt(num.split('').reverse().join(''))
      if (num != 0) {
        strArr.push(`${num} ${unit}`)
      }
      if (!reversedNum.substring(3)) break
      reversedNum = reversedNum.substring(3)
    }

    return strArr.reverse().join(' ')
  }

  const copyCurrentUrl = e => {
    e.preventDefault()
    e.persist()
    const link = window.location.href
    copyToClipboard(link)
    toast.success('Đã copy link thành công')
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel({ children, value, index, ...other }) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div p={3}>
            <div>{children}</div>
          </div>
        )}
      </div>
    );
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
          {Object.keys(data.metadata).map((key) => {
            const type = data.metadata[key].type;
            const name = data.metadata[key].name;
            const content = data.metadata[key].content;
            const rel = data.metadata[key].rel;
            const href = data.metadata[key].href;
            const property = data.metadata[key].property;
            if (type === 'title') {
              return <title>{content}</title>;
            } else if (type === 'link') {
              return <link rel={rel} href={href} />;
            } else if (content) {
              return (
                <>
                  {name && content ? <meta name={name} content={content} /> : ''}
                  {name && content ? <meta itemProp={name} name={name} content={content} /> : ''}
                  {name && content ? <meta name={`twitter:${name}`} content={content} /> : ''}
                  {property && content ? <meta property={property} content={content} key={property} /> : ''}
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
      ) : (
          <div></div>
        )}

      {data ? (
        <Container className="detailView">
          <div style={{ margin: '0 auto' }}>
            <div className="bacon-blog-post bacon-shadow">
              <img
                src="/static/images/hodacenetwork.png"
                className="wp-post-image"
                alt="hodacenetwork"
                title="hodacenetwork"
                loading="lazy"
              />
              <div className="bacon-blog-post-inner">
                <div className="back-content">
                  <h1>
                    <a
                      onClick={(e) => e.preventDefault()}
                      href="!#"
                      rel="bookmark"
                      title="Permanent link to Finding What Challenges You"
                      className="title-row"
                    >
                      {data.title}
                      <button
                        style={{ color: '#fff', marginLeft: '10px', cursor: 'copy' }}
                        className="btn"
                        onClick={() => {
                          const link = window.location.href;
                          copyToClipboard(link);
                          toast.success('Đã copy link thành công');
                        }}
                      >
                        Copy link
                      </button>
                    </a>
                  </h1>
                  <div
                    onClick={() => {
                      router.push({
                        pathname: buildPathnameForListPage(router.query),
                        query: {
                          ...router.query,
                        },
                      });
                    }}
                    className="backBtn"
                  >
                    <span className="line tLine"></span>
                    <span className="line mLine"></span>
                    <span className="label">Trở về</span>
                    <span className="line bLine"></span>
                  </div>
                </div>
              </div>
              <div style={{ background: '#F8F8F8' }}>
                <Tabs
                  variant="fullWidth"
                  TabIndicatorProps={{ style: { background: '#A7BF2E' } }}
                  value={value}
                  onChange={handleChange}
                >
                  <Tab label="Trạng Thái" />
                  <Tab label="Thông Tin" />
                  <Tab label="Liên Hệ" />
                </Tabs>
              </div>
              <TabPanel value={value} index={0}>
                <div className="details-container">
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Các hạng mục đã kiểm tra</p>
                      <p>7 hạng mục</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <IconCategoryOutlined /> <span>Quy Hoạch</span>
                        </div>
                        <p className="item__value">{data.StatusCheckDateLandPlanning || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconLocationOutlined /> <span>Vị trí tọa độ</span>
                        </div>
                        <p className="item__value">{data.StatusCheckDateLandPosition || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconListOutlined /> <span>Loại bài đăng</span>
                        </div>
                        <p className="item__value">{data.StatusCheckDateSystemRecordType || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconCityOutlined /> <span>Tiện ích xung quanh</span>
                        </div>
                        <p className="item__value">{data.StatusCheckDateLandConvenience || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconChartOutlined /> <span>Giá trị đầu tư</span>
                        </div>
                        <p className="item__value">{data.StatusCheckDateInvestmentValue || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconCoinOutlined /> <span>Giá trị cho vay</span>
                        </div>
                        <p className="item__value">{data.StatusCheckDateRentableValue || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconLikeOutlined /> <span>Ưu điểm</span>
                        </div>
                        <p className="item__value">{data.StatusCheckDateStrongPoint || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconUnLikeOutlined /> <span>Nhược điểm</span>
                        </div>
                        <p className="item__value">{data.StatusCheckDateWeakPoint || '__'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Trạng thái bài đăng</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <p>Ngày cập nhật</p>
                        <p className="item__value">{data.JuridicalUpdates || '__'}</p>
                      </div>
                      <div className="item">
                        <p>Loại bài đăng</p>
                        <p className="item__value">{data.SystemPostType || '__'}</p>
                      </div>
                      <div className="item">
                        <p>Loại BĐS</p>
                        <p className="item__value">{data.AreaTypeName || '__'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Tương tác bài đăng</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <IconVisibility /> <span>Lượt view</span>
                        </div>
                        <p className="item__value">{data.ViewCount || '0'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconShare /> <span>Lượt share</span>
                        </div>
                        <p className="item__value">{data.ShareCount || '0'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconClick /> <span>Lượt Click</span>
                        </div>
                        <p className="item__value">{data.ClickCount || '0'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconStar /> <span>Điểm đầu tư</span>
                        </div>
                        <p className="item__value">{data.InvestmentRating || '0'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Nguồn bài viết</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <a href={data.SystemSourceLink || ''} style={{ color: '#A7BF2E' }}>
                          <ins>{data.SystemSourceLink || ''}</ins>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="details-container">
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Khu vực</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <p>Tỉnh/Thành phố</p>
                        </div>
                        <p className="item__value">{data.AreaProvinceName || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Quận/Huyện</p>
                        </div>
                        <p className="item__value">{data.AreaDistrictName || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Phường/Xã</p>
                        </div>
                        <p className="item__value">{data.AreaWardName || '__'}</p>
                      </div>
                      {data.LocationStreetName && (
                        <div className="item">
                          <div className="item__name">
                            <p>Đường phố</p>
                          </div>
                          <p className="item__value">{data.LocationStreetName}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Thông số Nhà</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <p>Số tầng </p>
                        </div>
                        <p className="item__value">{data.HouseFloors || '__'} phòng</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Số phòng ngủ</p>
                        </div>
                        <p className="item__value">{data.HouseBedRooms || '__'} phòng</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Số toliet</p>
                        </div>
                        <p className="item__value">{data.HouseToilets || '__'} phòng</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Số phòng khách</p>
                        </div>
                        <p className="item__value">{data.HouseLivingRooms || '__'} phòng</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Số Phòng bếp</p>
                        </div>
                        <p className="item__value">{data.HouseKitchens || '__'} phòng</p>
                      </div>
                      {data.HouseCompleteName && (
                        <div className="item">
                          <div className="item__name">
                            <p>Mức độ hoàn thiện</p>
                          </div>
                          <p className="item__value">{data.HouseCompleteName}</p>
                        </div>
                      )}
                      {data.HouseConstructionSquare && (
                        <div className="item">
                          <div className="item__name">
                            <p>Diện tích xây dựng</p>
                          </div>
                          <p className="item__value">{data.HouseConstructionSquare}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Thông tin pháp lý bất động sản</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <p>Loại giấy tờ</p>
                        </div>
                        <p className="item__value">{data.JuridicalName || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Tình trạng pháp lý</p>
                        </div>
                        <p className="item__value">{data.JuridicalUsingStatusName || '__'}</p>
                      </div>

                      <div className="item">
                        <div className="item__name">
                          <p>Tình trạng của BĐS</p>
                        </div>
                        <p className="item__value">{data.JuridicalStatusName || '__'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Giá trị bất động sản</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <p>Giá rao bán</p>
                        </div>
                        <p className="item__value">{data.ValueSalePrice || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Giá cho thuê</p>
                        </div>
                        <p className="item__value">{data.ValueRentPrice || '__'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Phân tích giá trị đầu tư của bất động sản</p>
                    </div>
                    <i className="item__value--gray">
                      Lưu ý: Giá trị được phán đoán bởi hệ thống trí Thông minh nhân tạo. Giá trị chỉ mang tính chất
                      tham khảo
                    </i>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <p>Giá cho thuê dự kiến</p>
                        </div>
                        <p className="item__value">{data.PlanRentPrice || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Giá bán dự kiến</p>
                        </div>
                        <p className="item__value">{data.ValueSalePrice || '__'}</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Tỉ suất lợi nhuận</p>
                        </div>
                        <p className="item__value">{data.PlanProfitPercentage || '__'}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Ưu điểm bất động sản</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <IconCheck className="icon-large" /> <span>Gần chợ</span>
                        </div>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconCheck className="icon-large" /> <span>Gần bệnh viện</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Nhược điểm bất động sản</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <IconWarning className="icon-large" /> <span>Hẻm đâm</span>
                        </div>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconWarning className="icon-large" /> <span>Hẻm cụt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Các ưu điểm khác</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <IconCheck className="icon-large" />
                          <span>Phong thủy tốt</span>
                        </div>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconCheck className="icon-large" /> <span>Hàng xóm thân thiện</span>
                        </div>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <IconCheck className="icon-large" />
                          <span>Chủ nhà tốt bụng</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="details-container">
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Nội dung mô tả</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <p className="details__title--second">{data.fullDesc}</p>
                      </div>
                      <a>
                        <ins style={{ fontWeight: 700 }}>Đọc thêm</ins>
                      </a>
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Thông tin liên hệ</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <p>Tên</p>
                        </div>
                        <ins className="item__value--green">{data.ContactName || '__'}</ins>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Email</p>
                        </div>
                        <ins className="item__value--green">{data.ContactMail || '__'}</ins>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Số điện thoại</p>
                        </div>
                        <ins className="item__value--green">{data.ContactPhone || '__'}</ins>
                      </div>
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Phân tích thông tin liên hệ bất động sản</p>
                    </div>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <p>Phấn đoán</p>
                        </div>
                        <p className="item__value">Môi giới</p>
                      </div>
                      <div className="item">
                        <div className="item__name">
                          <p>Tỷ lệ</p>
                        </div>
                        <p className="item__value">30%</p>
                      </div>
                      <div className="item item--flex">
                        <div className="item__name">
                          <p>Lý do xác định</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p className="item__value">Đăng bài nhiều</p>
                          <p className="item__value">Có xác thực</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="details">
                    <div className="details__title">
                      <p className="details__title--first">Tra cứu thông tin liên quan</p>
                    </div>
                    <i className="item__value--gray">Dữ liệu được thu thập từ mọi nguồn trên internet</i>
                    <div className="details__list">
                      <div className="item">
                        <div className="item__name">
                          <p>Tra cứu theo tên người liên hệ</p>
                        </div>
                        <a>
                          <IconArrowRight />
                        </a>
                      </div>
                      <div className="item">
                        <div className="item__name">Tra cứu theo sđt người liên hệ</div>
                        <a>
                          <IconArrowRight />
                        </a>
                      </div>
                      <div className="item">
                        <div className="item__name">Tra cứu theo email người liên hệ</div>
                        <a>
                          <IconArrowRight />
                        </a>
                      </div>

                      <div className="item">
                        <div className="item__name">Bất động sản cùng con đường</div>
                        <a>
                          <IconArrowRight />
                        </a>
                      </div>
                      <div className="item">
                        <div className="item__name">Bất động sản cùng khu vực (phường)</div>
                        <a>
                          <IconArrowRight />
                        </a>
                      </div>
                      <div className="item">
                        <div className="item__name">Dữ liệu người liên hệ xung quanh</div>
                        <a>
                          <IconArrowRight />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              {/* <p>{data.fullDesc ? <div dangerouslySetInnerHTML={{ __html: data.fullDesc || '' }}></div> : null}</p> */}
            </div>
          </div>
        </Container>
      ) : (
          <p style={{ textAlign: 'center' }}>Không có dữ liệu</p>
        )}
    </>
  );
}

export default Detail;

export async function getServerSideProps(props) {
  const { params, query } = props;
  const { id } = params;
  const { language } = query;

  const newData = {
    id,
    mode: 'raw',
  };
  if (language && language !== '') {
    newData.language = language;
  }
  const result = await fetchAPI({
    method: 'GET',
    url: `${API_URL}/Post/searchById`,
    params: newData,
  });

  return {
    props: {
      data: result || {},
    },
  };
}
