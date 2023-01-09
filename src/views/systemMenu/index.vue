<template>
  <div  >
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
          <template slot-scope="{row}">
            {{ row.type == "外链" ? row.path : row.component }}
          </template>
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
            <el-tag :type="scope.row.state == '1' ? 'success' : 'danger'"><span
                v-if="scope.row.state == '1'">正常</span><span v-else>禁用</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="{ row }">
            <el-link type="primary" size="mini" :disabled="row.ndelete" @click="toEdit(row)">编辑</el-link>
            <el-link type="danger" size="mini" style="margin-left: 10px" @click="toDelete(row)"
              :disabled="row.ndelete">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <routerDialog :dialogFormVisible="dialogFormVisible" @changeDia="changeDia" :title="title" :tableData="tableData"
      :treeRoutes="treeRoutes" :row="row"></routerDialog>
  </div>
</template>

<script>
import { listRoutes, updateRoute, deleteRoute } from "@/api/menu"
import FilterBar from "@/components/FilterBar"
import routerDialog from "./components/routerDialog"
import { filterType, getOuterMostNode, filterPath } from "@/utils/routeSet"
import { deepClone } from "@/utils"
export default {
  data() {
    return {
      tableData: [],
      keyword: "",
      dialogFormVisible: false,
      title: "",
      treeRoutes: [],
      row: {}
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
      this.title = ''
    },
    async initTableData() {
      let result = await listRoutes()
      this.tableData = result.data
    },
    toEdit(row) {
      this.row = {}
      this.dialogFormVisible = true
      this.title = "编辑路由"
      this.row = row
    },
    toDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (!row.id) {
          let changeNode = deepClone(getOuterMostNode(row.path, this.tableData))
          let changeNodes = []
          changeNodes.push(changeNode)
          let route = filterPath(changeNodes, row.path)[0]
          let data = {
            route: JSON.stringify(route),
            id: changeNode.id
          }
          let result = await updateRoute(data)
          if (result.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.initTableData()
            setTimeout(() => {
              this.$router.go(0)
            }, 1000)
          }
        } else {
          let result = await deleteRoute(row.id)
          if (result.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.initTableData()
            setTimeout(() => {
              this.$router.go(0)
            }, 1000)
          }
        }
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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

<style scoped>
.table-box{
  margin: 0 5px;
}
</style>