<template>
  <div class="container">
    <div class="header">
      <!-- <div class="header-name"><span>留言板:</span></div>
       <el-button type="primary" size="mini" round class="header-button">发布留言</el-button>
       <el-button type="primary" size="mini" round class="header-button">选择时间</el-button>
       <el-button type="danger" size="mini" round class="header-button">批量删除</el-button> -->
       <!-- 导航条 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        style="width: 100%"
      >
        <el-menu-item index="1" style="font-size: 30px">留言板</el-menu-item>
        <el-menu-item index="2">发布留言</el-menu-item>
        <el-menu-item index="3">管理操作</el-menu-item>
        <el-menu-item index="4">选择时间</el-menu-item>
      </el-menu>
    </div>
    <!-- 主要区域 -->
    <div class="main">
      <!-- 无限滚动盒子 -->
      <el-card
        class="infinite-list"
        v-infinite-scroll="load"
        style="overflow: auto"
        infinite-scroll-distance="10"
      >
      <!-- 留言条渲染区域 -->
        <el-card
          v-for="(i, index) in messageList"
          :key="index"
          class="infinite-list-item"
        >
          <i class="el-icon-user list-icon"
            ><span class="list-username">{{ i.userName }}:</span
            ><span class="list-message">{{ i.message }}</span></i
          >
          <div class="list-footer">
            <div class="list-time">{{ i.time }}</div>
            <div class="list-footer-right">
              <el-link style="padding-top: 5px"
                ><svg-icon @click="dianZan(index)" icon-class="点赞"  :class="!i.isGood?'svg':'active-svg'"
              /></el-link>
              <el-link style="margin-left: 10px;"><svg-icon icon-class="回复" class="svg" /></el-link>
            </div>
          </div>
        </el-card>
      </el-card>
      <el-card class="main-right">
        <span class="main-right-header">留言板信息:</span>
        <el-descriptions  :column="columnNumber" style="margin-top: 20px;" :labelStyle="labelStyle" :contentStyle="contentStyle"> 
          <el-descriptions-item  label="留言总条数"
            >{{messageList.length}}</el-descriptions-item
          >
          <el-descriptions-item label="最后留言时间"
            >{{messageList[0].time}}</el-descriptions-item
          >
          <el-descriptions-item label="留言限制"
            >自由发言</el-descriptions-item
          >
          <el-descriptions-item label="当前状态"
            >管理员</el-descriptions-item
          >
        </el-descriptions>
        
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoticeRelease",
  data() {
    return {
      //激活索引
      activeIndex: "1",
      //判断是否点赞
      isGood:false,
      //描述列表一行展示多少数据
      columnNumber:1,
      //描述列表标签样式
      labelStyle:{
        "font-size":"18px"
      },
      //描述列表内容样式
      contentStyle:{
        "font-size":"18px"
      },
      //模拟留言数据列表
      messageList: [
        {
          userName: "王晓波",
          message: "大家好我是王晓波",
          time: "2019-04-11 10:11",
          isGood:false
        },
        {
          userName: "张博凯",
          message: "楼上是傻逼",
          time: "2019-04-11 15:32",
          isGood:false
        },
        {
          userName: "邹龙健",
          message: "楼上说得对",
          time: "2019-04-11 19:21",
          isGood:false
        },
        {
          userName: "王晓波",
          message: "大家好我是王晓波",
          time: "2019-04-11 10:11",
          isGood:false
        },
        {
          userName: "王晓波",
          message: "大家好我是王晓波",
          time: "2019-04-11 10:11",
          isGood:false
        },
        {
          userName: "王晓波",
          message: "大家好我是王晓波",
          time: "2019-04-11 10:11",
          isGood:false
        },
        {
          userName: "王晓波",
          message: "大家好我是王晓波",
          time: "2019-04-11 10:11",
          isGood:false
        },
      ],
    };
  },
  methods: {
    //点击菜单栏
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //滚动盒子触底触发操作
    load() {
      this.count += 2;
    },
    //点赞操作
    dianZan(index) {
      this.messageList[index].isGood=!this.messageList[index].isGood
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
}
.header-name {
  font-size: 25px;
  margin-top: 15px;
  margin-left: 10px;
  width: 110px;
  border-bottom: 2px solid #efefef;
}
.header-button {
  height: 40px;
  margin-top: 10px;
}
.infinite-list {
  height: calc(100vh - 120px);
  width: 66%;
}
.list-icon {
  font-size: 20px;
}
.list-username {
  font-size: 18px;
  font-weight: 500;
  color: orange;
}
.list-message {
  font-size: 18px;
  margin-left: 10px;
}
.list-time {
  font-size: 14px;
  padding-top: 10px;
}
.svg {
  height: 20px;
  width: 20px;
}
.active-svg{
  height: 20px;
  width: 20px;
  color:red
}
.list-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.infinite-list-item {
  margin-top: 10px;
}
.main-right {
  width: 33%;
  margin-left: 20px;
}
.main {
  display: flex;
}
.main-right-header{
  font-size: 22px;
  font-weight: 550;
}
</style>