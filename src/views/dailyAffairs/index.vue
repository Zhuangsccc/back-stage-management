<template>
  <div class="daily-container" ref="all">
    <div class="daily-header">
      <el-button type="primary" @click="addNew()">发布新事务</el-button>
    </div>
    <div class="daily-box" >
      <div class="daily-item" v-for="(item, index) in affairsList" :key="index">
        <el-card style="height: 100%;">
          <el-descriptions :title="item.title">
            <template slot="extra">
              <el-button type="danger" size="small" @click="deleteItem(item.title)">删除</el-button>
            </template>
            <el-descriptions-item label="发布人">{{
              item.publisher
            }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{
              item.phone
            }}</el-descriptions-item>
            <el-descriptions-item label="时间">{{
              item.time
            }}</el-descriptions-item>
            <el-descriptions-item label="标签">
              <el-tag size="small">{{ item.tag }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="备注">{{
              item.remarks
            }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="myForm" style="width: 80%">
        <el-form-item label="事务名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布人" :label-width="formLabelWidth">
          <el-input v-model="form.publisher" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-input v-model="form.tag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期选择" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.time"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="OkHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DailyAffairs",
  data() {
    return {
      //列表展示数据(模拟)
      affairsList: [
        {
          title: "期末考试",
          time: "2020-11-12",
          tag: "考试",
          phone: "18558977471",
          publisher: "教导主任",
          remarks: "整个高中年段统考",
        },
      ],
      //控制弹出框显示隐藏
      dialogFormVisible: false,
      //弹出框标题
      title: "",
      //弹出框收集表单
      form: {
        title: "",
        time: "",
        tag: "",
        phone: "",
        publisher: "",
        remarks: "",
      },
      //弹出框文本长度
      formLabelWidth: "120px",
    };
  },
  methods: {
    //新增操作
    addNew() {
      this.title = "新增事务";
      this.showDig();
    },
    //展示弹出框
    showDig() {
      this.dialogFormVisible = true;
      this.form = {
        title: "",
        time: "",
        tag: "",
        phone: "",
        publisher: "",
        remarks: "",
      };
    },
    //弹出框点击确定操作
    OkHandler() {
      this.affairsList.push(this.form);
      this.dialogFormVisible = false;
    },
    //删除操作
    deleteItem(title){
      this.$confirm('此操作将永久删除该事务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.affairsList=this.affairsList.filter(item=>{
        return item.title!==title
      })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style>
.daily-box {
  display: flex;
  flex-wrap: wrap;
  min-width: 1520px;
}
.daily-item {
  width: 32%;
  margin: 5px 5px 0 5px;
  height: 188px;
}
.daily-header {
  margin-top: 5px;
  margin-left: 5px;
}
</style>