<template>
  <div>
    <FilterBar></FilterBar>
    <el-card class="info-card infinite-list-wrapper" style="overflow: auto">
      <el-button type="primary" @click="addNew">新建</el-button>
      <el-table
        class="el-table-style"
        :data="
          tableData.filter(
            (data) =>
              !keyword ||
              data.name.toLowerCase().includes(keyword.toLowerCase())
          )
        "
        style="width: 100%"
        :default-sort="{ prop: 'time', order: 'descending' }"
      >
        <el-table-column label="序号" type="index" align="center" width="80">
        </el-table-column>
        <el-table-column label="事件名称" prop="event_name" align="center">
        </el-table-column>
        <el-table-column
          label="发起人"
          prop="sponsor"
          align="center"
          width="200"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="开始时间"
          prop="start_time"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column label="结束时间" prop="end_time" align="center">
        </el-table-column>
        <el-table-column label="范围" prop="range" align="center">
        </el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="{ row }">
            <el-tag :type="row.onTime ? 'success' : 'danger'">{{
              row.onTime ? "进行中" : "不在时间范围"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="desc" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-link
              type="primary"
              :underline="false"
              style="margin-left: 10px"
              @click="goDelete(row)"
              >编辑</el-link
            >
            <el-link
              type="danger"
              :underline="false"
              style="margin-left: 10px"
              @click="goDelete(row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Pagination
      v-show="show"
      @getPageInfo="getPageInfo"
      :total="total"
    ></Pagination>
    <el-dialog title="新建事务" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: 90%" :rules="rules" ref="myForm">
        <el-form-item
          label="事件名称:"
          :label-width="formLabelWidth"
          prop="event_name"
        >
          <el-input v-model="form.event_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="发起人:"
          :label-width="formLabelWidth"
          prop="sponsor"
        >
          <el-input v-model="form.sponsor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="范围:" :label-width="formLabelWidth" prop="range">
          <el-input v-model="form.range" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述:" :label-width="formLabelWidth" prop="desc">
          <el-input v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item
          label="时间:"
          :label-width="formLabelWidth"
          prop="start_time"
        >
          <el-date-picker
            v-model="time_range"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类型:" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="okHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTodoList,addTodo } from "@/api/todo";
import { judgeTime } from "@/utils/index";
export default {
  name: "DailyAffairs",
  data() {
    return {
      keyword: "",
      show: false,
      total: 0,
      pageIndex: 0,
      pageSize: 10,
      tableData: [],
      title: "",
      dialogFormVisible: false,
      form: {
        event_name: "",
        sponsor: "",
        start_time: "",
        end_time: "",
        desc: "",
        range: "",
        type: "",
      },
      rules: {
        event_name: [{ required: true, message: "请输入事务名称", trigger: "blur" }],
        sponsor: [{ required: true, message: "请输入发起人", trigger: "blur" }],
        start_time: [{ required: true, message: "请选择时间跨度", trigger: "blur" }],
        desc: [{ required: true, message: "请输入事务描述", trigger: "blur" }],
        range: [{ required: true, message: "请输入范围", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      time_range: [],
      options:[
        {
          value:"教务",
          lable:"教务"
        },
        {
          value:"劳务",
          lable:"劳务",
        },
        {
          value:"财务",
          lable:"财务"
        }
      ]
    };
  },
  methods: {
    getKeyWord(e) {
      this.keyword = e;
    },
    async getPageInfo(pageIndex, pageSize) {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.initTableData();
    },
    async initTableData() {
      let result = await getTodoList(this.pageIndex, this.pageSize);
      if (result.code == 200) {
        this.tableData = result.data.tableData;
        this.tableData.forEach((item) => {
          item.onTime = judgeTime(item.start_time, item.end_time);
        });
        console.log(this.tableData);
        if (result.data.total) {
          this.total = result.data.total;
        }
      }
    },
    goDelete(row) {},
    okHandler() {
       this.$refs.myForm.validate(async (valid) => {
          if (valid) {  
            let result = await addTodo(this.form)
            if(result.code==200){
              this.$message({
                message:result.msg,
                type:"success"
              })
              this.dialogFormVisible=false
            }else{
              this.$message.error(result.msg)
              this.dialogFormVisible=false
            }
          } else {
            return false;
          }
        });
    },
    addNew() {
      this.form = {
        event_name: "",
        sponsor: "",
        start_time: "",
        end_time: "",
        desc: "",
        range: "",
        type: "",
      }
      this.time_range = []
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
        this.$refs.myForm.clearValidate()
      })
    },
  },
  watch: {
    time_range: {
      handler(newValue) {
        if (newValue) {
          this.form.start_time = newValue[0];
          this.form.end_time = newValue[1];
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.initTableData();
    setTimeout(() => {
      this.show = true;
    }, 400);
  },
};
</script>

<style scoped>
.info-card {
  margin: 0 5px;
  height: 800px;
}

.infinite-list-wrapper {
  height: calc(100vh - 200px);
}
</style>