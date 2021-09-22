import { add } from './index'

function fetchPost(filter = {}) {
  const path = `Post/list`
  return add(path, filter)
}

export {
  fetchPost
}
