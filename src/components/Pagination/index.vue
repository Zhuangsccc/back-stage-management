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
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes fadeInUp {
  0% {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
  }
  100% {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
  }
  }
  @keyframes fadeInUp {
  0% {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
  }
  100% {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
  }
}
</style>