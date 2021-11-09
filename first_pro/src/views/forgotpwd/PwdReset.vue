<template>
  <div>
    <p class="t1">您正在找回的账号是：{{ this.userName }}</p>
    <div class="input">
      <div class="text t2">新密码</div>
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
        >确定</el-Button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PwdReset",
  data() {
    return {
      userName: "",
      passWord: "",
      repeatPassword: "",
      showPwdError: false,
    };
  },
  methods: {
    verifyPwd() {
      this.showPwdError = this.passWord !== this.repeatPassword;
    },
    pwdfocus() {
      this.showPwdError = false;
    },
    submit() {
      if (this.passWord && this.repeatPassword && !this.showPwdError) {
        this.$router.push("/");
        // this.$axios({
        //   method: "POST",
        //   url: "http://192.168.137.1:8083/register/userRegister",
        //   data: {
        //     password: this.password,
        //   },
        // }).then(
        //   (response) => {
        //     console.log(response.data);
        //     if (response.data.code === 200) {
        this.$message({
          message: `密码重置成功!返回登录`,
          type: "success",
          duration: 1500,
        });
        //     //   this.$router.push("/");
        //     }  else {
        //       alert("未知错误");
        //     }
        //   },
        //   (error) => {
        //     alert(error.message);
        //   }
        // );
      } else {
        this.$message({
          type: "error",
          message: "请填写正确信息",
        });
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0 auto;
  padding: 0;
}
.input-pwd {
  width: 300px;
  margin-top: 15px;
}
.input-pwd2 {
  width: 300px;
  margin-top: 20px;
}
.text {
  display: inline-block;
  color: #7a7b7e;
  margin-right: 10px;
}
.t1 {
  color: #8f9094;
  font-size: 13px;
}
.t2 {
  margin-left: 16px;
}
.subbutton {
  display: flex;
  justify-content: center;
}
.submit {
  width: 300px;
  height: 30px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-icon-error {
  display: inline-block;
  color: red;
  font-size: 8px;
  margin-left: 5px;
}
.PwdError >>> .el-input__inner {
  border: #f55 1px solid;
  border-radius: 5px;
}
</style>