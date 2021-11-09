<template>
  <div>
    <div class="input">
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
      <div class="emailerr">
        <i class="el-icon-error" v-show="showEmailError">请填写正确的邮箱</i>
      </div>
    </div>

    <div class="input">
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
      <el-Button
        class="submit"
        type="primary"
        size="medium"
        @click="submit"
        :disabled="isdisabled"
        >确定</el-Button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailCheck",
  data() {
    return {
      email: "",
      showEmailError: false,
      code: "",
      isdisabled: true,
    };
  },
  methods: {
    verifyEmail() {
      let verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!verify.test(this.email) || this.email === "") {
        this.showEmailError = true;
      } else {
        this.showEmailError = false;
      }
    },
    emailfocus() {
      this.showEmailError = false;
    },
    sendcode() {
      this.isdisabled = false;
      if (this.showEmailError || this.email === "") {
        this.$message({
          message: "请填写正确的邮箱",
          type: "error",
          duration: 800,
          offset: 300,
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
              this.$message({
                message: "验证码已发送",
                type: "success",
                duration: 800,
                // offset: 320,
                center: true,
              });
              this.isdisabled = false;
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
    submit() {
      if (this.email && this.code && !this.showEmailError) {
        this.$router.push("/forgotpwd/pwdreset");
        // this.$axios({
        //   method: "POST",
        //   url: "http://192.168.137.1:8083/register/userRegister",
        //   data: {
        //     email: this.email,
        //     code: this.code,
        //   },
        // }).then(
        //   (response) => {
        //     console.log(response.data);
        //     if (response.data.code === 200) {
        //     //   this.$router.push("/");
        //     } else if (response.data.code === 70005) {
        //       this.$message({
        //         type: "error",
        //         message: "验证码错误",
        //         duration: 1500,
        //       });
        //     } else {
        //       alert("未知错误");
        //     }
        //   },
        //   (error) => {
        //     alert(error.message);
        //   }
        // );
      } else {
        this.isdisabled = true;
      }
    },
  },
};
</script>

<style scoped>
.input-email {
  margin-top: 15px;
}
.input-code {
  width: 250px;
  margin-top: 10px;
}
.codebtn {
  margin-left: 38px;
}
.subbutton {
  display: flex;
  justify-content: center;
}
.submit {
  width: 300px;
  height: 30px;
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.emailerr {
  display: inline-block;
  color: red;
  font-size: 8px;
  margin-left: 5px;
}

.EmailError >>> .el-input__inner {
  border: #f55 1px solid;
  border-radius: 5px;
}
</style>