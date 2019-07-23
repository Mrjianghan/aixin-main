import request from '@/router/axios'
export function GetMenu() {
    return request({
        url: '/admin/admin/menu/getSelfMenu',
        method: 'get'
    })
}
export function fetchTree(query) {
    return request({
        url: '/admin/admin/menu',
        method: 'get',
        params: query
    })
}

export function fetchAll() {
    return request({
        url: '/admin/admin/menu/navMenu',
        method: 'get'
    })
}

export function fetchUserTree() {
    return request({
        url: '/admin/admin/menu/userTree',
        method: 'get'
    })
}

export function addObj(obj) {
    return request({
        url: '/admin/admin/menu',
        method: 'post',
        data: obj
    })
}

export function getObj(id) {
    return request({
        url: '/admin/admin/menu/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return request({
        url: '/admin/admin/menu/' + id,
        method: 'delete'
    })
}

export function putObj(obj) {
    return request({
        url: '/admin/admin/menu',
        method: 'put',
        data: obj
    })
}
