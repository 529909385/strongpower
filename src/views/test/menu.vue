<template>
   <!-- <h3 class="box-title" slot="header" style="width: 100%;">
      <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
      <el-button type="danger" icon="delete" @click="batchDelete">删除</el-button>
    </h3>-->
    <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
    <!--  <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
        <el-tree v-if="menuTree"
                 ref="menuTree"
                 :data="menuTree"
                 show-checkbox
                 highlight-current
                 :render-content="renderContent"
                 @node-click="handleNodeClick" clearable node-key="id" :props="defaultProps"></el-tree>
      </el-col>-->
      <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
            <el-form :model="form" ref="form">
              <el-form-item label="父级" :label-width="formLabelWidth">
                <!--<el-input v-model="form.parentId" auto-complete="off"></el-input>-->
                <el-select-tree v-model="form.parentId" :treeData="menuTree" :propNames="defaultProps" clearable
                                placeholder="请选择父级">
                </el-select-tree>
              </el-form-item>
            </el-form>
      </el-col>
    </el-row>
</template>
<script type="text/babel">
  import selectTree from './components/ElSelectTree/selectTree.vue'
  import treeter from './components/ElSelectTree/treeter'
  import merge from 'element-ui/src/utils/merge'
  export default {
    mixins: [treeter],
    components: {
      'el-select-tree': selectTree
    },
    data() {
      return {
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
        }
      }
    },
    methods: {
      selectIcon(event) {
        this.form.icon = event.target.className
        this.selectIconDialog = false
      },
   /*   renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span><i class={data.icon}></i>&nbsp;{node.label}</span>
            </span>
          </span>)
      },*/
      newAdd() {
        this.form = {
          id: null,
          name: '',
          sort: 0,
          icon: '',
          href: '',
          isShow: '',
          delivery: false,
          parentId: null,
          desc: ''
        }
      },
      deleteSelected() {
      },
      batchDelete() {
        var checkKeys = this.$refs.menuTree.getCheckedKeys()
        if (checkKeys == null || checkKeys.length <= 0) {
          this.$message.warning('请选择要删除的资源')
          return
        }
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        })
      },
      handleNodeClick(data) {
        this.form = merge({}, data)
      },
      onSubmit() {
      },
      load() {
      }
    },
    created() {
      this.load()
    }
  }
</script>

<style>
  .select-tree .icons-wrapper {
    display: block;
  }

  .select-tree .is-empty i {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }

  .select-tree .is-empty i:hover {
    background-color: #0d6aad;
    color: #ffffff;
  }

</style>
