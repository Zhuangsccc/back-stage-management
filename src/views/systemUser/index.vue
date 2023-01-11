<template>
  <div>
    <FilterBar @getKeyWord="getKeyWord"></FilterBar>
    <el-card class="info-card infinite-list-wrapper" style="overflow: auto">
      <el-button type="primary" @click="addUser">新增用户</el-button>
      <el-table :data="tableData.filter(data => !keyword || data.name.toLowerCase().includes(keyword.toLowerCase()))" style="width: 100%">
        <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" width="250">
        </el-table-column>
        <el-table-column label="创建日期" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.time | changeMoment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-link type="primary" size="mini" @click="setPermission(row)">权限设置</el-link>
            <el-link type="primary" size="mini" @click="resetPassword(row)" style="margin-left: 10px">重置密码</el-link>
            <el-link type="danger" size="mini" @click="deleteUser(row)" style="margin-left: 10px"
              :disabled="row.name == `admin`">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: 90%;" :rules="rules" ref="myForm">
        <el-form-item label="新密码:" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码:" :label-width="formLabelWidth" prop="password2">
          <el-input v-model="form.password2" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="okHandler">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible2">
      <el-form :model="regForm" style="width: 90%;" :rules="rules2" ref="myForm2">
        <el-form-item label="账号:" :label-width="formLabelWidth" prop="username">
          <el-input v-model="regForm.username" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
          <el-input v-model="regForm.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码:" :label-width="formLabelWidth" prop="password2">
          <el-input v-model="regForm.password2" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="regOkHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar"
import { getUserList, updatePassWord, deleteU,register,setUser} from "@/api/user"
import { getMoment } from "@/utils"
export default {
  components: { FilterBar },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次密码要相同"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.regForm.password) {
        callback(new Error("两次密码要相同"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: '120px',
      form: {
        password: "",
        password2: ""
      },
      regForm: {
        username: "",
        password: "",
        password2: ""
      },
      username: "",
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur", },
        ],
        password2: [
          { required: true, message: "请重复密码", trigger: "blur", validator: validatePass },
        ],
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur", },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur", },
        ],
        password2: [
          { required: true, message: "请重复密码", trigger: "blur", validator: validatePass2 },
        ],
      },
      keyword:""
    }
  },
  mounted() {
    this.initTableData()
  },
  methods: {
    async initTableData() {
      let result = await getUserList()
      if (result.code == 200) {
        this.tableData = result.data
        this.tableData.forEach((item) => {
          item.time = parseInt(item.time)
          item.roles = item.roles.split(",")
        })
      }
    },
    setPermission(row) {
      this.$router.push({
        path: "/系统设置/菜单权限",
        query: {
          roles: row.roles,
          name:row.name
        }
      })
    },
    resetPassword(row) {
      this.dialogFormVisible = true
      this.form = {
        password: "",
        password2: ""
      }
      this.username = row.name
    },
    okHandler() {
      this.$refs.myForm.validate(async (valid) => {
        if (valid) {
          let result = await updatePassWord(this.username, this.form.password)
          if (result.code == 200) {
            this.$message({
              message: "修改成功",
              type: 'success'
            });
            this.initTableData()
          } else {
            this.$message.error(result.msg)
          }
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    deleteUser(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await deleteU(row.name)
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.initTableData()
        } else {
          this.$message.error(result.msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addUser() {
      this.dialogFormVisible2 = true
    },
    regOkHandler(){
      this.$refs.myForm2.validate(async (valid) => {
        if (valid) {
          let data = {
            username:this.regForm.username,
            password:this.regForm.password
          }
          let result = await register(data)
          if (result.code == 200) {
            let data = {
                name: this.regForm.username,
                roles: "",
                time:new Date().getTime()
              }
              let result2 = await setUser(data)
              if (result2.code == 200) {
                this.$message({
                  message: "注册成功",
                  type: "success",
                });
                this.initTableData()
                this.dialogFormVisible2=false
              }
          } else {
            this.$message.error(result.msg)
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getKeyWord(e){
      this.keyword=e
    }
  },
  filters: {
    changeMoment(time) {
      return getMoment(time);
    }
  }
}
</script>

<style scoped>
.info-card {
  margin: 0 5px;
  height: 800px
}

.infinite-list-wrapper {
  height: calc(100vh - 160px);
}
</style>