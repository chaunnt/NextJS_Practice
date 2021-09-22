import { add } from './index'
import axiosInstance from '@/api/interceptors'
import { CONFIGURATION } from '@/constants/configuration'

function fetchPost(filter = {}) {
  const path = `Post/list`
  return add(path, filter)
}

export {
  fetchPost
}

export const getPosts = (params: any = null) => {
  const data = {
    skip: 0,
    ...params,
  }
  return axiosInstance.post(CONFIGURATION.API_ENDPOINT + '/RealEstateRecord/postList', data)
    .then(response => {
      return response.data.data
    })
    .catch(err => {
      throw err
    })
}
