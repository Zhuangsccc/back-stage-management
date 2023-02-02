<template>
  <div class="container">
    <div class="header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        style="width: 100%"
      >
        <el-menu-item index="1" style="font-size: 30px">留言板</el-menu-item>
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
        <el-table
          :data="
            tableData.filter(
              (data) =>
                !keyword ||
                data.name.toLowerCase().includes(keyword.toLowerCase()) ||
                data.subject.toLowerCase().includes(keyword.toLowerCase())
            )
          "
          style="width: 100%"
        >
        <el-table-column type="index" label="序号" align="center">
          </el-table-column>
          <el-table-column prop="publisher" label="用户昵称" align="center">
          </el-table-column>
          <el-table-column prop="content" label="留言内容" align="center">
          </el-table-column>
          <el-table-column prop="release_time" label="留言时间" align="center">
          </el-table-column>
          <el-table-column prop="is_reply" label="是否回复" align="center">
            <template slot-scope="{ row }">
              <el-tag :type="row.is_reply == 1 ? `success` : `danger`">{{
                row.is_reply == 1 ? "已回复" : "未回复"
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="reply_content" label="回复内容" align="center">
            <template slot-scope="{ row }">
              <span v-show="!row.is_reply">暂未回复</span>
              <span v-show="row.is_reply">{{ row.reply_content }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="{ row }">
              <el-tag :type="row.state == 1 ? `success` : `danger`">{{
                row.state == 1 ? "正常" : "隐藏"
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-link type="primary" style="margin-right: 10px" size="small"
              @click="toReply(row)"
                >回复</el-link
              >
              <el-link
                type="danger"
                style="margin-right: 10px"
                size="small"
                @click="toDelete(row.id)"
                >删除</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="main-right">
        <span class="main-right-header">留言板信息:</span>
        <el-descriptions
          :column="columnNumber"
          style="margin-top: 20px"
          :labelStyle="labelStyle"
          :contentStyle="contentStyle"
        >
          <el-descriptions-item label="留言总条数">{{
            total
          }}</el-descriptions-item>
          <el-descriptions-item label="留言限制">自由发言</el-descriptions-item>
          <el-descriptions-item label="当前状态">管理员</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-dialog
        title="回复"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-card class="message-card" style="overflow: auto"  shadow="hover">
          <div style="padding-top: 10px">
            <div class="message-content">{{item.content}}</div>
            <div class="release-status">
              <div class="publisher">{{item.publisher}}</div>
              <div style="margin-left: 5px">发布于</div>
              <div class="release-time">{{item.release_time}}</div>
            </div>
          </div>
        </el-card>
         <el-card class="input-content" shadow="hover">
        <textarea
          v-model="content"
          class="my-input"
          type="textarea"
          placeholder="请输入回复"
        ></textarea>
      </el-card>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="okHandler"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <Pagination
      v-show="show"
      @getPageInfo="getPageInfo"
      :total="total"
    ></Pagination>
  </div>
</template>

<script>
import { getMessageBoard, deleteMessageBoard ,updateMessageBoard } from "@/api/message";
import { getMoment } from "@/utils";
export default {
  name: "NoticeRelease",
  data() {
    return {
      content:"",
      item:{},
      dialogVisible:false,
      show: false,
      tableData: [],
      total: 0,
      pageIndex: 0,
      pageSize: 10,
      keyword: "",
      //激活索引
      activeIndex: "1",
      //描述列表一行展示多少数据
      columnNumber: 1,
      //描述列表标签样式
      labelStyle: {
        "font-size": "18px",
      },
      //描述列表内容样式
      contentStyle: {
        "font-size": "18px",
      },
    };
  },
  methods: {
    //点击菜单栏
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //滚动盒子触底触发操作
    load() {},
    async getPageInfo(pageIndex, pageSize) {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.initTableData();
    },
    async initTableData() {
      let result = await getMessageBoard(this.pageIndex, this.pageSize);
      if (result.code == 200) {
        this.tableData = result.data.tableData;
        this.total = result.data.total;
      }
    },
    toDelete(id) {
      this.$confirm("此操作将永久删除该条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await deleteMessageBoard(id);
          const { code, msg } = result;
          if (code == 200) {
            this.$message({
              type: "success",
              message: result.msg,
            });
            this.initTableData();
          } else {
            this.$message.error(msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClose(){
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    toReply(row){
      this.dialogVisible = true
      this.item=row
      this.content = ""
    if(row.is_reply){
      this.content = row.reply_content
    }
    },
    async okHandler(){
      const t = new Date();
      let data = {
        reply_content:this.content,
        id:this.item.id,
        reply_time:getMoment(t),
        is_reply:this.content==""?0:1
      }
      let result = await updateMessageBoard(data)
      if(result.code==200){
        this.$message({
          message:result.msg,
          type:"success"
        })
        this.dialogVisible=false
        this.initTableData()
      }else{
         this.$message.error(result.msg);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 400);
    this.initTableData();
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
  width: 90%;
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
.active-svg {
  height: 20px;
  width: 20px;
  color: red;
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
  width: 20%;
  margin-left: 20px;
}
.main {
  display: flex;
}
.main-right-header {
  font-size: 22px;
  font-weight: 550;
}
.release-status{
  display: flex;
}
.input-content{
  height: 200px;
  margin-top: 5px;
}
.my-input{
  height: 200px;
  width: 100%;
  border: 0px;
  outline: none;
}
</style>