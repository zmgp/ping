<template>
  <div class="login">
    <!-- <BgAnimate /> -->
    <CobwebParticles />
    <!-- <Ribbon /> -->
    <div class="container">
      <p class="title">登录</p>
      <div class="input">
        <el-input
          class="input-name"
          prefix-icon="el-icon-user-solid"
          placeholder="用户名"
          clearable
          @on-blur="verifyName"
          v-model="userName"
        >
        </el-input>
      </div>

      <div class="input">
        <el-input
          class="input-pwd"
          type="passWord"
          prefix-icon="el-icon-lock"
          placeholder="密码"
          show-password
          clearable
          v-model="passWord"
        ></el-input>
      </div>

      <div class="identify">
        <el-input
          class="input-identify"
          prefix-icon="el-icon-circle-check"
          placeholder="验证码"
          v-model="idfCode"
        >
        </el-input>

        <div class="get-code" @click="refreshCode()">
          <SIdentify :identifyCode="identifyCode"></SIdentify>
        </div>
      </div>

      <el-Button class="submit" type="primary" size="medium" @click="submit"
        >登录</el-Button
      >
      <div class="regout">
        <div class="regin">
          没有账号？<span class="register" @click="register"
            >注册一下!
            <!-- <router-link to="/register">注册一下!</router-link> -->
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SIdentify from "./SIdentify.vue";
import CobwebParticles from "./CobwebParticles.vue";
export default {
  name: "Login",
  components: { SIdentify, CobwebParticles },
  data() {
    return {
      userName: "",
      passWord: "",
      idfCode: "",
      identifyCode: "",
      identifuCodes: "0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ", //绘制的随机数\
      withoutPwd: false,
      token: "",
    };
  },
  created() {
    this.refreshCode();
  },
  methods: {
    verifyName() {},

    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifuCodes, 4);
    },
    randomNum(min, max) {
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)];
      }
    },
    submit() {
      if (!this.userName) {
        this.$notify.error({
          title: "错误",
          message: "用户名不能为空",
        });
        return;
      } else if (!this.passWord) {
        this.$notify.error({
          title: "错误",
          message: "密码不能为空",
        });
        return;
      } else if (
        this.idfCode.toLowerCase() !== this.identifyCode.toLowerCase()
      ) {
        this.$notify.error({
          title: "错误",
          message: "验证码错误",
        });
        this.refreshCode();
        return;
      }
      // axios({
      //   method: "POST",
      //   url: "http://192.168.137.121:8083/login/login",
      //   data: {
      //     username: this.userName,
      //     password: this.passWord,
      //     token: this.token,
      //   },
      // }).then(
      //   (response) => {
      //     console.log(response.data.msg);
      //     localStorage.setItem("token", this.token);
      //     if (response.data.code === 200) {
      //       console.log(this.$router);
      //       this.$router.push("/home");
      //     } else {
      //       this.$notify.error({
      //         title: "错误",
      //         message: "账号或密码错误",
      //       });
      //     }
      //   },
      //   (error) => {
      //     alert(error.message);
      //   }
      // );
      this.$router.push("/home");
    },
    register() {
      this.$router.push("/register");
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
  width: 500px;
  height: 300px;
  box-sizing: border-box;
  padding: 15px 50px;
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
.submit,
.input-identify {
  margin-top: 15px;
}
.submit {
  width: 400px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-identify {
  width: 200px;
  margin-right: 80px;
}
.get-code {
  display: inline-block;
  vertical-align: middle;
}
.regout {
  position: relative;
  margin-top: 15px;
}
.regin {
  position: absolute;
  font-size: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #7a7b7e;
}
.register {
  color: black;
  text-decoration: underline;
  cursor: pointer;
}
</style>