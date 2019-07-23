import axios from '@/router/axios'
export default {
    modifiedEnterpriseLogo:(data) => {
        return axios({
            url:'/oss/admin/upload/logo',
            method: 'post',
            data
        })
        //上传企业头像
    },
    staffLists:(params)=>{
        return axios({
            url:'/account/admin/account/queryEpEmployee',
            method: 'get',
            params
        })
        //查看员工列表
    },
    enterpriseLists:(params)=>{
        return axios({
            url:'/enterprise/admin/enterprise/queryAll',
            method: 'get',
            params
        })
        //查看企业列表
    },
    
    queryMutipleAmount:(params)=>{
        return axios({
            url:'/account/admin/account/queryBill',
            method: 'get',
            params
        })
        // 账户综合查询
    },
    
    queryStaffAmount:(params)=>{
        return axios({
            url:'/account/admin/account/queryEmployeeAmount',
            method: 'get',
            params
        })
        // 员工余额查询
    },
	queryEpFeedback:(params)=>{
		return axios({
            url:'/core/admin/epFeedback/queryEpFeedback',
            method: 'get',
            params
        })
        // 企业反馈列表
	},
	queryEpFeedbackDetail:(params)=>{
		return axios({
            url:'/core/admin/epFeedback/queryEpFeedbackDetail',
            method: 'get',
            params
        })
        // 企业反馈详情
	},
	queryUserFeedback:(params)=>{
		return axios({
            url:'/core/admin/userFeedback/queryUserFeedback',
            method: 'get',
            params
        })
        // 用户反馈列表
	},
	queryFeedbackDetail:(params)=>{
		return axios({
            url:'/core/admin/userFeedback/queryFeedbackDetail',
            method: 'get',
            params
        })
        // 用户反馈详情
	},
	
    
    
    
    
    
    
    
}
