<template>
  <div style="background-color: #F1F2F6;">
    <el-card style="margin-top: 10px;">
      <el-row>
        <el-col :span="20" :offset="2">
          <el-carousel :interval="4000" type="card" height="300px"  >
            <el-carousel-item v-for="item in image_list" :key="item" >
              <el-image
                  style="width:100%; height:100%"
                  :src="item"
                  fit="fit"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-card>
    <PaneGroup></PaneGroup>
    <el-row class="container">
      <el-col :span="24"
        ><el-card><BarMap></BarMap></el-card
      ></el-col>
    </el-row>
    <el-row class="container" style="margin-top: 10px" :gutter="20">
      <el-col :span="12"
        ><el-card><GenderMap></GenderMap></el-card
      ></el-col>
      <el-col :span="12"
        ><el-card><LineAndBar></LineAndBar></el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import GenderMap from "@/components/Echarts/GenderMap";
import BarMap from "@/components/Echarts/BarMap";
import LineAndBar from "@/components/Echarts/lineAndBar.vue";
import PaneGroup from "@/components/PaneGroup"
export default {
  name: "Dashboard",
  data() {
    var img1 = require("@/assets/Ptu/莆田学院1.jpg");
    var img2 = require("@/assets/Ptu/莆田学院2.jpg");
    var img3 = require("@/assets/Ptu/莆田学院3.jpg");
    var img4 = require("@/assets/Ptu/莆田学院4.jpg");
    return {
      image_list: [img1, img2, img3, img4],
    };
  },
  components: {
    GenderMap,
    BarMap,
    LineAndBar,
    PaneGroup
  },
  methods: {
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度

      this.bannerHeight = (400 / 1920) * this.screenWidth;
    },
  },
  mounted() {
    // 首次加载时,需要调用一次
    console.log(new Date().getTime());
    this.screenWidth = window.innerWidth;

    this.setSize();

    // 窗口大小发生改变时,调用一次

    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.setSize();
    };
  },
};
</script>
<style  scoped>
.img {
  width: 100%;
  display: block;
  height: inherit;
  height: 100%;
}

  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
