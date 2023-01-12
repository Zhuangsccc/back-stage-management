<template>
  <div class="pagination-container">
    <el-card>
      <el-pagination :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize"
        @size-change="sizeChange" @current-change="pageChange" layout="total,sizes, prev, pager, next, jumper"
        :total="total" align="center">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      currentPage:1,
      pageSize:10,
    }
  },
  methods: {
    sizeChange(val) {
      this.pageSize=val
      this.getInfo()
    },
    pageChange(val) {
      this.currentPage = val
      this.getInfo()
    },
    getInfo() {
      let pageIndex = (this.currentPage-1)*this.pageSize
      this.$emit("getPageInfo",pageIndex,this.pageSize)
    }
  },
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
  height: 50px;
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