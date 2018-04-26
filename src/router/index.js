import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will no redirct in the levelbar
* noDropdown : if `noDropdown:true` will has no submenu
* meta : { role: ['admin'] }  will control the page role
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'people',
    noDropdown: true,
    children: [{ path: 'index', component: _import('introduction/index'), name: '简述' }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/systemmanagement',
    component: Layout,
    redirect: 'noredirect',
    name: '系统管理',
    icon: 'clipboard',
    children: [
      { path: 'unitMsg', component: _import('systemmanagement/UnitMsg'), name: '单位管理' },
      { path: 'roleMsg', component: _import('systemmanagement/RoleMsg'), name: '角色管理' },
      { path: 'userMsg', component: _import('systemmanagement/UserMsg'), name: '用户管理' },
      { path: 'powerSupplyZone', component: _import('systemmanagement/PowerSupplyZone'), name: '供电分区划分' },
      {
        path: '/systemmanagement/basicCodeTable',
        redirect: '/systemmanagement/basicCodeTable/donorSiteType',
        component: _import('systemmanagement/basiccodetable/index'),
        name: '基础码表',
        children: [
          { path: 'donorSiteType', component: _import('systemmanagement/basiccodetable/DonorSiteType'), name: '供区类型划分' },
          { path: 'connectionInformation', component: _import('systemmanagement/basiccodetable/ConnectionInformation'), name: '接线信息' },
          { path: 'voltageParameter', component: _import('systemmanagement/basiccodetable/VoltageParameter'), name: '电压参数' },
          { path: 'distributionAutomation', component: _import('systemmanagement/basiccodetable/DistributionAutomation'), name: '配电自动化' },
          { path: 'powerGridOperationIndex', component: _import('systemmanagement/basiccodetable/PowerGridOperationIndex'), name: '电网运行指标' },
          { path: 'powerGridDistributionEquipment', component: _import('systemmanagement/basiccodetable/PowerGridDistributionEquipment'), name: '电网配变设备' },
          { path: 'wireRange', component: _import('systemmanagement/basiccodetable/WireRange'), name: '导线截面' }
        ]
      }
    ]
  },
  {
    path: '/basicinformation',
    component: Layout,
    redirect: 'noredirect',
    name: '基础信息',
    icon: 'people',
    children: [
      { path: 'regionalProfileInformation', component: _import('basicinformation/RegionalProfileInformation'), name: '地区概况信息' }
    ]
  },
  {
    path: '/equipmentinformation',
    component: Layout,
    redirect: 'noredirect',
    name: '设备信息',
    icon: 'EquipmentInformation',
    children: [
      { path: 'substationInformation', component: _import('equipmentinformation/SubstationInformation'), name: '变电站信息' }
    ]
  },
  {
    path: '/runninginformation',
    component: Layout,
    redirect: 'noredirect',
    name: '运行信息',
    icon: 'RunningInformation',
    children: [
      { path: 'substationOperationInformation', component: _import('runninginformation/SubstationOperationInformation'), name: '变电站运行信息' }
    ]
  },
  {
    path: '/powergridprojectmanagement',
    component: Layout,
    redirect: 'noredirect',
    name: '电网项目管理',
    icon: 'powergridprojectmanagement',
    children: [
      { path: 'planningProjectInformation', component: _import('powergridprojectmanagement/PlanningProjectInformation'), name: '规划项目信息' }
    ]
  },
  {
    path: '/systeminterface',
    component: Layout,
    redirect: 'noredirect',
    name: '系统接口',
    icon: 'clipboard',
    children: [
      {
        path: '/systeminterface/dispinterface',
        redirect: '/systeminterface/dispinterface/dispatchingEquipmentAssociation',
        component: _import('systeminterface/dispinterface/index'),
        name: '调度接口',
        children: [
          { path: 'dispatchingEquipmentAssociation', component: _import('systeminterface/dispinterface/DispatchingEquipmentAssociation'), name: '调度设备关联' }
        ]
      }
    ]
  },
  {
    path: '/parametercalculation',
    component: Layout,
    redirect: 'noredirect',
    name: '参数计算',
    icon: 'clipboard',
    children: [
      {
        path: '/parametercalculation/N-1effect',
        redirect: '/parametercalculation/N-1effect/N-1Calculation',
        component: _import('parametercalculation/N-1effect/index'),
        name: 'N-1效验',
        children: [
          { path: 'donorSiteType', component: _import('parametercalculation/N-1effect/N-1Calculation'), name: 'N-1计算' },
          { path: 'connectionInformation', component: _import('parametercalculation/N-1effect/ConnectionInformation'), name: '变电站N-1信息' }
        ]
      }
    ]
  },
  {
    path: '/resourcemanagement',
    component: Layout,
    redirect: 'noredirect',
    name: '资源管理',
    icon: 'powergridprojectmanagement',
    children: [
      { path: '220KVIntervalManagement', component: _import('resourcemanagement/220KVIntervalManagement'), name: '220KV间隔管理' }
    ]
  },
  {
    path: '/comprehensivestatistics',
    component: Layout,
    redirect: 'noredirect',
    name: '综合统计',
    icon: 'powergridprojectmanagement',
    children: [
      { path: 'statisticalAnalysisOfSubstation', component: _import('comprehensivestatistics/StatisticalAnalysisOfSubstation'), name: '变电站统计分析' }
    ]
  },
  {
    path: '/datamanagement',
    component: Layout,
    redirect: 'noredirect',
    name: '资料管理',
    icon: 'powergridprojectmanagement',
    children: [
      { path: 'comprehensiveInformation', component: _import('datamanagement/ComprehensiveInformation'), name: '综合资料' }
    ]
  },
  {
    path: '/reportmanagement',
    component: Layout,
    redirect: 'noredirect',
    name: '报表管理',
    icon: 'powergridprojectmanagement',
    children: [
      { path: 'statusStatisticsOfSubstation', component: _import('reportmanagement/StatusStatisticsOfSubstation'), name: '变电站现状规模统计' }
    ]
  },
  {
    path: '/test',
    component: Layout,
    icon: 'icon',
    noDropdown: true,
    children: [{ path: 'test', component: _import('test/index'), name: '测试' }]
  },
  {
    path: '/icon',
    component: Layout,
    icon: 'icon',
    noDropdown: true,
    children: [{ path: 'index', component: _import('svg-icons/index'), name: 'icons' }]
  },
  /* {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: '权限测试',
    icon: 'lock',
    meta: { role: ['admin'] },
    noDropdown: true,
    children: [{ path: 'index', component: _import('permission/index'), name: '权限测试页', meta: { role: ['admin'] }}]
  },
  {
    path: '/icon',
    component: Layout,
    icon: 'icon',
    noDropdown: true,
    children: [{ path: 'index', component: _import('svg-icons/index'), name: 'icons' }]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'component',
    children: [
      { path: 'index', component: _import('components/index'), name: '介绍 ' },
      { path: 'tinymce', component: _import('components/tinymce'), name: '富文本编辑器' },
      { path: 'markdown', component: _import('components/markdown'), name: 'Markdown' },
      { path: 'jsoneditor', component: _import('components/jsonEditor'), name: 'JSON编辑器' },
      { path: 'dndlist', component: _import('components/dndList'), name: '列表拖拽' },
      { path: 'splitpane', component: _import('components/splitpane'), name: 'SplitPane' },
      { path: 'avatarupload', component: _import('components/avatarUpload'), name: '头像上传' },
      { path: 'dropzone', component: _import('components/dropzone'), name: 'Dropzone' },
      { path: 'sticky', component: _import('components/sticky'), name: 'Sticky' },
      { path: 'countto', component: _import('components/countTo'), name: 'CountTo' },
      { path: 'mixin', component: _import('components/mixin'), name: '小组件' },
      { path: 'backtotop', component: _import('components/backToTop'), name: '返回顶部' }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    name: '图表',
    icon: 'chart',
    children: [
      { path: 'index', component: _import('charts/index'), name: '介绍' },
      { path: 'keyboard', component: _import('charts/keyboard'), name: '键盘图表' },
      { path: 'keyboard2', component: _import('charts/keyboard2'), name: '键盘图表2' },
      { path: 'line', component: _import('charts/line'), name: '折线图' },
      { path: 'mixchart', component: _import('charts/mixChart'), name: '混合图表' }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '综合实例',
    icon: 'example',
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/table',
        name: 'Table',
        icon: 'table',
        children: [
          { path: 'dynamictable', component: _import('example/table/dynamictable/index'), name: '动态table' },
          { path: 'dragtable', component: _import('example/table/dragTable'), name: '拖拽table' },
          { path: 'inline_edit_table', component: _import('example/table/inlineEditTable'), name: 'table内编辑' },
          { path: 'table', component: _import('example/table/table'), name: '综合table' }
        ]
      },
      { path: 'form/edit', icon: 'form', component: _import('example/form'), name: '编辑Form', meta: { isEdit: true }},
      { path: 'form/create', icon: 'form', component: _import('example/form'), name: '创建Form' },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'Tab' }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    icon: '404',
    children: [
      { path: '401', component: _import('errorPage/401'), name: '401' },
      { path: '404', component: _import('errorPage/404'), name: '404' }
    ]
  },
  {
    path: '/errlog',
    component: Layout,
    redirect: 'noredirect',
    name: 'errlog',
    icon: 'bug',
    noDropdown: true,
    children: [{ path: 'log', component: _import('errlog/index'), name: '错误日志' }]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/download',
    name: 'excel',
    icon: 'excel',
    children: [
      { path: 'download', component: _import('excel/index'), name: 'export excel' },
      { path: 'download2', component: _import('excel/selectExcel'), name: 'export selected' },
      { path: 'upload', component: _import('excel/uploadExcel'), name: 'upload excel' }
    ]
  },
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    name: 'zip',
    icon: 'zip',
    children: [
      { path: 'download', component: _import('zip/index'), name: 'export zip' }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    name: 'theme',
    icon: 'theme',
    noDropdown: true,
    children: [{ path: 'index', component: _import('theme/index'), name: '换肤' }]
  },
  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    icon: 'clipboard',
    noDropdown: true,
    children: [{ path: 'index', component: _import('clipboard/index'), name: 'clipboard' }]
  },*/
  { path: '*', redirect: '/404', hidden: true }
]
