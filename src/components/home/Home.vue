<template>
  <el-container>
    <el-header>
      <!-- 三个部分 -->
      <el-row>
        <el-col :span="8">
          <img src="../../assets/images/logo.png" alt>
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col class="three" :span="8">
          恭喜35期学员平均月薪资 2万 -->
          <a @click.prevent="logout" href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左侧菜单导航栏 -->
      <!-- el-menu : 菜单父组件
      el-menu-item: 菜单子组件-->
      <!-- default-active="2" 高亮 -->
      <!-- 路由功能
      router: false => => true => 启动路由功能
      以 index 作为 path 进行路由跳转-->
      <el-aside width="200px">
        <el-menu
          :router="true"
          :default-active="indexs"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 第一个 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- 菜单元素 -->
            <el-menu-item index="users">用户列表</el-menu-item>
          </el-submenu>
          <!-- 第二个 -->
          <el-submenu index="2">
            <!-- 标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <!-- 两个菜单元素 -->
            <el-menu-item index="roles">角色列表</el-menu-item>
            <el-menu-item index="rights">权限列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      indexs: ''
    }
  },
  created () {
    console.log(this.$route.path.slice(1))
    this.indexs = this.$route.path.slice(1)
  },
  methods: {
    // 退出登录
    logout () {
      this.$confirm('此操作将退出页面, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 1.删除token
          localStorage.removeItem('token')
          // 2. 退回到login
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功!',
            duration: 800
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出',
            duration: 800
          })
        })
    }
  }
}
</script>

<style scoped lang="less">
/* 整体 */
.el-container {
  height: 100%;
  min-width: 900px;
}
/* 头部 */
.el-header {
  background: #b3c1cd;
  padding: 0;
  height: 60px;
  h1 {
    margin: 0;
    padding: 0;
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 28px;
  }
  .three {
    text-align: right;
    padding-right: 30px;
    line-height: 60px;
    a {
      color: #daa520;
      text-decoration: none;
    }
  }
}

// 侧栏
.el-aside {
  background: #545c64;
}

// 内容
.el-main {
  background: #eaeef1;
}
</style>
