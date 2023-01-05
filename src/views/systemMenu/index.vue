<template>
  <div>
    <FilterBar @getKeyWord="getKeyWord"></FilterBar>
    <el-card class="table-box">
        <el-button type="primary">新建</el-button>
        <el-table
        :data="tableData.filter(data => !keyword || data.meta.title.toLowerCase().includes(keyword.toLowerCase()))"
        style="width: 100%;margin-bottom: 20px;"
        row-key="path"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          >
        </el-table-column>
        <el-table-column
          prop="meta.title"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="component"
          label="地址(@/view/)"
        >
        </el-table-column>
        <el-table-column label="图标" width="120"  prop="icon">
            <template slot-scope="scope">
              <i style="font-size: 20px" :class="scope.row.meta.icon"></i>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="120" >
            <template slot-scope="scope">
              <el-tag type='success'
                ><span >正常</span
                ></el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="{ row }">
              <el-link
                type="primary"
                size="mini"
                :disabled="row.ndelete"
                >编辑</el-link
              >
              <el-link
                type="danger"
                size="mini"
                style="margin-left: 10px"
                :disabled="row.ndelete"
                >删除</el-link
              >
            </template>
          </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {listRoutes} from "@/api/menu"
import FilterBar from "@/components/FilterBar"
export default {
  data(){
    return {
        tableData:[],
        keyword:""
    }
  },
  methods:{
    getKeyWord(e){
        this.keyword = e
    }
  },
  components:{FilterBar},
  async mounted(){
    let result = await listRoutes()
    this.tableData = result.data
  }
}
</script>

<style>
</style>