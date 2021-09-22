import { Select } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { API_URL, API_DEV_URL } from "../../urls";
import { removeVietnameseAccent } from "../../utils/common";
import { fetchAPI } from "../../utils/fetchAPI";
import { InputNumber, Input } from 'antd';
import { SearchAdvanceContext, setFiltersAction, defaultValuesAction } from "./SearchAdvanceContext";

const OtherMetaSearchAdvance = ({ isShow = false } = props) => {
  const [otherMetaData, setOtherMetaData] = useState();
  const [calMetaData, setCalMetaData] = useState({})
  const router = useRouter();
  const { query = {} } = router;
  const { language } = query;
  const [state, dispatch] = useContext(SearchAdvanceContext);

  const fetchOtherMetaData = async () => {
    const data = await fetchAPI({
      method: "POST",
      url: `${API_URL}/RealEstate/getOtherMeta`,
      data: {
        language: language || "Tiếng Việt - Vietnamese - VI",
      },
    });
    const calData = await fetchAPI({
      method: "POST",
      url: `${API_URL}/RealEstate/getCalculateMeta`,
      data: {
        language: language || "Tiếng Việt - Vietnamese - VI",
      },
    })
    if(calData){
      const dataCal =  Object.entries(calData).filter(item => item[1].type === 'maxmindouble').reduce( (acc, cur) => {
        acc[cur[0]] = cur[1]
        return acc
      }, {});
      setCalMetaData(dataCal)
    }
    if (data) {
      dispatch(defaultValuesAction());
      setOtherMetaData(data);
    }
    
  };
  
  useEffect(() => {
    if (isShow) {
      fetchOtherMetaData();

    }
  }, [isShow, language]);
  const onChangeInputNumber = (e) =>{
    const parseId = e.target.id.split('-')
    const type = parseId[0]
    const key = parseId[1]
    const queryObj = { ...state.filters }
    const tempData = (queryObj[key] === undefined) ? {} : queryObj[key]
    tempData[type] = e.target.value
    queryObj[key] = tempData
    dispatch(setFiltersAction(queryObj));
  }
  const onSelect = (value, dataOb) => {
    const { name } = dataOb;
    const queryObj = { ...state.filters };

    if (value && value !== "") {
      queryObj[name] = value;
    } else {
      delete queryObj[name];
    }
    dispatch(setFiltersAction(queryObj));
  };

  if (!isShow || !otherMetaData || typeof otherMetaData !== "object") {
    return null;
  }
  console.log(state,"kkkkkk")
  return (
    <>
      {Object.keys(otherMetaData).map((key, index) => {
        return (
          <Select
            key={index}
            size="large"
            style={{
              marginRight: "10px",
              marginTop: "10px",
              minWidth: "250px",
            }}
            showSearch
            name={otherMetaData[key].key || key}
            value={state.filters[otherMetaData[key].key ? otherMetaData[key].key : key]}
            placeholder={
              (otherMetaData[key] && otherMetaData[key].title) || "Chọn tất cả"
            }
            filterOption={(input, option) => {
              return option &&
                option.props &&
                typeof option.props.label === "string"
                ? removeVietnameseAccent(
                    option.props.label.toLowerCase()
                  ).indexOf(removeVietnameseAccent(input.toLowerCase())) >= 0
                : false;
            }}
            onSelect={onSelect}
          >
            <Select.Option
              name={otherMetaData[key].key || key}
              label={
                (otherMetaData[key] && otherMetaData[key].title) ||
                "Chọn tất cả"
              }
              value={""}
            >
              {(otherMetaData[key] && otherMetaData[key].title) ||
                "Chọn tất cả"}
            </Select.Option>
            {otherMetaData[key] &&
              otherMetaData[key].values.map((el, index) => {
                if (typeof el === "object") {
                  return (
                    <Select.Option
                      key={index}
                      name={otherMetaData[key].key || key}
                      label={el.label}
                      value={el.label}
                    >
                      {el.label}
                    </Select.Option>
                  );
                } else {
                  return (
                    <Select.Option
                      key={index}
                      name={otherMetaData[key].key || key}
                      label={el}
                      value={el}
                    >
                      {el}
                    </Select.Option>
                  );
                }
              })}
          </Select>
        );
      })}
      {Object.entries(calMetaData).map(([key,val]) => (
        <div key ={val.key} style={{display: 'inline-flex'}}>
          <Input
            id = {`from-${val.key}`}
            onChange={onChangeInputNumber}
            placeholder={val.title+ ' từ'}
            size ='large'
            style={{
              marginRight: "10px",
              marginTop: "10px",
              width: "120px",
            }}
            type='number'
          />
          <Input
            id = {`to-${val.key}`}
            onChange={onChangeInputNumber}
            placeholder = ' Đến'
            size ='large'
            style={{
              marginRight: "10px",
              marginTop: "10px",
              width: "120px",
            }}
            type="number"
          />
        </div>
      ))}
    </>
  );
};

export default OtherMetaSearchAdvance;
