import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
    button: {
        'search': '搜索',
        'add': '添加',
        'edit': '编辑',
        'del': '删除',
        'forbidden': '禁用',
        'permission': '权限'
    },
    table:{
        id: '序号',
        accountName: '用户名',
        mobile: '手机号',
        deptBelong: '所属部门',
        role: '角色',
        gmtCreate: '创建时间',
        status: '状态',
        operation: '操作',
        unfilled: '未填写',
        valid: '有效',
        invalid: '无效'
    },
    form:{
        inputAccName: '请输用户名',
        inputPassword: '请输入密码',
        selectdept: '请选择部门',
        selectRole: '请选择角色',
        codeForLogin: '验证码登录使用',
        selectStatus: '请选择状态',
        cancel: '取 消',
        confirm: '确 定',
    },
    ...zhLocale
}

export default cn;