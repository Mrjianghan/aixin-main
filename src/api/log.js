import request from '@/router/axios'

export function fetchList(query,url) {
  return request({
    url: url?url:'/admin/admin/log',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: '/admin/admin/log/' + id,
    method: 'delete'
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/admin/user',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/admin/user/' + id,
    method: 'get'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/admin/user',
    method: 'put',
    data: obj
  })
}
