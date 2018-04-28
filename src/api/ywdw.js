import fetchObject from '@/utils/fetchObject'

export function ywdwList() {
  return fetchObject({
    url: '/ywdw/list',
    method: 'get'
  })
}

export function ywdwPage(query) {
  return fetchObject({
    url: '/ywdw/page',
    method: 'post',
    params: query
  })
}

export function ywdwUpdate(datas) {
  return fetchObject({
    url: '/ywdw/update',
    method: 'post',
    data: datas
  })
}
export function ywdwAdd(datas) {
  return fetchObject({
    url: '/ywdw/insert',
    method: 'post',
    data: datas
  })
}
