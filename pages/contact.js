import React, { useCallback, useEffect, useState } from 'react';
import { API_URL } from '../urls';
import { fetchAPI } from '../utils/fetchAPI';
import { Divider, Input, Tabs, Row, Col, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Province from '../josn/tinh_tp.json'
const { TabPane } = Tabs;
const { Option } = Select;
export default function Contact(props) {
  const { result = {} } = props;
  const [listProvince,setListProvince] = useState([])
  const nav = [
    {
      name: 'Tìm theo số điện thoại',
      id: 1,
    },
    {
      name: 'Tìm theo địa chỉ',
      id: 2,
    },
  ];
  const [indexNav, setIndexNav] = useState(2);
  var feed = {created_at: "2017-03-14T01:00:32Z", entry_id: 33358, field1: "4", field2: "4", field3: "0"};
  useEffect(()=>{
    var data = [];
    data.push(Province);
    setListProvince([...data])
    console.log('data',data[0])
  },[])


  return (
    <div className="row d-flex justify-content-center contact">
      <div className="content col-12">
        <Row justify="center">
            <Col md={6} xs={12}>
            <img
            src="/static/images/logo.png"
            className="logo"
            alt="hodacenetwork"
            title="hodacenetwork"
            loading="lazy"
          /></Col>
        </Row>
       {/* <div className="row d-flex justify-content-center ">
       <div className="col-6">
          <img
            src="/static/images/logo.png"
            className="logo"
            alt="hodacenetwork"
            title="hodacenetwork"
            loading="lazy"
          />
        </div>
       </div>
         */}
        <p className="text-introduce mt-3 ">Website tổng hợp dữ liệu bất động sản lớn nhất Việt Nam</p>
        <ul className="nav justify-content-center d-flex align-items-center mt-5 text-title">
          {nav.map((item, idx) => {
            return (
              <div className="justify-content-center d-flex align-items-center">
                <li className="nav-item">
                  <a
                    className={`${item.id === indexNav ? 'text-active' : 'text-disabled'}`}
                    onClick={() => setIndexNav(item.id)}
                  >
                    {item.name}
                  </a>
                </li>
                {nav.length - 1 !== idx && <Divider type="vertical" className="divider" />}
              </div>
            );
          })}
        </ul>
        <div className="content-tab">
          {indexNav === 1 ? (
            <Row justify="center">
              <Col xs={24} md={16}>
                <Input
                  size="large"
                  placeholder="Nhập tìm kiếm liên hệ theo số điện thoại"
                  prefix={<SearchOutlined className="icon-search" />}
                  className="search-text"
                />
              </Col>
            </Row>
          ) : (
            <div>
              <Row justify="center">
                <Col xs={24} md={16}>
                  <Input
                    size="large"
                    placeholder="Nhập tìm kiếm liên hệ theo địa chỉ"
                    prefix={<SearchOutlined className="icon-search" />}
                    className="search-text"
                  />
                </Col>
              </Row>
              <Row justify="center mt-4">
                <Col xs={24} md={16}>
                  <Row justify="space-between">
                  <Col span={7}>
                    <Select  className="w-100" size="large" placeholder="Tỉnh / Thành phố">
                      {listProvince.map((item,idx)=>{
                        return <Option value={item.name}>{item.name}</Option>
                      })}
                        
                      </Select>
                    </Col>
                    <Col span={7}>
                      <Select placeholder="Quận / Huyện" className="w-100" size="large">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </Col>
                 
                    <Col span={7}>
                    <Select  className="w-100" size="large" placeholder="Xã / Phường">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
       
       )}
        </div>
      </div>
    </div>
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
