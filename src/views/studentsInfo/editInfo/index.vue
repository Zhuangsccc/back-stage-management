<template>
  <div class="info-box">
    <el-card>
      <div class="user-box-header">
        <div class="box-header-left">
          <div class="back-box" @click="backToStu">
            <i style="line-height: 25px" class="el-icon-back"></i>
            <div class="back-name">返回</div>
          </div>
          <div class="page-name">{{ title }}</div>
        </div>
        <div class="box-header-right">
          <el-button type="primary" @click="okHandler">确定</el-button>
          <el-button>取消</el-button>
        </div>
      </div>
    </el-card>
    <el-card>
      <div class="user-box-main">
        <div class="account-information">
          <div class="account-information-header">账户信息</div>
          <div class="account-information-form">
            <el-form :model="form" label-width="80px" :rules="rules" ref="myForm">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名:" prop="name">
                    <el-input v-model="form.name" style="width: 90%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="专业:" prop="major">
                    <el-input v-model="form.major" style="width: 90%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="性别:" prop="gender">
                    <el-select v-model="form.gender" placeholder="请选择" style="width: 90%">
                      <el-option v-for="item in genderOptions" :key="item.value" :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item></el-col>
                <el-col :span="12">
                  <el-form-item label="班级:" prop="class">
                    <el-input v-model="form.class" style="width: 90%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="电话:" prop="phone">
                    <el-input v-model="form.phone" style="width: 90%"></el-input>
                  </el-form-item></el-col>
                <el-col :span="12">
                  <el-form-item label="辅导员:" prop="assistant">
                    <el-input v-model="form.assistant" style="width: 90%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="年龄:" prop="age">
                    <el-input v-model="form.age" style="width: 90%"></el-input>
                  </el-form-item></el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="form.email" style="width: 90%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addStuInfo } from '@/api/table'
import { deepClone } from '@/utils';
export default {
  data() {
    return {
      title: "学生管理",
      tempForm:{},
      form: {
        name: "",
        major: "",
        gender: "",
        class: "",
        phone: "",
        assistant: "",
        age: "",
        email: ""
      },
      genderOptions: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        major: [
          { required: true, message: "请输入专业", trigger: "blur" },
        ],
        gender: [
          { required: true, message: "请选择性别", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[345789]\d{9}))$/, message: '请输入正确的电话号码或者固话号码' }
        ],
        class: [
          { required: true, message: "请输入班级", trigger: "blur" }
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" }
        ],
        assistant: [
          { required: true, message: "请输入辅导员", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
        ]
      },
    }
  },
  methods: {
    okHandler() {
      this.$refs.myForm.validate(async (valid) => {
        if (valid) {
          let result = await addStuInfo(this.form)
          if (result.code == 200) {
            this.$message({
              message: this.form.id?"修改成功":'添加成功',
              type: 'success'
            });
            setTimeout(()=>{
              this.$router.push({name:"StudentsInfo"})
            },2000)
          } else {
            this.$message.error('添加失败');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    backToStu() {
      this.$router.push({ name: "StudentsInfo" })
    }
  },
  mounted(){
    if(this.$route.query){
      this.tempForm = deepClone(this.$route.query)
      Object.assign(this.form,this.tempForm)
      console.log(this.form);
    }
  }
}
</script>

<style>
.user-box-header {
  height: 25px;
  line-height: 25px;
  display: flex;
  justify-content: space-between;
}

.box-header-left {
  width: 400px;
  display: flex;
}

.back-name {
  padding-right: 10px;
  border-right: 2px #abaaaa solid;
}

.page-name {
  font-size: 20px;
  margin-left: 10px;
}

.back-box {
  display: flex;
}

.account-information-header {
  margin-left: 20px;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 2px #efefef solid;
  padding-bottom: 10px;
}

.account-information-form {
  margin-top: 20px;
  margin-left: 20px;
}
</style>