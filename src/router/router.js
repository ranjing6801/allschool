import Vue from 'vue'
import VueRouter from 'vue-router'

import Menu from '../components/Menu'
import VolidateCode from '../components/VolidateCode'
import overCount from '../components/overCount'
import userName from '../components/userName'
import AuthenticationOk from '../components/AuthenticationOk'
import NewAuthenticationOk from '../components/NewAuthenticationOk'  
import CLNewTeacher from '../components/CLNewTeacher'
import PassOk from '../components/PassOk'
import ErrorPage from '../components/ErrorPage'
import CLYchooseClass from '../components/CLYchooseClass'
import getClass from '../components/getClass'   
import AttestationComple from '../components/AttestationComple'   
import CreateClass from '../components/CreateClass' 


Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:Menu 
        },
        {  // 输入手机号
            path:'/menu/:tcode',
            name:'menu',
            component:Menu
        },
        {  // 验证码
            path:'/VolidateCode',
            name:'VolidateCode',
            component:VolidateCode
        },
        {  // 用户名
            path:'/userName',
            name:'userName',
            component:userName
        },
        {  // 验证码超过次数  
            path:'/overCount',
            name:'overCount',
            component:overCount
        },
        {// 反馈成功
            path:'/AuthenticationOk',  
            name:'AuthenticationOk',
            component:AuthenticationOk
        },
        { // 认证成功 有账号密码弹窗
            path:'/NewAuthenticationOk',
            name:'NewAuthenticationOk',
            component:NewAuthenticationOk
        },
        { // 班主任 没有班级 
            path:'/CLNewTeacher',
            name:'CLNewTeacher',
            component:CLNewTeacher     
        },
        { // 班主任 有班级 选择认证班级 组件   
            path:'/CLYchooseClass',
            name:'CLYchooseClass',
            component:CLYchooseClass
        },
        { // 班主任 有班级 选择认证班级 => 选择一个班级或中队   
            path:'/getClass',
            name:'getClass',
            component:getClass
        },
        { // 班主任 有班级 选择认证班级 => 认证完成   
            path:'/AttestationComple',
            name:'AttestationComple',
            component:AttestationComple
        },
        { // 班主任 有班级 选择认证班级 => 认证完成  认证完成后再继续创建班级   
            path:'/CreateClass',
            name:'CreateClass',
            component:CreateClass
        },
        { // 认证成功    
            path:'/PassOk',
            name:'PassOk',
            component:PassOk
        },
        {
            path:'/error',
            component:ErrorPage
        }
    ]
})

export default router