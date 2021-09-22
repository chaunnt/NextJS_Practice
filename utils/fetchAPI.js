import axios from "axios";
import { toast } from 'react-toastify'
export const TOKEN_KEY = "ID_TOKEN";

export const JsonToFormData = object => {
  const formData = new FormData();
  Object.keys(object).map(key => formData.append(key, object[key]));
  return formData;
};

export const fetchAPI = async props => {
  const { method, url, params, data, formData } = props;
  // const token = localStorage.getItem(TOKEN_KEY);

  try {
    const response = await axios({
      method,
      url,
      params,
      data,
      headers: {
        // authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json"
      },
      validateStatus: () => true
    });

    if (response.data.data) {
      return response.data.data;
    }
    if (response.data) {
      return response.data;
    }
    // PUT success response
    if (response.data.message === "success") {
      return {};
    }
    if (response.data.error) {
      if (response.data.message) {
        toast.error(response.data.message);
      } else {
        toast.error("Hệ thống xảy ra lỗi");
      }
    }
    return {};
  } catch (e) {
    toast.error(e.message);
    return {};
  }
};

export const replaceUrl = (url, data) => {
  const regex = new RegExp(`:(${Object.keys(data).join("|")})`, "g");

  return url.replace(regex, (m, $1) => data[$1] || m);
};
