const _import = require('./_import');
import Layout from '@/page/index/'

export default [{
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
      path: 'index',
      name: '首页',
      component: _import('wel')
    }]
  },
  {
    path: '/crud',
    component: Layout,
    redirect: '/crud/index',
    children: [{
      path: 'index',
      name: 'crud实例',
      component: _import('crud/index', 'views')
    }]
  },
  {
    path: '/',
    name: '主页',
    redirect: '/wel'
  },
    {
    menuId: 1,
    path: '/admin',
    component: Layout,
    name: '系统管理',
    hidden: false,
    redirect: '/admin/user',
    meta: {
      title: '系统管理',
    },
    children: [{
        menuId: 2,
        path: 'user',
        component: _import('admin/user/index', 'views'),
        name: '用户管理',
        meta: {
          title: '用户管理'
        }
      },
      {
        menuId: 3,
        path: 'menu',
        component: _import('admin/menu/index', 'views'),
        name: '菜单管理',
        meta: {
          title: '菜单管理'
        }
      },
      {
        menuId: 4,
        path: 'role',
        component: _import('admin/role/index', 'views'),
        name: '角色管理',
        meta: {
          title: '角色管理'
        }
      },
      {
        menuId: 5,
        path: 'dept',
        component: _import('admin/dept/index', 'views'),
        name: '部门管理',
        meta: {
          title: '部门管理',
          keepAlive: true
        }
      },
      {
        menuId: 6,
        path: 'dict',
        component: _import('admin/dict/index', 'views'),
        name: '字典管理',
        meta: {
          title: '字典管理'
        }
      },
      {
        menuId: 7,
        path: 'log',
        component: _import('admin/log/index', 'views'),
        name: '日志管理',
        meta: {
          title: '日志管理'
        }
      }, 
      {
        menuId: 11,
        path: 'enterprise',
        component: _import('enterprise/enterprise/index', 'views'),         
        name: '企业管理',
        meta: {
          title: '企业管理'
        }
      },   
    {
        menuId: 10,
        path: 'staff',
        component: _import('enterprise/enterprise/staff', 'views'),
        name: '员工查看',
        meta: {
          title: '员工查看'
        }
      },             
        

    ]
  },
         {
            menuId: 20,
            path: '/query',
            component: Layout,
            name: '统计查询',
            hidden: false,
            redirect: '/query/multiplequery',
            meta: {
              title: '统计查询',
            },
            children: [
                {
                    menuId: 21,
                    path: 'multiplequery',
                    component: _import('query/multiplequery', 'views'),
                    name: '账户综合查询',
                    meta: {
                      title: '账户综合查询'
                    }
              },
                {
                    menuId: 22,
                    path: 'staffquery',
                    component: _import('query/staffquery', 'views'),
                    name: '员工余额查询',
                    meta: {
                      title: '员工余额查询'
                    }
              }

            ]
         },
				 {
					menuId: 30,
					path: '/feed',
					component: Layout,
					name: '反馈',
					hidden: false,
					redirect: '/feed/enterprise',
					meta: {
					  title: '反馈',
					},
					children: [
						{
							menuId: 31,
							path: 'enterprise',
							component: _import('feedback/enterpriseFeed', 'views'),
							name: '企业反馈',
							meta: {
							  title: '企业反馈'
							}
					  },
						{
							menuId: 32,
							path: 'staff',
							component: _import('feedback/staffFeed', 'views'),
							name: '用户反馈',
							meta: {
							  title: '用户反馈'
							}
					  }
					]
				 }
]
