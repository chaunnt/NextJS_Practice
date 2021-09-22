import requestService from './request'
export const all = (
  path: string,
  filter = {}
) => {
  return requestService.send({
    method: 'get',
    path,
    params: { ...filter },
  })
}

export const view = (path: string) => {
  return requestService.send({
    method: 'get',
    path,
  })
}

export const add = (path: string, data: any = null, params = {}) => {
  return requestService.send({
    method: 'post',
    path,
    data,
    params
  })
}

export const update = (path: string, data: any, params = {}) => {
  return requestService.send({
    method: 'put',
    path,
    data,
    params,
  })
}

export const remove = (path: string) => {
  return requestService.send({
    method: 'delete',
    path,
  })
}



