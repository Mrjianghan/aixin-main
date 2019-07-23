import request from '@/router/axios'
export function fetchList(query) {
  return request({
    url: '/enterprise/admin/enterprise',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/enterprise/admin/enterprise',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/enterprise/admin/enterprise/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/enterprise/admin/enterprise/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/enterprise/admin/enterprise',
    method: 'put',
    data: obj
  })
}

