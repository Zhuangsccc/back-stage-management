<template>
  <div >
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
            <el-link type="primary" :underline="false">成绩管理</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Pagination></Pagination>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar"
import { getStuList } from "@/api/table"
import Pagination from "@/components/Pagination"
export default {
  name: "StudentPerformance",
  components: { FilterBar, Pagination },
  data() {
    return {
      keyword: "",
      tableData: []
    }
  },
  watch: {
  },
  methods: {
    getKeyWord(e) {
      this.keyword = e
    },
    async initializeTable() {
      let result = await getStuList()
      this.tableData = result.data
    }
  },
  mounted() {
    this.initializeTable()
  }
};
</script>

<style scoped>
</style>