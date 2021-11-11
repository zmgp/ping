<template>
  <div>
    <h2>这是主页233</h2>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      token: "1",
    };
  },
  created() {
    console.log("******");
    console.log(localStorage.getItem("token"));
    const that = this;
    this.$axios({
      method: "GET",
      url: "http://192.168.137.1:8083/login1/auth2",
      header: {
        token: localStorage.getItem("token"),
      },
    }).then(
      (response) => {
        console.log(response);

        if (response.data.code === 200) {
          console.log("666");
        } else if (response.data.code === 20001) {
          // localStorage.removeItem("token");
          that.$router.push("/");
        } else {
          alert("无权限访问");
        }
      },
      (error) => {
        alert(error.message);
      }
    );
    //     axios({
    //     method: "POST",
    //     url: "http://192.168.137.121:8083/login/login",
    //     header: {
    //       token: localStorage.getItem('token'),
    //     },
    //   }).then(
    //     (response) => {
    //       // console.log(response.data);
    // if(true){
    //     this.$router.push("/");
    // }else{
    //     alert('无权限访问')
    // }
    // },
    //     (error) => {
    //       alert(error.message);
    //     }
    //   );
    // this.$router.push("/");
  },
};
</script>

<style>
</style>