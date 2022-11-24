<template>
  <div ref="echart" class="echart-box" style="height:400px;width:100%"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "GenderMap",
  data() {
    return {
        option : {
  title: {
    text: '性别对比',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '男' },
        { value: 735, name: '女' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
    };
  },
  mounted(){
    var myChart = echarts.init(this.$refs.echart);
    myChart.setOption(this.option);
    window.addEventListener("resize", function (event) {
        myChart.resize();
    })

  }
};
</script>

<style scoped>
.echart-box{
}
</style>