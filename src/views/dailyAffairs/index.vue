<template>
  <div>
    <FilterBar></FilterBar>
    <el-card class="info-card infinite-list-wrapper" style="overflow: auto">
      <el-button type="primary">新建</el-button>
      <el-table
        class="el-table-style"
        :data="
          tableData.filter(
            (data) =>
              !keyword ||
              data.name.toLowerCase().includes(keyword.toLowerCase())
          )
        "
        style="width: 100%"
        :default-sort="{ prop: 'time', order: 'descending' }"
      >
        <el-table-column label="序号" type="index" align="center" width="80">
        </el-table-column>
        <el-table-column label="事件名称" prop="event_name" align="center">
        </el-table-column>
        <el-table-column
          label="发起人"
          prop="sponsor"
          align="center"
          width="200"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="开始时间"
          prop="start_time"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column label="结束时间" prop="end_time" align="center">
        </el-table-column>
        <el-table-column label="范围" prop="range" align="center">
        </el-table-column>
        <el-table-column label="状态" prop="state" align="center" sortable>
          <template slot-scope="{ row }">
            <el-tag
              :type="
                row.state == 1
                  ? 'success'
                  : row.state == 2
                  ? 'danger'
                  : 'warning'
              "
              >{{
                row.state == 1 ? "已审批" : row.state == 2 ? "未通过" : "待审批"
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="desc" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-link
              type="danger"
              :underline="false"
              style="margin-left: 10px"
              @click="goDelete(row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Pagination
      v-show="show"
      @getPageInfo="getPageInfo"
      :total="total"
    ></Pagination>
  </div>
</template>

<script>
export default {
  name: "DailyAffairs",
  data() {
    return {
      keyword: "",
      show: false,
      total: 0,
      pageIndex: 0,
      pageSize: 10,
      tableData: [],
      title: "",
    };
  },
  methods: {
    getKeyWord(e) {
      this.keyword = e;
    },
    async getPageInfo(pageIndex, pageSize) {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.initTableData();
    },
    async initTableData() {},
    goDelete(row) {},
  },
  mounted() {
    this.initTableData();
    setTimeout(() => {
      this.show = true;
    }, 400);
  },
};
</script>

<style scoped>
.info-card {
  margin: 0 5px;
  height: 800px;
}

.infinite-list-wrapper {
  height: calc(100vh - 200px);
}
</style>