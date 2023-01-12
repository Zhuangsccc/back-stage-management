<template>
  <div>
    <FilterBar @getKeyWord="getKeyWord"></FilterBar>
    <el-card class="info-card infinite-list-wrapper" style="overflow: auto">
      <el-button type="primary" @click="toAdd">新建</el-button>
      <el-table class="el-table-style" :data="tableData.filter(data => !keyword || data.name.toLowerCase().includes(keyword.toLowerCase())
      || data.gender.toLowerCase().includes(keyword.toLowerCase())
      || data.major.toLowerCase().includes(keyword.toLowerCase()))" style="width: 100%">
        <el-table-column label="Index" type="index" align="center" width="80"> </el-table-column>
        <el-table-column label="Name" prop="name" align="center" width="200"> </el-table-column>
        <el-table-column label="Gender" prop="gender" align="center" width="200"> </el-table-column>
        <el-table-column label="Major" prop="major" align="center"> </el-table-column>
        <el-table-column label="Class" prop="class" align="center"> </el-table-column>
        <el-table-column label="Phone" prop="phone" align="center"> </el-table-column>
        <el-table-column label="Assistant" prop="assistant" align="center">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-link type="primary" :underline="false" @click="toEdit(row)">编辑</el-link>
            <el-link type="danger" :underline="false" @click="toDelete(row)" style="margin-left: 10px">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Pagination v-show="show" @getPageInfo="getPageInfo" :total="total"></Pagination>
  </div>
</template>

<script>
import { getStuList, deleteStuInfo } from "@/api/table"
import Pagination from "@/components/Pagination"
export default {
  data() {
    return {
      tableData: [],
      keyword: "",
      show: false,
      total: 0,
      pageIndex: 0,
      pageSize: 10
    };
  },
  components: { Pagination },
  methods: {
    //添加学生
    toAdd() {
      this.$router.push({
        name: "EditInfo"
      })
    },
    //编辑学生
    toEdit(row) {
      this.$router.push({
        name: "EditInfo",
        query: row
      })
    },
    //删除操作
    toDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await deleteStuInfo(row.id)
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.initializeTable()
        } else {
          this.$message.error('删除失败');
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //获得关键词
    getKeyWord(e) {
      this.keyword = e
    },
    //初始化表格
    async initializeTable() {
      let result = await getStuList(this.pageIndex, this.pageSize)
      if (result.code == 200) {
        this.tableData = result.data.tableData
        if (result.data.total) {
          this.total = result.data.total
        }
      }
    },
    async getPageInfo(pageIndex, pageSize) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      this.initializeTable()
    }
  },
  async mounted() {
    this.initializeTable()
    setTimeout(() => {
      this.show = true
    }, 400)
  },
};
</script>

<style scoped >
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

.el-table-style {
  width: 100%;
  height: 100%
}

.info-card {
  margin: 0 5px;
  height: 800px
}

.infinite-list-wrapper {
  height: calc(100vh - 200px);
}
</style>