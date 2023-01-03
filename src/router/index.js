import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/student1',
    component: Layout,
    name: 'StudentsInfo',
    meta: { title: '学生基本信息', icon: 'el-icon-s-help' },
    children:[
      {
        path:"studentsInfo",
        name:"StudentsInfo",
        component:()=> import ("@/views/studentsInfo"),
        meta:{title:"学生信息",icon: "table"},
      },
      {
        path:"editInfo",
        name:"EditInfo",
        component:()=>import ("@/views/studentsInfo/editInfo"),
        meta:{title:"学生信息管理",icon: "table"},
        hidden:true
      }
    ]
    // children: [
    //   {
    //     path: 'table',
    //     name: 'Table',
    //     component: () => import('@/views/table/index'),
    //     meta: { title: 'Table', icon: 'table' }
    //   },
    //   {
    //     path: 'tree',
    //     name: 'Tree',
    //     component: () => import('@/views/tree/index'),
    //     meta: { title: 'Tree', icon: 'tree' }
    //   }
    // ]
  },
  {
    path: '/student2',
    component: Layout,
    redirect: '/studentperformance',
    children: [{
      path: 'studentperformance',
      name: 'StudentPerformance',
      component: () => import('@/views/studentPerformance'),
      meta: { title: '学生成绩管理', icon: 'el-icon-collection' }
    }]
  },
  {
    path: '/student3',
    component: Layout,
    redirect: '/dailyAffairs',
    children: [{
      path: 'dailyAffairs',
      name: 'DailyAffairs',
      component: () => import('@/views/dailyAffairs'),
      meta: { title: '日常事务管理', icon: 'el-icon-edit-outline' }
    }]
  },
  {
    path: '/student4',
    component: Layout,
    redirect: '/financialInformation',
    children: [{
      path: 'financialInformation',
      name: 'FinancialInformation',
      component: () => import('@/views/financialInformation'),
      meta: { title: '财务信息管理', icon: 'el-icon-notebook-2' }
    }]
  },
  {
    path: '/student5',
    component: Layout,
    redirect: '/noticeRelease',
    children: [{
      path: 'noticeRelease',
      name: 'NoticeRelease',
      component: () => import('@/views/noticeRelease'),
      meta: { title: '留言板回复', icon: 'el-icon-chat-line-round' }
    }]
  },

 
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
}

export default router
