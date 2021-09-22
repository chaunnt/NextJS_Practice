import { Select } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../urls";
import { removeVietnameseAccent } from "../../utils/common";
import { fetchAPI } from "../../utils/fetchAPI";
import {
  AREA_DISTRICT_NAME,
  AREA_PROVINCE_NAME,
  AREA_WARD_NAME,
  QUERY_KEY,
} from "./constants";
import { SearchAdvanceContext, setFiltersAction } from "./SearchAdvanceContext";

const AreaSearchAdvance = ({ isShow = false } = props) => {
  const [areaData, setAreaData] = useState();
  const router = useRouter();
  const { query = {} } = router;
  const { language } = query;
  const [cityId, setCityId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [state, dispatch] = useContext(SearchAdvanceContext);

  const fetchAreaData = async () => {
    const data = await fetchAPI({
      method: "POST",
      url: `${API_URL}/RealEstate/getAreaMeta`,
      data: {
        language: query.language || "Tiếng Việt - Vietnamese - VI",
      },
    });
    if (data) {
      setAreaData(data);
    }
  };

  const initGeneralAreaData = (queryObj, name, queryKey) => {
    let id = "";
    if (
      areaData &&
      areaData[name] &&
      areaData[name].values &&
      queryObj[queryKey] !== id
    ) {
      const newFilter = areaData[name].values.filter(
        (item) => item.label === queryObj[queryKey]
      );
      id = newFilter[0] && newFilter[0].id ? newFilter[0].id : id;
    }
    return id;
  };

  useEffect(() => {
    if (isShow) {
      fetchAreaData();
    }
  }, [isShow, language]);

  useEffect(() => {
    if (areaData) {
      setCityId(
        initGeneralAreaData(query, AREA_PROVINCE_NAME, QUERY_KEY.PROVINCE)
      );

      setProvinceId(
        initGeneralAreaData(query, AREA_DISTRICT_NAME, QUERY_KEY.DISTRICT)
      );
    }
  }, [areaData, query]);

  if (!isShow || !areaData || typeof areaData !== "object") {
    return null;
  }

  const onSelect = (value, dataOb) => {
    const { name } = dataOb;
    const queryObj = { ...state.filters };
    if (value && value !== "") {
      queryObj[name] = value;
    } else {
      delete queryObj[name];
    }

    if (name === QUERY_KEY.PROVINCE) {
      if (queryObj[QUERY_KEY.DISTRICT]) {
        delete queryObj[QUERY_KEY.DISTRICT];
      }
      if (queryObj[QUERY_KEY.WARD]) {
        delete queryObj[QUERY_KEY.WARD];
      }
    } else if (name === QUERY_KEY.DISTRICT) {
      if (queryObj[QUERY_KEY.WARD]) {
        delete queryObj[QUERY_KEY.WARD];
      }
    }

    dispatch(setFiltersAction(queryObj));
    setCityId(
      initGeneralAreaData(queryObj, AREA_PROVINCE_NAME, QUERY_KEY.PROVINCE)
    );

    setProvinceId(
      initGeneralAreaData(queryObj, AREA_DISTRICT_NAME, QUERY_KEY.DISTRICT)
    );
  };

  return (
    <>
      {Object.keys(areaData).map((key, index) => {
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
            name={areaData[key].key || key}
            value={state.filters[areaData[key].key ? areaData[key].key : key]}
            placeholder={
              (areaData[key] && areaData[key].title) || "Chọn tất cả"
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
              name={areaData[key].key || key}
              label={(areaData[key] && areaData[key].title) || "Chọn tất cả"}
              value={""}
            >
              {(areaData[key] && areaData[key].title) || "Chọn tất cả"}
            </Select.Option>
            {areaData[key].values.map((el, index) => {
              // if it is a city
              if (
                key === AREA_PROVINCE_NAME ||
                ((!state.filters[QUERY_KEY.PROVINCE] ||
                  state.filters[QUERY_KEY.PROVINCE] === "" ||
                  cityId === el.parentId) &&
                  key === AREA_DISTRICT_NAME) ||
                ((!state.filters[QUERY_KEY.DISTRICT] ||
                  state.filters[QUERY_KEY.DISTRICT] === "" ||
                  provinceId === el.parentId) &&
                  key === AREA_WARD_NAME)
              ) {
                if (typeof el === "object") {
                  return (
                    <Select.Option
                      key={index}
                      name={areaData[key].key ? areaData[key].key : key}
                      label={el.label}
                      value={el.label}
                    >
                      {el.label}
                    </Select.Option>
                  );
                } else {
                  <Select.Option
                    key={index}
                    name={areaData[key].key ? areaData[key].key : key}
                    label={el}
                    value={el}
                  >
                    {el}
                  </Select.Option>;
                }
              }
            })}
          </Select>
        );
      })}
    </>
  );
};

export default AreaSearchAdvance;
