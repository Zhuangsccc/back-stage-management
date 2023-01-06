<template>
  <div>
    <FilterBar @getKeyWord="getKeyWord"></FilterBar>
    <el-card class="table-box">
      <el-button type="primary" @click="addNewRoute">新建</el-button>
      <el-table
        :data="tableData.filter(data => !keyword || data.meta.title.toLowerCase().includes(keyword.toLowerCase()))"
        style="width: 100%;margin-bottom: 20px;" row-key="path" default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column prop="meta.title" label="名称" width="250">
        </el-table-column>
        <el-table-column prop="component" label="地址(@/view/)">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="120">
        </el-table-column>
        <el-table-column label="图标" width="120" prop="icon">
          <template slot-scope="scope">
            <i style="font-size: 20px" :class="scope.row.meta.icon"></i>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state == '1' ? 'success' : 'danger'"><span v-if="scope.row.state == '1'">正常</span><span
                v-else>禁用</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="{ row }">
            <el-link type="primary" size="mini" :disabled="row.ndelete">编辑</el-link>
            <el-link type="danger" size="mini" style="margin-left: 10px" :disabled="row.ndelete">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <routerDialog :dialogFormVisible="dialogFormVisible" @changeDia="changeDia" :title="title" :tableData="tableData"
      :treeRoutes="treeRoutes"></routerDialog>
  </div>
</template>

<script>
import { listRoutes } from "@/api/menu"
import FilterBar from "@/components/FilterBar"
import routerDialog from "./components/routerDialog"
import { filterType } from "@/utils/routeSet"
export default {
  data() {
    return {
      tableData: [],
      keyword: "",
      dialogFormVisible: false,
      title: "",
      treeRoutes: []
    }
  },
  methods: {
    getKeyWord(e) {
      this.keyword = e
    },
    addNewRoute() {
      this.dialogFormVisible = true
      this.title = "新增路由"
    },
    changeDia(e) {
      this.dialogFormVisible = e
    },
    async initTableData(){
      let result = await listRoutes()
      this.tableData = result.data
    }
  },
  components: { FilterBar, routerDialog },
   mounted() {
    this.initTableData()
  },
  watch: {
    tableData: {
      handler(newValue) {
        this.treeRoutes = filterType(newValue, "页面");
        this.treeRoutes.unshift({ title: "顶级节点", id: -1 });
      },
      deep: true
    }
  }
}
</script>

<style>

</style>