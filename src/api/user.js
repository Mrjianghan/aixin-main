import request from '@/router/axios'
import qs from 'qs'

export function fetchList(query) {
  return request({
    url: '/admin/admin/user',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/admin/user',
    method: 'post',
    data: qs.stringify(obj)
  })
}

export function getObj(id) {
  return request({
    url: '/admin/admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/admin/user',
    method: 'put',
    data: obj
  })
}

