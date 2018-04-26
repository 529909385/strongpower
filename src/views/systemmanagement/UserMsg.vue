<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名称"
                v-model="listQuery.name">
      </el-input>
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort"
                 placeholder="单位">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" @click="batchRemove"
                 :disabled="this.sels.length===0">批量删除
      </el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">自定义导出</el-button>
      <el-button class="filter-item" type="warning" icon="document" @click="handleDownload">数据模版</el-button>
    </div>
   <!-- 表格-->
    <el-table ref="multipleTable" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row style="width: 100%" @selection-change="selsChange" height="620" :row-class-name="tableRowClassName">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="供电公司">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="单位">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="登录名">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="手机">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="QQ号">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="座机号">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.status }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="title" label="供电公司">
      </el-table-column>

      <el-table-column align="center" prop="title" label="单位">
      </el-table-column>

      <el-table-column align="center" prop="title" label="登录名">
      </el-table-column>

      <el-table-column align="center" prop="title" label="姓名">
      </el-table-column>

      <el-table-column align="center" prop="title" label="性别">
      </el-table-column>

      <el-table-column align="center" prop="title" label="邮箱">
      </el-table-column>

      <el-table-column align="center" prop="title" label="手机">
      </el-table-column>

      <el-table-column align="center" prop="title" label="QQ号">
      </el-table-column>

      <el-table-column align="center" prop="title" label="座机号">
      </el-table-column>

      <el-table-column align="center" prop="title" label="地址">
      </el-table-column>

      <el-table-column class-name="status-col" prop="status" label="状态">
      </el-table-column>

      <el-table-column align="center" label="操作" width="255">
        <template slot-scope="scope" >
          <el-button v-if="true" size="small" :type=item.type @click=handle(item.method,scope.row) v-for="item in operateItem">{{item.name}}
          </el-button>
          <!--<el-button v-if="true" size="small" type="danger" @click="handleDelete(scope.row)">删除"handleUpdate(scope.row)"handleUpdate(scope.row,item.method)
          </el-button>
          <el-button v-if="true" size="small" type="success" @click="handleModifyStatus(scope.row,'deleted')">角色管理
          </el-button>-->
        </template>
      </el-table-column>

    </el-table>
    <!--表格分页栏-->
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


    <!--对话框带验证表单-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :inline="true" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="80px"
               style='width: 800px; margin-left:50px;'>

        <el-form-item label="单位名称" prop="status">
          <el-select class="filter-item" v-model="temp.status" placeholder="请选择" prop="status"  style='width:185px;'>
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="登录名" prop="title">
          <el-input v-model="temp.title" placeholder="请输入内容" clearable></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" placeholder="请输入内容" type="password" clearable></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="passwordSur" >
          <el-input v-model="temp.passwordSur" placeholder="请输入内容" type="password"  clearable></el-input>
        </el-form-item>

        <el-form-item label="用户名称" prop="name" >
          <el-input v-model="temp.name" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="status">
          <el-select class="filter-item" v-model="temp.status" placeholder="请选择" style='width:185px;'>
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input v-model="temp.email" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input v-model="temp.phone" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="座机" prop="tel">
          <el-input v-model="temp.tel" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="QQ" prop="qq">
          <el-input v-model="temp.qq" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="temp.address" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select class="filter-item" v-model="temp.status" placeholder="请选择" style='width:185px;'>
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.remark">
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
        <el-table-column prop="key" label="渠道"></el-table-column>
        <el-table-column prop="pv" label="pv"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<style>
  @import "../../assets/icons-alibaba/iconfont.css";

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  /*格中行间变样式*/
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-table .info-row {
    background: ghostwhite;
  }
</style>
<script>
  import { fetchList, fetchPv } from '@/api/article'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { parseTime } from '@/utils'
  import SplitPane from '../../components/SplitPane/index'

  const calendarTypeOptions = [
    { key: 'sj', display_name: '市级' },
    { key: 'xj', display_name: '县级' }
  ]

  // arr to obj
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'userMsg',
    components: { SplitPane },
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
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: null
        },
        temp: {
          id: undefined,
          importance: 0,
          remark: '',
          timestamp: 0,
          title: '',
          type: '',
          status: '',
          password: '',
          passwordSur: '',
          name: '',
          email: '',
          phone: '',
          tel: '',
          qq: '',
          address: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' },
            { pattern: /[A-Za-z0-9_\-\u4e00-\u9fa5]+/, message: '用户名不能包含特殊字符' }
          ],
          remark: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          status: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请选择时间', trigger: 'blur' }
          ],
          passwordSur: [
            { required: true, message: '请选择时间', trigger: 'blur' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          email: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          qq: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{ label: '测试1', key: '+id' }, { label: '测试2', key: '-id' }],
        operateItem: [{ type: 'success', name: '新建', method: 'create' }, { type: 'danger', name: '编辑', method: 'update' }, { type: 'danger', name: '删除', method: 'delete' }],
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
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        })
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex % 2 === 0) {
          return 'info-row'
        }
        return ''
      },
      handle(key, row) {
        debugger
        switch (key) {
          case 'create':
            this.handleCreate()
            break
          case 'update':
            this.handleUpdate(row)
            break
          case 'delete':
            this.handleDelete(row)
            break
        }
      },
      test1() {
        alert('test1')
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
        this.temp.id = parseInt(Math.random() * 100) + 1024
        this.temp.timestamp = +new Date()
        this.temp.author = '原创作者'
        this.list.unshift(this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      },
      update() {
        this.temp.timestamp = +this.temp.timestamp
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, this.temp)
            break
          }
        }
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
          id: undefined,
          importance: 0,
          remark: '',
          timestamp: 0,
          title: '',
          status: '',
          type: ''
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
