import request from '@/router/axios'

export function fetchTree(query) {
  return request({
    url: '/admin/admin/dept',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/admin/dept',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/admin/dept/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/admin/dept/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/admin/dept',
    method: 'put',
    data: obj
  })
}
