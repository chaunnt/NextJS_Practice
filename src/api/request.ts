import axios, { Method } from "axios"
import Swal from 'sweetalert2'
import { parseCookies } from 'nookies'

export const TOKEN_KEY = 'TOKEN';
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
  return new Promise(resolve => {
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
        authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json"
      }
    }).then(result => {
      const data = result.data

      return resolve(data)
    })

  }).catch(error => {
    const result = error.response
    Swal.fire('Oops...', result || 'API Error', 'error')
  })
}

export const replaceUrl = (url: string, data: any) => {
  const regex = new RegExp(":(" + Object.keys(data).join("|") + ")", "g")

  return url.replace(regex, (m, $1) => data[$1] || m)
}
export default {
  send
}
