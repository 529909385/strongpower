import fetchObject from '@/utils/fetchObject'

export function ywdwList() {
  return fetchObject({
    url: '/ywdw/list',
    method: 'get'
  })
}

export function ywdwPage() {
  return fetchObject({
    url: '/ywdw/page',
    method: 'get'
  })
}
