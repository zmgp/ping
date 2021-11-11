import VueRouter from "vue-router"


import Login from '../views/login/Login'
import ForgotPwd from '../views/forgotpwd/ForgotPwd'
import EmailCheck from '../views/forgotpwd/EmailCheck'
import PwdReset from '../views/forgotpwd/PwdReset'
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
            children:[
                {
                    path:'emailcheck',
                    name:'emailcheck',
                    component:EmailCheck,
                    meta:{title:'忘记密码-邮箱验证'},
                },
                {
                    path:'pwdreset',
                    name:'pwdreset',
                    component:PwdReset,
                    meta:{title:'忘记密码-密码重置'},
                    // props($route){
                    //             return {email:$route.params.email,title:$route.params.code}
                    //         }
                    // 独享路由守卫，只有前置
                    // beforeEnter: (to, from, next) => {
                    //     if(localStorage.getItem('username') === 'SHU'){
                    //         next();
                    //     }else{
                    //         alert('无权限访问')
                    //     }
                    // }
                }
            ]

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
        if(localStorage.getItem('token')!==null){
            next();
        }
        else{
            alert('请先登录');
        }
    }else{
        next();
    }

})

router.afterEach((to,from)=>{
    // console.log('后置路由守卫',to,from);
    document.title = to.meta.title || '后台管理系统'
})
export default router