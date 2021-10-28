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
      <div class="subbutton">
        <el-Button class="submit" type="primary" size="medium" @click="submit"
          >注册</el-Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import CobwebParticles from "./CobwebParticles.vue";
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
        this.$prompt(`已发送验证码至${this.email},请输入验证码：`, "邮箱验证", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            if (value) {
              this.$message({
                type: "success",
                message: "注册成功！请登录",
              });
              this.$router.push("/");
            } else {
              this.$message({
                type: "error",
                message: "验证码错误",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      } else {
        this.$message({
          type: "error",
          message: "请填写正确信息",
        });
      }
      // axios({
      //   method: "POST",
      //   url: "http://192.168.137.121:8083/login/login",
      //   header: {
      //     userName:this.userName,
      //     passWord: this.passWord,
      //     email:this.emial
      //   },
      // }).then(
      //   (response) => {
      //     // console.log(response.data);
      //     if (true) {
      //       this.$router.push("/");
      //     } else {
      //       alert("用户名重复");
      //     }
      //   },
      //   (error) => {
      //     alert(error.message);
      //   }
      // );
    },
    verifyName() {
      this.showUsrnameError = this.userName.length < 2 ? true : false;
    },
    namefocus() {
      this.showUsrnameError = false;
    },
    verifyEmail() {
      let verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!verify.test(this.email)) {
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
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0 auto;
}
.container {
  width: 550px;
  height: 400px;
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
  margin-top: 20px;
}
.subbutton {
  display: flex;
  justify-content: center;
}
.submit {
  width: 300px;
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
.UsrnameError,
.PwdError,
.EmailError {
  border: #ff7575 2px solid;
  border-radius: 7px;
}
</style>