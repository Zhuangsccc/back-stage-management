<template>
  <div class="login-box">
    <div class="box-left">
      <img src="@/assets/登录图.png" alt="" />
    </div>
    <div class="box-right">
      <div class="inside-box" v-if="!isRegister">
        <div style="display: flex; justify-content: center; align-items: center">
          <svg-icon icon-class="在线教育" class="svg" />
          <header><i class="iconfont">学生管理系统</i></header>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top: 20px">
          <el-form-item label="">
            <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
              tabindex="1" auto-complete="on" prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" :key="passwordType" ref="password" v-model="loginForm.password"
              :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on"
              @keyup.enter.native="handleLogin" @focus="showIcon = 1" @blur="showIcon = 0"><i v-show="showIcon"
                slot="suffix" class="el-icon-view" @click="showPwd"></i></el-input>
          </el-form-item>
          <el-button :loading="loading" type="primary" style="width: 100%"
            @click.native.prevent="handleLogin">登录</el-button>
          <div style="width: 100%; display: flex; justify-content: center">
            <el-link @click="toRegister">还没有账号？快去注册一个</el-link>
          </div>
        </el-form>
      </div>
      <div class="register-box" v-if="isRegister">
        <div class="register-box-header">
          <div class="register-box-header-left" @click="backToLogin"><el-link><i
                class="el-icon-back"></i><span>返回登录</span></el-link></div>
          <svg-icon icon-class="在线教育" class="svg" />
          <header><i class="iconfont">注册</i></header>
        </div>
        <el-form ref="registerForm" :model="registerForm" :rules="loginRules" style="margin-top: 20px">
          <el-form-item>
            <el-input ref="username" v-model="registerForm.username" placeholder="请输入用户名" name="username" type="text"
              tabindex="1" auto-complete="on" prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" :key="passwordType" ref="password" v-model="registerForm.password"
              :type="passwordType" placeholder="请输入密码" name="password" tabindex="2" auto-complete="on"
              @keyup.enter.native="handleLogin" @focus="showIcon = 1" @blur="showIcon = 0"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 5px">
            <el-input prefix-icon="el-icon-lock" :key="passwordType" v-model="secondPassword" :type="passwordType"
              placeholder=" 请输入密码 " name=" password " tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin"
              @focus="showIcon = 1" @blur="showIcon = 0"></el-input>
            <span v-show="!isPass" class=" register-tag " style=" color: #c00000 ">两次输入的密码不一致</span>
          </el-form-item>
          <el-button :loading="loading" type=" primary " style=" width: 100% "
            @click.native.prevent="handleRegister">注册</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { register, setUser } from "@/api/user";
export default {
  name: "StudentPerformance",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      showIcon: 0,
      //是否处于注册状态
      isRegister: false,
      //两次密码是否一致
      isPass: true,
      //第二次输入的密码
      secondPassword: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
    secondPassword: {
      handler(newValue) {
        if (newValue !== this.registerForm.password) {
          this.isPass = false;
        } else {
          this.isPass = true;
        }
      },
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path:"/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRegister() {
      if (this.isPass) {
        this.$refs.registerForm.validate(async (valid) => {
          if (valid) {
            this.loading = true;
            let result = await register(this.registerForm);
            if (result.code == 200) {
              let data = {
                name: this.registerForm.username,
                roles: "",
                time:new Date().getTime()
              }
              let result2 = await setUser(data)
              if (result2.code == 200) {
                this.$message({
                  message: "注册成功",
                  type: "success",
                });
                this.loading = false;
                this.isRegister = false;
              }
            }
            this.loading = false;
          }
        });
      }
    },
    toRegister() {
      this.isRegister = true;
      this.registerForm = {
        username: "",
        password: "",
      };
    },
    backToLogin() {
      this.isRegister = false
    }
  },
};
</script>

<style scoped lang="scss">
.login-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  min-width: 1300px;
}

.box-left {
  background-color: dodgerblue;
  width: 55%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-right {
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: #06a7fd solid 3px;
}

.inside-box {
  padding-top: 80px;
  width: 500px;
  height: 500px;
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

@font-face {
  font-family: "仓耳渔阳体 W01";
  font-weight: 400;
  src: url("//at.alicdn.com/wf/webfont/OwzqFAbuXJtW/1GlofK69wVDo4DvMnr2F4.woff2") format("woff2"),
    url("//at.alicdn.com/wf/webfont/OwzqFAbuXJtW/UcEZK3vp8TsDLhnGTNUe4.woff") format("woff");
  font-display: swap;
}

.iconfont {
  font-family: "仓耳渔阳体 W01" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  font-size: 2.5rem;
}

.svg {
  height: 50px;
  width: 50px;
}

.register-box {
  padding-top: 80px;
  width: 500px;
  height: 500px;
}

.register-tag {
  height: 10px;
}

.register-box-header {
  display: flex;

}

.register-box-header-left {
  margin-top: 20px;
  width: 180px;
}
</style>