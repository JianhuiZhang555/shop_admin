// import axios from 'axios'
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
      input3: '',
      addUserDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }, {
          max: 5,
          min: 3,
          message: '用户长度必须在3-5之间',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          max: 10,
          min: 5,
          message: '用户长度必须在5-10之间',
          trigger: 'blur'
        }],
        email: [{
          pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: '格式不正确',
          trigger: 'blur'
        }],
        mobile: [{
          pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
          message: '格式不正确',
          trigger: 'blur'
        }]
      }
    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    // 若没有查询字符串，设置为空，显示所有数据
    // 若有查询字符串，将值传入，显示与查询值相关的数据——搜索功能
    getUsersData (pagenum = 1, query = '') {
      this.$axios.get('users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      }).then(res => {
        // console.log(res)
        this.usersData = res.data.data.users
        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum
      })
    },
    currentPagechanged (curPage) {
      // 页码改变，重新渲染当前页
      this.getUsersData(curPage, this.input3)
    },
    search () {
      // 参数1：当前页 参数2：查询字符串
      this.getUsersData(1, this.input3)
    },
    showAddUserDialog () {
      this.addUserDialogVisible = true
    },
    addUser () {
      this.$axios.post('users', this.addUserForm).then(res => {
        console.log(res)
        if (res.data.meta.status === 201) {
          // 关闭对话框
          this.addUserDialogVisible = false
          // 消息提示
          this.$message({
            message: '添加用户成功',
            type: 'success',
            duration: 800
          })
          // 重新渲染
          this.getUsersData(1)
        }
      })
    },
    closeAddUserDialog () {
      this.$refs.addUserRef.resetFields()
    },
    /* eslint-disable */
    stateChange(row) {
      const {
        id,
        mg_state
      } = row
      // console.log(row.mg_state)
      // console.log(localStorage.getItem('token'))
      this.$axios.put(`users/${id}/state/${mg_state}`).then(res => {
        if (res.data.meta.status === 200) {
          this.$message({
            message: '修改用户状态成功',
            type: 'success',
            duration: 800
          })
        }
      })
    },
    delUrl(id) {
      // console.log(id);
      // console.log(localStorage.getItem('token'))
      this.$axios.delete(`users/${id}`).then(res => {
        if (res.data.meta.status === 200) {
          this.$message({
            message: '删除此用户成功',
            type: 'success',
            duration: 800
          })
        }
        this.getUsersData()
      })
    }
  }
}
