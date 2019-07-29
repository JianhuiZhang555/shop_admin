<template>
  <el-row
    type="flex"
    justify="center"
    align="middle"
  >
    <el-col :span='8'>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>

          <el-col
            :span='12'
            class="col-center"
          >
            <el-button
              type="success"
              @click='startLogin'
            >登录</el-button>
          </el-col>
          <el-col
            :span='12'
            class="col-center"
          >
            <el-button @click='resetForm'>重置
            </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    startLogin () {
      // 校验整个提交的用户名及密码内容
      this.$refs.loginForm.validate((valid) => {
        console.log(valid)
        // 登录失败
        if (!valid) {
          this.$message({
            message: '登录失败，用户名或者密码错误',
            type: 'error',
            duration: 800
          })
          return
        }
        // 发送ajax请求
        axios.post('http://localhost:8888/api/private/v1/login', this.loginForm).then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            // 保存token令牌
            localStorage.setItem('token', res.data.data.token)
            // 登录成功
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 800
            })
            // 跳转到 home页
            this.$router.push('/home')
          }
        })
      })
    },
    resetForm () {
      // 重置，把数据恢复到初始值
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.el-form {
  background-color: #fff;
  padding: 20px 30px 10px;
  border-radius: 15px;
}
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.col-center {
  text-align: center;
}
</style>
