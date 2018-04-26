<template>
    <tree-grid
      :items='data'
      :columns='columns'
      @on-row-click='rowClick'
      @on-selection-change='selectionClick'
      @on-sort-change='sortClick'
    ></tree-grid>
</template>
<script>
  import TreeGrid from './components/TreeGrid'

  export default {
    data() {
      return {
        columns: [{
          type: 'selection',
          width: '50'
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
          _checked: true
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
        }]
      }
    },
    components: {
      TreeGrid
    },
    methods: {
      rowClick(data, index, event) {
        debugger
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
