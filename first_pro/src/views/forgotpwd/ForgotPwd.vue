<template>
  <div>
    <div class="container">
      <p class="title">找回密码</p>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CobwebParticles from "../animation/CobwebParticles.vue";
export default {
  name: "ForgotPwd",
  components: { CobwebParticles },

  created() {
    this.$router.replace("/forgotpwd/emailcheck").catch(() => {});
  },
};
</script>

<style scoped>
* {
  margin: 0 auto;
  padding: 0;
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
  margin: 10px 0px 15px;
  text-align: center;
  font-weight: bold;
  color: #7a7b7e;
}
</style>