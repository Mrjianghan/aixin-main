import { baseUrl, khglUrl, dicUrl } from '@/config/env'
import request from '@/router/axios'
import qs from 'qs'


// import { userInfo, tableData } from '@/mock/user'
// import { menu, menuAll } from '@/mock/menu'
export const loginByUsername = (username, password, code, randomStr) => {
    var grant_type = 'password'
    var scope = 'server'
    return request({
        url: '/admin/admin/login',
        method: 'post',
        params: { username, password, randomStr, code, grant_type, scope }
    })
}

export function mobileLogin(mobile, code) {
  var grant_type = 'mobile'
  var scope = 'server'
  return request({
    url: '/admin/auth/mobile/token',
    method: 'post',
    params: { mobile, code, grant_type, scope }
  })
}

export const getUserInfo = () => {
    return request({
        url: '/admin/admin/user/info',
        method: 'get'
    })
}

//export const logout = (accesstoken) => {
//    return request({
//        url: '/admin/admin/logout',
//        method: 'post',
//        params: { accesstoken }
//    })
//}

export const logout = (data) => {
    return request({
        url: '/admin/admin/logout',
        method: 'post',
        data:qs.stringify(data)
    })
}
