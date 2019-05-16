import request from '@/utils/request'

export function loginByUsername(data) {
  return request({
    // url: '/login/login',
    url: '/api/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    // data
    params: { token }
  })
}

