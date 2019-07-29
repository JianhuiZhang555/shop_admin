<template>
  <div>
    <el-table
      :data="usersData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="用户状态"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="behavior"
        label="操作"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size='2'
      :current-page='pagenum'
      @current-change='currentPagechanged'
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      usersData: [{
        name: '王小虎',
        date: '2016-05-02',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      total: 0,
      pagenum: 1,
      token: localStorage.getItem('token')

    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    getUsersData (pagenum = 1) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: '',
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        console.log(res)
        this.usersData = res.data.data.users
        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum
      })
    },
    currentPagechanged (curPage) {
      this.getUsersData(curPage)
    }
  }
}
</script>

<style>
.el-table th,
.el-table cell {
  text-align: center;
}
</style>
