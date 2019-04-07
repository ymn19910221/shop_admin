// 引入axios
/*eslint-disable*/
// import axios from 'axios' main.js中已在原型上添加axios 不需要再引入
export default {
  data() {
    return {
      usersList: [],
      total: 0,
      //当前页
      pagenum: 1,
      // 查询的内容
      searchText: '',
      // 自定义用户状态修改
      // state: true,
      // 显示添加用户对话框
      dialogAddUserVisible: false,
      // 添加用户表单对象
      addUserForm: {
        username: '',
        password: '',
        moblie: '',
        email: ''
      },
      //校验规则
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
        ],
        email: [
          // 如果格式不正确会触发
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        moblie: [
          // 如果格式不正确会触发
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '电话格式不正确',
            trigger: 'blur'
          }
        ]
      },
      //修改用户信息
      dialogEditUserVisible: false,
      editUserForm: {
        username: '小白兔',
        email: '',
        mobile: ''
      }
    }
  },

  created() {
    this.loadUsersList(1)
  },
  methods: {
    // 当前页 和查询 形参
    async loadUsersList(pagenum = 1, query) {
      const URL = '/users'
      const opts = {
        params: {
          query: '',
          pagenum,
          pagesize: 2,
          query
        }
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }
      let res = await this.$axios.get(URL, opts)
      console.log(res)
      // 返回总数据(数组形式)
      this.usersList = res.data.data.users
      // 返回总个数
      this.total = res.data.data.total
      //当前页
      this.pagenum = res.data.data.pagenum
    },
    // 点击页
    changePage(curPage) {
      // console.log('点击了',curPage);
      // 将curPage的值(实参)传递给pagenum
      // 如果不加this.searchText, 会发生搜索页码混乱
      this.loadUsersList(curPage, this.searchText)
    },

    // 查询
    startSearch() {
      // 获取搜索内容
      console.log(this.searchText)
      // 将搜索内容以实参方式传给query 1 表示占位
      this.loadUsersList(1, this.searchText)
    },

    //更改用户状态
    async changeState(row) {
      // 1.获取id 和 mg_state
      const { id, mg_state: mgState } = row
      let res = await this.$axios.put(
        `/users/${id}/state/${mgState}`
        // null,
        // {
        //   headers: {
        //     Authorization: localStorage.getItem('token')
        //   }
        // }
      )
      console.log(res)
      if (res.data.meta.status === 200) {
        // 提示更新状态成功
        this.$message({
          message: '更新状态成功',
          type: 'success',
          duration: 800
        })
      }
    },

    //用户删除状态
    async delUsers(id) {
      // console.log(id);
      //确认消息
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        //发送删除用户请求
        let res = await this.$axios.delete('users/' + id)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 800
          })
          console.log('点击了确定')

          //  重新渲染数据 (回到首页)
          this.loadUsersList(1)
        }
      } catch (error) {
        console.log('点击了取消')
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 800
        })
      }
    },

    //点击添加按钮显示 添加添加对话框
    showAddUserDialog() {
      this.dialogAddUserVisible = true
    },

    // 添加用户
    async addUser() {
      let res = await this.$axios.post('users', this.addUserForm)

      console.log(res)
      if (res.data.meta.status === 201) {
        // 1. 关闭对话框
        this.dialogAddUserVisible = false
        // 2.显示登陆成功
        this.$message({
          message: '添加新用户成功',
          type: 'success',
          duration: 800
        })
        // 3.刷新列表
        this.loadUsersList()
      }
    },

    // 清除添加对话框内容
    addUserDialogClose() {
      console.log('关闭了')
      this.$refs.addUserRef.resetFields()
    },

    // 修改用户信息
    showEditUserDialog(row) {
      const { username, email, mobile, id } = row
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.id = id

      this.dialogEditUserVisible = true
    },

    //编辑用户
    async editUser () {
      const {id, email, mobile } = this.editUserForm
      let res = await this.$axios.put('users/' + id, {
        email,
        mobile
      })
      console.log(res);
      if (res.data.meta.status === 200) {
        // 1. 关闭对话框
        this.dialogEditUserVisible = false
        // 2. 提示更新成功
        this.$message({
          message: '修改用户信息成功',
          type: 'success',
          duration: 800
        })
        // 3. 刷新列表 - 编辑完成显示当前页
        this.loadUsersList(this.pagenum)
      }

     }
  }
}
