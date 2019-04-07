<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="活登录密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="startLogi()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// 引入 axios
/*eslint-disable*/
import axios from 'axios';
export default {
  data () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          // 如果没有填写会触发
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 格式不正确会触发
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          // 如果没有填写会触发
          { required: true, message: '请输入密码', trigger: 'blur' },
          // 如果格式不正确会触发
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录再次验证
    startLogi (formName) {
      this.$refs.ruleForm.validate(async valid => {
        // 登录验证未通过
        if (!valid) {
          return false
        }
        // 校验成功
        // console.log('开始登录')
        let res = await axios.post('http://localhost:8888/api/private/v1/login', this.ruleForm);
            console.log(res)
               if (res.data.meta.status === 200) {
              // 登录提示成功
              // console.log('登陆成功')
              // 保存token到本地 后面判断是否登录要用到
              localStorage.setItem('token',res.data.data.token)

              //登陆成功
              this.$message({
                message: res.data.meta.msg,
                type: 'success',
                duration: 800
              })
              // 跳转到home页面

              this.$router.push('/home')
            } else {
              // console.log('用户信息错误')
              this.$message({
                message: res.data.meta.msg,
                type: 'error',
                duration: 800
              })
            }

      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style scoped>

.el-row {
  height: 100%;
  background: #2d434c;
}
.el-col {
  background: #fff;
  padding: 25px 40px;
  border-radius: 15px;
}
</style>
