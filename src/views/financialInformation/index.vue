<template>
  <div>
    <div>
      <FilterBar @getKeyWord="getKeyWord"></FilterBar>
      <el-card class="info-card infinite-list-wrapper" style="overflow: auto">
        <el-button type="primary" @click="addFinance">新建</el-button>
        <el-table class="el-table-style"
          :data="tableData.filter(data => !keyword || data.name.toLowerCase().includes(keyword.toLowerCase()))"
          style="width: 100%">
          <el-table-column label="序号" type="index" align="center" width="80"> </el-table-column>
          <el-table-column label="名称" prop="title" align="center"> </el-table-column>
          <el-table-column label="价格" prop="price" align="center" width="200"> </el-table-column>
          <el-table-column label="类型" prop="type" align="center"> </el-table-column>
          <el-table-column label="时间" prop="time" align="center"> </el-table-column>
          <el-table-column label="报送人" prop="submitter" align="center"> </el-table-column>
          <el-table-column label="状态" prop="state" align="center">
            <template slot-scope="{row}">
              <el-tag :type="row.state==1 ? 'success' : (row.state==2?'danger':'warning')">{{ row.state==1 ? '已审批' : (row.state==2?'未通过':'待审批') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="审批人" prop="approver" align="center"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-link type="primary" :underline="false">编辑</el-link>
              <el-link type="danger" :underline="false" style="margin-left: 10px">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <Pagination v-show="show" @getPageInfo="getPageInfo" :total="total"></Pagination>
    </div>
    <dia :diaForm="diaForm" @changeDia="changeDia" @update="initTableData" :title="title"></dia>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar"
import Pagination from "@/components/Pagination"
import { getList } from "@/api/finance"
import dia from "./dia.vue"
export default {
  name: "FinancialInformation",
  components: { FilterBar, Pagination, dia },
  data() {
    return {
      keyword: "",
      show: false,
      total: 0,
      pageIndex: 0,
      pageSize: 10,
      tableData: [],
      diaForm:false,
      title:""
    }
  },
  methods: {
    getKeyWord(e) {
      this.keyword = e
    },
    async getPageInfo(pageIndex, pageSize) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      this.initTableData()
    },
    async initTableData() {
      let result = await getList(this.pageIndex, this.pageSize)
      if (result.code == 200) {
        this.tableData = result.data.tableData
        if (result.data.total) {
          this.total = result.data.total
        }
      }
    },
    addFinance(){
      this.diaForm=true
      this.title = "新增财务"
    },
    changeDia(e){
      this.diaForm = e
    },
  },
  mounted() {
    this.initTableData()
    setTimeout(() => {
      this.show = true
    }, 400)
  }
}
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