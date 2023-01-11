<template>
    <div>
        <FilterBar></FilterBar>
        <el-card class="info-card infinite-list-wrapper" style="overflow: auto">
            <el-button type="primary" @click="addNewScore">新增成绩</el-button>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号" align="center">
                </el-table-column>
                <el-table-column prop="name" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="subject" label="科目" align="center">
                </el-table-column>
                <el-table-column prop="score" label="分数" align="center">
                </el-table-column>
                <el-table-column prop="type" label="类型" align="center">
                </el-table-column>
                <el-table-column  label="状态" align="center">
                    <template slot-scope="{row}">
                        <el-tag :type="row.score>=60?`success`:`danger`">{{ row.score>=60?"通过":"挂科" }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{row}">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <Pagination v-show="show"></Pagination>
        <el-dialog title="新增成绩" :visible.sync="dialogFormVisible">
            <el-form :model="form" style="width: 90%;" :rules="rules" ref="myForm">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off" :disabled="!canEnter"></el-input>
                </el-form-item>
                <el-form-item label="科目" :label-width="formLabelWidth" prop="subject">
                    <el-input v-model="form.subject" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="成绩" :label-width="formLabelWidth" prop="score">
                    <el-input v-model="form.score" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="科目类型" :label-width="formLabelWidth" prop="type">
                    <el-select v-model="form.type" placeholder="请选择科目类型" style="width: 100%;">
                        <el-option label="必修" value="必修"></el-option>
                        <el-option label="选修" value="选修"></el-option>
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
import { getScore, getScoreByName,addScore } from "@/api/score"
import FilterBar from "@/components/FilterBar"
import Pagination from "@/components/Pagination"
export default {
    data() {
        return {
            tableData: [],
            show: false,
            dialogFormVisible: false,
            formLabelWidth: "120px",
            form: {
                name: "",
                subject: "",
                score: "",
                type: ""
            },
            canEnter: true,
            rules: {
                name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
                subject: [{ required: true, message: "请输入科目", trigger: "blur" }],
                score: [{ required: true, message: "请输入成绩", trigger: "blur" }],
                type: [{ required: true, message: "请选择类型", trigger: "blur" },],
            }
        }
    },
    components: { FilterBar, Pagination },
    mounted() {
        if (this.$route.query.name) {
            this.initTableDataByName(this.$route.query.name)
        } else {
            this.initTableData()
        }
        setTimeout(() => {
            this.show = true
        }, 400)
    },
    methods: {
        async initTableData() {
            let result = await getScore()
            if (result.code == 200) {
                this.tableData = result.data
            }
        },
        async initTableDataByName(name) {
            let result = await getScoreByName(name)
            if (result.code == 200) {
                this.tableData = result.data
            }
        },
        addNewScore() {
            this.dialogFormVisible = true
            this.form = {
                name: this.$route.query.name ? this.$route.query.name : "",
                subject: "",
                score: "",
                type: ""
            }
            this.canEnter = true
            if (this.$route.query.name) {
                this.canEnter = false
            }
        },
        okHandler(){
            this.$refs.myForm.validate(async (valid) => {
        if (valid) {
          let result = await addScore(this.form)
          if (result.code == 200) {
            this.$message({
              message: "新增成功",
              type: 'success'
            });
           this.dialogFormVisible=false
           if(this.$route.query.name){
             this.initTableDataByName(this.$route.query.name)
           }else{
            this.initTableData()
           }
          } else {
            this.$message.error('添加失败');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
        }
    }
}
</script>

<style>
.info-card {
    margin: 0 5px;
    height: 800px
}

.infinite-list-wrapper {
    height: calc(100vh - 210px);
}
</style>