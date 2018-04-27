import fetchObject from '@/utils/fetchObject'

export function userList() {
  return fetchObject({
    url: '/user/list',
    method: 'get'
  })
}

export function userPage() {
  return fetchObject({
    url: '/user/page',
    method: 'get'
  })
}
