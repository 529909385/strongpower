<template>
  <div>
    <el-form :model="form" ref="form" v-if="true">
      <el-form-item label="父级" :label-width="formLabelWidth">
        <!--<el-input v-model="form.parentId" auto-complete="off"></el-input>-->
        <el-select-tree v-model="form.parentId" :treeData="menuTree" :propNames="defaultProps" clearable
                        placeholder="请选择父级">
        </el-select-tree>
      </el-form-item>
      <el-form-item >
        <el-input v-model="temp.parentId" placeholder="请输入内容"></el-input>
      <el-button size="small" type="success" @click="view">查看
      </el-button>
        <el-button size="small" type="success" @click="setValue">设置value
        </el-button>
      </el-form-item>
    </el-form>
    <tree-grid
      :items='data'
      :columns='columns'
      @on-row-click='rowClick'
      @on-selection-change='selectionClick'
      @on-sort-change='sortClick'
    ></tree-grid>
  </div>
</template>

<script>
  import selectTree from '../../components/ElSelectTree/selectTree.vue'
  import treeter from '../../components/ElSelectTree/treeter'
  import TreeGrid from '../../components/TreeGrid/treeGrid'
  // import merge from 'element-ui/src/utils/merge'

  export default {
    name: 'index',
    mixins: [treeter],
    components: {
      'el-select-tree': selectTree,
      TreeGrid
    },
    data() {
      return {
        columns: [{
          type: 'selection',
          width: '58'
        }, {
          title: '编码',
          key: 'code',
          sortable: true,
          width: '150'
        }, {
          title: '名称',
          key: 'name',
          width: '150'
        }, {
          title: '状态',
          key: 'status',
          width: '150'
        }, {
          title: '备注',
          key: 'remark',
          width: '150'
        }, {
          title: '操作',
          type: 'action',
          actions: [{
            type: 'success',
            text: '编辑'
          }, {
            type: 'danger',
            text: '删除'
          }],
          width: '150'
        }],
        data: [{
          id: '1',
          code: '0001',
          name: '测试数据1',
          status: '启用',
          remark: '测试数据测试数据',
          _checked: false
        }, {
          id: '2',
          code: '0002',
          name: '测试数据2',
          status: '启用',
          remark: '测试数据测试数据',
          children: [{
            id: '01',
            code: '00001',
            name: '测试数据01',
            status: '启用',
            remark: '测试数据测试数据',
            children: [{
              id: '010121',
              code: '00001',
              name: '测试数据01',
              status: '启用',
              remark: '测试数据测试数据'
            }, {
              id: '02212121',
              code: '00002',
              name: '测试数据02',
              status: '启用',
              remark: '测试数据测试数据'
            }]
          }, {
            id: '02',
            code: '00002',
            name: '测试数据02',
            status: '启用',
            remark: '测试数据测试数据'
          }]
        }, {
          id: '3',
          code: '0003',
          name: '测试数据3',
          status: '启用',
          remark: '测试数据测试数据'
        }, {
          id: '4',
          code: '0004',
          name: '测试数据4',
          status: '启用',
          remark: '测试数据测试数据'
        }],
        selectIconDialog: false,
        formLabelWidth: '100px',
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        maxId: 7000000,
        menuTree: [{
          'id': 1,
          'parentId': null,
          'sort': 0,
          'name': '仪表盘',
          'href': '/index',
          'icon': 'fa fa-dashboard',
          'children': [],
          'isShow': '1'
        }, {
          'id': 31,
          'parentId': null,
          'sort': 1,
          'name': '测试1',
          'href': '/test/1',
          'icon': 'fa fa-upload',
          'children': [
            {
              'id': 92,
              'parentId': 31,
              'sort': 0,
              'name': '测试1-1',
              'href': '/test/1/1',
              'icon': 'fa fa-bank',
              'children': [
                {
                  'id': 912,
                  'parentId': 92,
                  'sort': 0,
                  'name': '测试1-1-1',
                  'href': '/test/1/1/1',
                  'icon': 'fa fa-bank',
                  'children': [],
                  'isShow': '1'
                },
                {
                  'id': 913,
                  'parentId': 92,
                  'sort': 0,
                  'name': '测试1-1-2',
                  'href': '/test/1/1/2',
                  'icon': 'fa fa-area-chart',
                  'children': [],
                  'isShow': '1'
                }
              ],
              'isShow': '1'
            },
            {
              'id': 93,
              'parentId': 31,
              'sort': 0,
              'name': '测试1-2',
              'href': '/test/1/2',
              'icon': 'fa fa-area-chart',
              'children': [],
              'isShow': '1'
            }
          ],
          'isShow': '1'
        }, {
          'id': 102,
          'parentId': null,
          'sort': 3,
          'name': '测试2',
          'href': '/test/2',
          'icon': 'fa fa-download',
          'children': [
            {
              'id': 103,
              'parentId': 102,
              'sort': 0,
              'name': '测试2-1',
              'href': '/test/2/1',
              'icon': 'fa fa-image',
              'children': [],
              'isShow': '1'
            }
          ],
          'isShow': '1'
        }, {
          'id': 6,
          'parentId': null,
          'sort': 6,
          'name': '系统管理',
          'href': '/sys',
          'icon': 'fa fa-cog',
          'children': [
            {
              'id': 108,
              'parentId': 6,
              'sort': 0,
              'name': ' 资源管理',
              'href': '/sys/resource',
              'icon': 'fa fa-database',
              'children': [],
              'isShow': '1'
            },
            {
              'id': 7,
              'parentId': 6,
              'sort': 1,
              'name': '菜单管理',
              'href': '/sys/menuList',
              'icon': 'fa fa-navicon',
              'children': [],
              'isShow': '1'
            },
            {
              'id': 8,
              'parentId': 6,
              'sort': 2,
              'name': '角色管理',
              'href': '/sys/roleList',
              'icon': 'fa fa-universal-access',
              'children': [],
              'isShow': '1'
            },
            {
              'id': 9,
              'parentId': 6,
              'sort': 3,
              'name': '用户管理',
              'href': '/sys/userList',
              'icon': 'fa fa-user-plus',
              'children': [],
              'isShow': '1'
            }
          ],
          'isShow': '1'
        }],
        form: {
          id: null,
          name: '',
          sort: 0,
          icon: '',
          href: '',
          isShow: '',
          delivery: false,
          parentId: null,
          desc: ''
        },
        temp: {
          id: null,
          name: '',
          sort: 0,
          icon: '',
          href: '',
          isShow: '',
          delivery: false,
          parentId: '1',
          desc: ''
        }
      }
    },
    methods: {
      view() {
        console.log(this.form)
      },
      setValue() {
        this.temp.parentId = parseInt(this.temp.parentId)
        // this.form = merge({}, this.temp)
        this.form.parentId = this.temp.parentId
      },
      rowClick(data, index, event) {
        console.log('当前行数据:' + data)
        console.log('点击行号:' + index)
        console.log('点击事件:' + event)
      },
      selectionClick(arr) {
        console.log('选中数据id数组:' + arr)
      },
      sortClick(key, type) {
        console.log('排序字段:' + key)
        console.log('排序规则:' + type)
      }
    }
  }
</script>

<style scoped>

</style>
