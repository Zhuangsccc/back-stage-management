<template>
  <div class="pagination-container">
      <el-card>
          <el-pagination
                :current-page="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="10"
                layout=" prev, pager, next, jumper"
                :total="400"
                align="center"
              >
              </el-pagination>
      </el-card>
  </div>
</template>

<script>
export default {
    name:"Pagination",
    props:{
        currentPage:{
            type:Number,
            default:1
        }
    }
}
</script>

<style>
.pagination-container {
  background: #fff;
  z-index: 500;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 10px 5px;
  height:50px;
  
}
</style>