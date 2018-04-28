<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="单位名称" v-model="listQuery.name">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">自定义导出</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">数据模版</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导入</el-button>
    </div>

    <el-table ref="multipleTable" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" @selection-change="selsChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column  prop="tSysSx" label="单位机构(市/县)">
      </el-table-column>

      <el-table-column  align="center" prop="tSysDwmz" label="单位名称">
      </el-table-column>

      <el-table-column  v-if='showAuditor' prop="tSysPx" align="center" label="排序">
      </el-table-column>

      <el-table-column class-name="status-col" prop="tSysZt" label="状态">
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-if="true" size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button v-if="true" size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="单位机构(市/县)">
          <el-select class="filter-item" v-model="temp.tSysSx" placeholder="请选择">
            <el-option v-for="item in  calendarTypeOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="单位名称">
          <el-input v-model="temp.tSysDwmz" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="temp.tSysPx" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select class="filter-item" v-model="temp.tSysZt" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.tSysBz">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible" size="small">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="渠道"> </el-table-column>
        <el-table-column prop="pv" label="pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchPv } from '@/api/article'
// import axios from 'axios' // , ywdwUpdate
import { ywdwPage, ywdwUpdate, ywdwAdd } from '@/api/ywdw'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'
// import qs from 'qs'
// import $ from 'jquery'

const calendarTypeOptions = ['市级', '县级']

// arr to obj
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'unitMsg',
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: undefined
      },
      temp: {
        tSysId: undefined,
        tSysBz: '',
        tSysDwmz: '',
        tSysPx: '',
        tSysSx: '',
        tSysZt: ''
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
      statusOptions: ['有效', '无效'],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      sels: [],
      showAuditor: false,
      tableKey: 0
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
     /* fetchList(this.listQuery).then(response => {
      /!*  this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false*!/
      })*/
      // console.log(response.data.records)
      ywdwPage(this.listQuery).then(response => {
        // debugger
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    timeFilter(time) {
      if (!time[0]) {
        this.listQuery.start = undefined
        this.listQuery.end = undefined
        return
      }
      this.listQuery.start = parseInt(+time[0] / 1000)
      this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
    },
    selsChange(sels) {
      this.sels = sels
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    // 批量删除
    batchRemove() {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let i = 0; i < this.sels.length; i += 1) {
          ids.push(this.sels[i].id)
        }
        console.log(this.sels)
        this.listLoading = true
      /*  cmsDeletePurchaseBatchDelete({ ids }).then(() => {
          this.getProGrids()
          this.$message.success('删除成功！')
          this.listLoading = false
        })*/
      }).catch(() => {

      })
    },
    create() {
      this.list.unshift(this.temp)
      // debugger
      this.dialogFormVisible = false
      ywdwAdd(this.temp).then(response => {
        // debugger
        console.log(response)
        this.listLoading = false
      })
      this.$notify({
        title: '成功',
        message: '创建成功',
        type: 'success',
        duration: 2000
      })
    },
    update() {
    /*  let data = {
        tSysId: 1,
        tSysBz: 1,
        tSysDwmz: 1,
        tSysPx: 1,
        tSysSx: 1,
        tSysZt: 1
      }*/
      // data = { id: 'q' }
      // debugger
      var params1 = new URLSearchParams()
      for (const attr in this.temp) {
        // console.log(attr)
        // console.log(this.temp[attr])
        params1.append(attr, this.temp[attr])
      }
      ywdwUpdate(this.temp).then(response => {
        console.log(response)
        this.listLoading = false
      })
      // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
     // const postData = qs.stringify(this.temp)
      // params.append('name', 'hello jdmc你好')
      // params.append('id', '2')
      // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      // axios.defaults.headers.post['Content-Type'] = 'application/json'
   /*   const param = JSON.stringify(this.temp)
      console.log(param)
      axios.post('api/ywdw/update')
        .then(function(response) {
          console.log(1)
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })*/
      /* $.ajax({
        type: 'post',
        url: 'http://localhost:8089/api/ywdw/update',
        data: data,
        dataType: 'json',
        success: function(data) {
        }
      })*/
      /* debugger
      axios.post('http://localhost:8089/api/ywdw/update', this.temp)
        .then(function(response) {
          console.log(1)
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })*/
      // this.temp.timestamp = +this.temp.timestamp
     /* for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, this.temp)
          break
        }
      }*/
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
    },
    resetTemp() {
      this.temp = {
        tSysId: undefined,
        tSysBz: '',
        tSysDwmz: '',
        tSysPx: '',
        tSysSx: '',
        tSysZt: ''
      }
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel')
        const tHeader = ['时间', '地区', '类型', '标题', '重要性']
        const filterVal = ['timestamp', 'province', 'type', 'title', 'importance']
        const data = this.formatJson(filterVal, this.list)
        export_json_to_excel(tHeader, data, 'table数据')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
