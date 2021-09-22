import axios, { Method } from "axios"
import Swal from 'sweetalert2'
import { parseCookies } from 'nookies'

export const TOKEN_KEY = 'Hodace';
interface Props {
  method: Method
  path: string
  params?: any
  data?: any
  formData?: boolean
  hasTotal?: boolean
  isDownload?: boolean
}

export const JsonToFormData = (object: JSON) => {
  const formData = new FormData()
  // @ts-ignore
  Object.keys(object).map(key => formData.append(key, object[key]))
  return formData
}

export function send(props: Props) {
  return new Promise((resolve, reject) => {
    const {
      method,
      path,
      params,
      data,
      formData,
    } = props
    const cookies = parseCookies()
    const token = cookies[TOKEN_KEY]
    const newUrl = process.env.API_URL + path

    axios({
      method,
      url: newUrl,
      params,
      data,
      headers: {
        authorization: `${TOKEN_KEY}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json"
      }
    })
      .then(result => {
        const data = result.data;
        // console.log('dddaaaataaaadata: ', data);
        return resolve(data);
      }).catch(error => {
        const result = error.response;
        // console.log('errorrrr: ', result);
        return reject(error);
      })
  })
    .catch(error => {
        const result = error.response;
        console.log('errorrrr: ', result);
        Swal.fire('Oops...', error || 'API Error', 'error');
        return result.data;
    })
}

export const replaceUrl = (url: string, data: any) => {
  const regex = new RegExp(":(" + Object.keys(data).join("|") + ")", "g")

  return url.replace(regex, (m, $1) => data[$1] || m)
}
export default {
  send
}
