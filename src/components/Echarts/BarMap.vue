<template>
  <div ref="echart" class="echart-box" style="height: 400px; width: 100%"></div>
</template>
  <script>
import * as echarts from "echarts";
export default {
  name: "BarMap",
  data() {
    return {
    };
  },
  mounted() {
    var myChart = echarts.init(this.$refs.echart);
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 100; i++) {
      xAxisData.push("A" + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    var option = {
      title: {
        text: "动态视图",
      },
      legend: {
        data: ["bar", "bar2"],
      },
      toolbox: {
        // y: 'bottom',
        feature: {
          magicType: {
            type: ["stack"],
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2,
          },
        },
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: "bar",
          type: "bar",
          data: data1,
          emphasis: {
            focus: "series",
          },
          animationDelay: function (idx) {
            return idx * 10;
          },
        },
        {
          name: "bar2",
          type: "bar",
          data: data2,
          emphasis: {
            focus: "series",
          },
          animationDelay: function (idx) {
            return idx * 10 + 100;
          },
        },
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: function (idx) {
        return idx * 5;
      },
    };
    myChart.setOption(option);
    window.addEventListener("resize", function (event) {
        myChart.resize();
    })
  },
};
</script>
  
  <style scoped>
</style>