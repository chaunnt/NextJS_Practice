import { Select } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../urls";
import { removeVietnameseAccent } from "../../utils/common";
import { fetchAPI } from "../../utils/fetchAPI";
import { SearchAdvanceContext, setFiltersAction, defaultValuesAction } from "./SearchAdvanceContext";

const OtherMetaSearchAdvance = ({ isShow = false } = props) => {
  const [otherMetaData, setOtherMetaData] = useState();
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
    </>
  );
};

export default OtherMetaSearchAdvance;
