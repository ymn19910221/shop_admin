<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 查询 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- slot="append" 放在后面 -->
        <el-input placeholder="请输入内容" v-model="searchText">
          <el-button @click="startSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表单 -->
    <el-table :data="usersList" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态"></el-table-column>
      <el-table-column label="操作">
        <!-- 自定义列表 -->
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页
    :total: 属性 总条数
    :page-size: 属性 一页显示几个
    current-page: 当前页
    -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="2"
      :current-page="pagenum"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
// 引入axios
/*eslint-disable*/
import axios from "axios";
export default {
  data() {
    return {
      usersList: [],
      total: 0,
      //当前页
      pagenum: 1,
      // 查询的内容
      searchText: ""
    };
  },
  created() {
    this.loadUsersList(1);
  },
  methods: {
    // 当前页 和查询 形参
    loadUsersList(pagenum = 1, query) {
      axios
        .get("http://localhost:8888/api/private/v1/users", {
          params: {
            query: "",
            pagenum,
            pagesize: 2,
            query
          },
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          // 返回总数据(数组形式)
          this.usersList = res.data.data.users;
          // 返回总个数
          this.total = res.data.data.total;
          //当前页
          this.pagenum = res.data.data.pagenum;
        });
    },
    // 点击页
    changePage(curPage) {
      // console.log('点击了',curPage);
      // 将curPage的值(实参)传递给pagenum
      // 如果不加this.searchText, 会发生搜索页码混乱
      this.loadUsersList(curPage, this.searchText);
    },

    // 查询
    startSearch() {
      // 获取搜索内容
      console.log(this.searchText);
      // 将搜索内容以实参方式传给query 1 表示占位
      this.loadUsersList(1, this.searchText);
    }
  }
};
</script>

<style>
.bread {
  height: 50px;
  line-height: 50px;
  background-color: #d4dae0;
  padding-left: 20px;
}
</style>
