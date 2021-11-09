import VueRouter from "vue-router"

import Login from '../views/login/Login'
import ForgotPwd from '../views/login/ForgotPwd'
import Register from '../views/login/Register'
import Home from '../views/Home'


const router = new VueRouter({
    routes:[
        {
            path:'/',
            name:'登录',
            component:Login,
            meta:{title:'登录'},

        },
        {
            path:'/forgotpwd',
            name:'找回密码',
            component:ForgotPwd,
            meta:{title:'找回密码'},

        },
        {
            path:'/register',
            name:'注册',
            component:Register,
            meta:{title:'注册'},
        },
        {
            path:'/home',
            name:'主页',
            component:Home,
            meta:{isAuth:true,title:'主页'},
        },
    ]
})
router.beforeEach((to,from,next)=>{
    // console.log('前置路由守卫',to,from);
    if(to.meta.isAuth){
    //     axios({
    //     method: "POST",
    //     url: "http://192.168.137.121:8083/login/login",
    //     header: {
    //       token: localStorage.getItem('token'),
    //     },
    //   }).then(
    //     (response) => {
          // console.log(response.data);
            if(true){
                next();
            }else{
                alert('无权限访问')
            }
    //     },
    //     (error) => {
    //       alert(error.message);
    //     }
    //   );

    }else{
        next()
    }

})

router.afterEach((to,from)=>{
    // console.log('后置路由守卫',to,from);
    document.title = to.meta.title || '后台管理系统'
})
export default router