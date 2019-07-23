import request from '@/router/axios'
import qs from'qs'

export function roleList() {
  return request({
    url: '/admin/admin/role',
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: '/admin/admin/role',
    method: 'get',
    params: query
  })
}

export function deptRoleList(deptId) {
  return request({
    url: '/admin/admin/role',
    method: 'get',
    params:{
      limit:100
    }
  })
}

export function getObj(id) {
  return request({
    url: '/admin/admin/role/' + id,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/admin/role',
    method: 'post',
    data: qs.stringify(obj)
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/admin/role',
    method: 'put',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/admin/admin/role/' + id,
    method: 'delete'
  })
}

export function permissionUpd(data) {
  return request({
    url: '/admin/admin/role/updatePermission',
    method: 'post',
      data:qs.stringify(data,{ arrayFormat: 'repeat' })
  })
}

export function fetchRoleTree(roleId) {
  return request({
    url: '/admin/admin/menu/getMenuIdByRoleId/'+roleId,
    method: 'get'
  })
}

export function fetchDeptTree(query) {
  return request({
    url: '/admin/admin/dept',
    method: 'get',
    params: query
  })
}
