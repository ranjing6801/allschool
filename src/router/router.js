import Vue from 'vue'
import VueRouter from 'vue-router'

import Menu from '../components/Menu'
import VolidateCode from '../components/VolidateCode'
import overCount from '../components/overCount'
import overCountTen from '../components/overCountTen'
import overCountUser from '../components/overCountUser'
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
    mode:'hash',
    routes:[
        {
            path:'/',
            component:Menu,
            meta: {
                title: '输入手机号'
              } 
        },
        {  // 输入手机号
            path:'/menu/:tcode',
            name:'menu',
            component:Menu,
            meta: {
                title: '输入手机号'
              }
        },
        {  // 验证码
            path:'/VolidateCode',
            name:'VolidateCode',
            component:VolidateCode,
            meta: {
                title: '输入验证码'
              }
        },
        {  // 用户名
            path:'/userName',
            name:'userName',
            component:userName,
            meta: {
                title: '填写姓名'
              }
        },
        {  // 验证码超过次数  
            path:'/overCount',
            name:'overCount',
            component:overCount,
            meta: {
                title: '反馈信息'
              }
        },
        {  // 超过10次  
            path:'/overCountTen',
            name:'overCountTen',
            component:overCountTen,
            meta: {
                title: '反馈信息'
              }
        },
        {  // 用户名不存在  
            path:'/overCountUser',
            name:'overCountUser',
            component:overCountUser,
            meta: {
                title: '反馈信息'
              }
        },
        {// 反馈成功
            path:'/AuthenticationOk',  
            name:'AuthenticationOk',
            component:AuthenticationOk,
            meta: {
                title: '反馈成功'
              }
        },
        { // 认证成功 有账号密码弹窗
            path:'/NewAuthenticationOk',
            name:'NewAuthenticationOk',
            component:NewAuthenticationOk,
            meta: {
                title: '认证成功'
              }
        },
        { // 班主任 没有班级 
            path:'/CLNewTeacher',
            name:'CLNewTeacher',
            component:CLNewTeacher,
            meta: {
                title: '创建班级并认证'
              }     
        },
        { // 班主任 有班级 选择认证班级 组件   
            path:'/CLYchooseClass',
            name:'CLYchooseClass',
            component:CLYchooseClass,
            meta: {
                title: '认证班级'
              } 
        },
        { // 班主任 有班级 选择认证班级 => 选择一个班级或中队   
            path:'/getClass',
            name:'getClass',
            component:getClass,
            meta: {
                title: '选择班级'
              } 
        },
        { // 班主任 有班级 选择认证班级 => 认证完成   
            path:'/AttestationComple',
            name:'AttestationComple',
            component:AttestationComple
        },
        { // 班主任 有班级 选择认证班级 => 认证完成  认证完成后再继续创建班级   
            path:'/CreateClass',
            name:'CreateClass',
            component:CreateClass,   
            meta: {
                title: '创建班级'
              } 
        },
        { // 认证成功    
            path:'/PassOk',
            name:'PassOk',
            component:PassOk,
            meta: {
                title: '认证成功' 
              } 
        },
        {
            path:'/error',
            component:ErrorPage,
            meta: {
                title: '请重新扫描二维码2' 
              }  
        }
    ]
})

export default router