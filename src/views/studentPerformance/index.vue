<template>
  <div>
    <FilterBar @getKeyWord="getKeyWord"></FilterBar>
    <el-card class="info-card infinite-list-wrapper" style="overflow: auto;margin: 0 5px;">
      <el-table class="el-table-style"
        :data="tableData.filter(data => !keyword || data.name.toLowerCase().includes(keyword.toLowerCase()))"
        style="width: 100%">
        <el-table-column label="Index" type="index" align="center" width="80"> </el-table-column>
        <el-table-column label="Name" prop="name" align="center"> </el-table-column>
        <el-table-column label="Major" prop="major" align="center"> </el-table-column>
        <el-table-column label="Class" prop="class" align="center"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-link type="primary" :underline="false" @click="goScore(row)">成绩管理</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Pagination v-show="show" @getPageInfo="getPageInfo" :total="total"></Pagination>
  </div>
</template>

<script>
import { getStuList } from "@/api/table"
export default {
  name: "StudentPerformance",
  data() {
    return {
      keyword: "",
      tableData: [],
      show: false,
      total: 0,
      pageIndex: 0,
      pageSize: 10
    }
  },
  watch: {
  },
  methods: {
    getKeyWord(e) {
      this.keyword = e
    },
    async initializeTable() {
      let result = await getStuList(this.pageIndex, this.pageSize)
      this.tableData = result.data.tableData
      if (result.data.total) {
        this.total = result.data.total
      }
    },
    goScore(row) {
      this.$router.push({
        path: "/student2/成绩列表",
        query: {
          name: row.name
        }
      })
    },
    async getPageInfo(pageIndex, pageSize) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      this.initializeTable()
    }
  },
  mounted() {
    this.initializeTable()
    setTimeout(() => {
      this.show = true
    }, 400)
  }
};
</script>

<style scoped>
.info-card {
  margin: 0 5px;
  height: 800px
}

.infinite-list-wrapper {
  height: calc(100vh - 200px);
}
</style>