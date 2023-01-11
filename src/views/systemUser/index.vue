<template>
  <div>
    <FilterBar></FilterBar>
    <el-card class="info-card infinite-list-wrapper" style="overflow: auto">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" width="250">
        </el-table-column>
        <el-table-column label="创建日期" align="center" >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.time|changeMoment}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-link type="primary" size="mini" @click="setPermission(row)">权限设置</el-link>
            <el-link type="primary" size="mini" style="margin-left: 10px">重置密码</el-link>
            <el-link type="danger" size="mini" style="margin-left: 10px" :disabled="row.name==`admin`">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar"
import { getUserList, } from "@/api/user"
import {getMoment} from "@/utils"
export default {
  components: { FilterBar },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.initTableData()
  },
  methods: {
    async initTableData() {
      let result = await getUserList()
      if (result.code == 200) {
        this.tableData = result.data
        this.tableData.forEach((item)=>{
          item.time= parseInt(item.time)
          item.roles = item.roles.split(",")
        })
      }
    },
    setPermission(row){
      this.$router.push({
        path:"/系统设置/菜单权限",
        query:{
          roles:row.roles
        }
      })
    }
  },
  filters:{
    changeMoment(time) {
      return getMoment(time);
    }
  }
}
</script>

<style scoped>
.info-card {
  margin: 0 5px;
  height: 800px
}

.infinite-list-wrapper {
  height: calc(100vh - 160px);
}
</style>