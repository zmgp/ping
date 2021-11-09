<template>
  <div class="register">
    <CobwebParticles />
    <div class="container">
      <p class="title">注册</p>
      <div class="input">
        <div class="text t1">用户名</div>
        <el-input
          class="input-name"
          prefix-icon="el-icon-user-solid"
          placeholder="请输入用户名"
          clearable
          @focus="namefocus"
          @blur="verifyName"
          v-model="userName"
          :class="{ UsrnameError: showUsrnameError }"
        >
        </el-input>
        <i class="el-icon-error" v-show="showUsrnameError">用户名至少两位</i>
      </div>

      <div class="input">
        <div class="text t2">邮箱</div>
        <el-input
          class="input-email"
          prefix-icon="el-icon-message"
          placeholder="请输入邮箱"
          clearable
          v-model="email"
          @focus="emailfocus"
          @blur="verifyEmail"
          :class="{ EmailError: showEmailError }"
        >
        </el-input>
        <i class="el-icon-error" v-show="showEmailError">邮箱格式错误</i>
      </div>

      <div class="input">
        <div class="text t2">密码</div>
        <el-input
          class="input-pwd"
          type="passWord"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          clearable
          v-model="passWord"
        ></el-input>
      </div>
      <div class="input">
        <div class="text">确认密码</div>
        <el-input
          class="input-pwd2"
          type="passWord"
          prefix-icon="el-icon-lock"
          placeholder="请再次输入密码"
          clearable
          :class="{ PwdError: showPwdError }"
          v-model="repeatPassword"
          @focus="pwdfocus"
          @blur="verifyPwd"
        ></el-input>
        <i class="el-icon-error" v-show="showPwdError">密码输入不一致</i>
      </div>

      <div class="input">
        <div class="text">邮箱验证</div>
        <el-input
          class="input-code"
          prefix-icon="el-icon-circle-check"
          placeholder="请输入验证码"
          v-model="code"
        >
        </el-input>
        <el-button class="codebtn" type="info" plain @click="sendcode"
          >发送验证码</el-button
        >
      </div>

      <div class="subbutton">
        <el-Button class="submit" type="primary" size="medium" @click="submit"
          >注册</el-Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import CobwebParticles from "../animation/CobwebParticles.vue";
export default {
  name: "Register",
  components: { CobwebParticles },
  data() {
    return {
      passWord: "",
      repeatPassword: "",
      userName: "",
      email: "",
      showPwdError: false,
      showUsrnameError: false,
      showEmailError: false,
      timer: null,
      code: "",
    };
  },

  methods: {
    submit() {
      if (
        this.passWord &&
        this.repeatPassword &&
        this.userName &&
        this.email &&
        !this.showPwdError &&
        !this.showUsrnameError &&
        !this.showEmailError
      ) {
        this.$axios({
          method: "POST",
          url: "http://192.168.137.1:8083/register/userRegister",
          data: {
            username: this.userName,
            password: this.passWord,
            email: this.email,
            code: this.code,
          },
        }).then(
          (response) => {
            console.log(response.data);
            if (response.data.code === 200) {
              this.$message({
                message: `注册成功!返回登录`,
                type: "success",
                duration: 1500,
              });
              this.timer = setInterval(() => {
                this.$router.push("/");
              }, 2000);
            } else if (response.data.code === 70005) {
              this.$message({
                type: "error",
                message: "验证码错误",
                duration: 1500,
              });
            } else if (response.data.code === 20005) {
              this.$message({
                message: "用户已存在",
                type: "error",
                duration: 1500,
              });
            } else {
              alert("未知错误");
            }
          },
          (error) => {
            alert(error.message);
          }
        );
      } else {
        this.$message({
          type: "error",
          message: "请填写正确信息",
        });
      }
    },
    sendcode() {
      if (this.email === "") {
        this.$message({
          message: "邮箱不能为空",
          type: "error",
          duration: 1500,
          offset: 320,
          center: true,
        });
      } else if (this.showEmailError) {
        this.$message({
          message: "请填写正确格式的邮箱",
          type: "error",
          duration: 1500,
          offset: 320,
          center: true,
        });
      } else {
        this.$axios({
          method: "POST",
          url: "http://192.168.137.1:8083/register/emailSend",
          params: {
            email: this.email,
          },
          // headers: {
          //   "Content-Type": "application/x-www-form-urlencoded",
          // },
        }).then(
          (response) => {
            console.log(response.data);
            if (response.data.code === 200) {
              // this.$router.push("/");
              this.$message({
                message: "验证码已发送至邮箱",
                type: "success",
                duration: 1500,
                offset: 320,
                center: true,
              });
            } else if (response.data.code === 20005) {
              this.$message({
                message: "邮箱已存在",
                type: "error",
                duration: 1500,
                offset: 320,
                center: true,
              });
            } else {
              alert("未知错误");
            }
          },
          (error) => {
            alert(error.message);
          }
        );
      }
    },
    verifyName() {
      this.showUsrnameError = this.userName.length < 2 ? true : false;
    },
    namefocus() {
      this.showUsrnameError = false;
    },
    verifyEmail() {
      let verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!verify.test(this.email) && this.email !== "") {
        this.showEmailError = true;
      } else {
        this.showEmailError = false;
      }
    },
    emailfocus() {
      this.showEmailError = false;
    },
    verifyPwd() {
      this.showPwdError = this.passWord !== this.repeatPassword;
    },
    pwdfocus() {
      this.showPwdError = false;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0 auto;
}
.container {
  width: 550px;
  height: 420px;
  box-sizing: border-box;
  padding: 15px 20px 15px 50px;
  border-radius: 20px;
  box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: #7a7b7e;
}
.input,
.submit {
  box-sizing: border-box;
  width: 480px;
  height: 40px;
  margin-top: 20px;
}
.subbutton {
  display: flex;
  justify-content: center;
}
.submit {
  width: 320px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-name,
.input-email,
.input-pwd,
.input-pwd2 {
  width: 300px;
}
.input .input-code {
  width: 150px;
}
.codebtn {
  margin-left: 38px;
}
.text {
  display: inline-block;
  color: #7a7b7e;
  margin-right: 10px;
}
.t1 {
  margin-left: 15px;
}
.t2 {
  margin-left: 30px;
}
.el-icon-error {
  display: inline-block;
  color: red;
  font-size: 8px;
  margin-left: 5px;
}
.UsrnameError >>> .el-input__inner,
.PwdError >>> .el-input__inner,
.EmailError >>> .el-input__inner {
  border: #f55 1px solid;
  border-radius: 5px;
}
</style>