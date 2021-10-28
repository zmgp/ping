<template>
  <div>
    <h2>1233</h2>
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