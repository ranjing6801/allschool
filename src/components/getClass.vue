<template>
  <div id="getClass">
    <div :class="isPad?'box':'box1'">
      <ul class="bind">
        <li v-for="(item,index) in list"  :key="item.index" v-show="item.isOver">
          <div class="bind-div">
            <img class="vip" src="../../static/images/vip.png" />
            <div class="cont"><p class="p-top">{{item.class_name}} 已对应</p><p class="p-bot">{{item.className|tosix}}</p></div>
            <div class="cancle"><img src="../../static/images/ic.png" /><span @click="unbind(index)">取消对应</span></div>
          </div>
        </li>
      </ul>

      <ul class="unbind">
        <li v-for="(item,index) in list2" :key="item.index" v-show="!item.hadBind">
          <div class="unbind-div">
            <div @click="handleCheck($event,index)" class="left"></div>
            <img class="logo" :src="item.badgeId ? item.badgeId :logoSrc"/>
            <div class="right">
              <p class="p1">{{ item.title | teacherName }} </p>
              <p class="p2">
                <img src="../../static/images/p1.png" /><span class="num1">{{item.code}}</span>
                <img src="../../static/images/p2.png" /><span>{{item.teacherName|sliceValue}}</span>
                <img src="../../static/images/p3.png" /><span>{{item.membersCount}}人</span>
              </p>
            </div>
          </div>
        </li>
      </ul> 

    <!--  创建班级去认证 -->
      <div class="create">
        <div @click="handleCreateCheck($event)" class="left"></div>
        <div class="txt">创建新班级去认证</div>
      </div>
    </div>

    <!--  顶替弹窗 -->
    <div class="modalShow" v-if="isReCertificationShow">
        <div class="modal">
            <div id="ReCertification">
                <p class="content">{{ accountTile }}</p>
                <p class=" titleClass">{{ classTitle  | classFilter}}</p>
                <p class="saveTip"><span>已被</span><span class="name"> {{ classUser }} </span><span>老师认证过</span></p>
                <p class="replace">{{ accountReplace }}</p>
                <button class="Btn Btn-left" @click="giveUp">取消</button>
                <button class="Btn Btn-rigth" @click="Replace">顶替TA</button>
            </div>
        </div>
    </div>

    <button @click="bindBtn" :class="!ischeck||flag?'active':''" class="referClass" :disabled="ischeck">确认</button>

    <!-- 网络不好 -->
    <div v-show="offline" class="pop">
      网络不佳，请检查后重试
    </div>

  </div>
</template>
<script>

import $ from 'jquery'
import ReCertification from './ReCertification'
import logoSrc from '../../static/images/logo2.jpg'

export default {
    name:'getClass',
    components:{
        ReCertification
    },
    data(){
        return {
            logoSrc:logoSrc,
            getClassId:'',  // 接收从CLYchooseClass传过来的 整校班级id
            create:'',  // 选中  创建班级
            team:false,    //   
            isReCertificationShow:false,  // 重新认证 班级已经被人认证了  顶替弹窗
            accountTile:'重新认证该班级',
            classTitle:'',
            classUser:'' ,
            accountReplace:'您是否要顶替TA，成为该班级班主任',
            valueId:'',
            xhb_class_token:'',
            num: 3,
            txt: '',
            dis: false,
            isbind: true,
            ischeck: true,
            hasbind: null,
            index:'',
            list:[],
            list2:[],
            flag: null,
            cur: null,
            offline:false,
            isPad:false,
        }
    },
    computed:{
      classList() {
          return this.$store.getters.getRes1;
      },
      classList2() {
          return this.$store.getters.getRes2;
      }   
    },
    filters:{
      sliceValue(value){
         if(value.split(' ').join('').length > 4){
            return value.split(' ').join('').slice(0,2) + '...'+value.split(' ').join('').slice(-2,value.length);
         }return value
      },
      teacherName(value){
        if(value.split(' ').join('').length > 12){
            return value.split(' ').join('').slice(0,6) + '...'+value.split(' ').join('').slice(-6,value.length);
         }return value
      },
      tosix(value){
         if(value.split(' ').join('').length > 8){
            return value.split(' ').join('').slice(0,4) + '...'+value.split(' ').join('').slice(-4,value.length);
         }return value
      },
      classFilter(value){
         if(value.split(' ').join('').length > 10){
            return value.split(' ').join('').slice(0,5) + '...'+value.split(' ').join('').slice(-5,value.length);
         }return value
      }
    },
    methods:{
        change(){ // 单选框change事件
            if(this.team+1){
                this.dis = false;
                $(".referClass").addClass('active');
            }
        },
        ReCertificationShow(){  // 关闭被顶替的弹窗
            this.isReCertificationShow = false;
        },
        cancle(index){
          // alert("取消已经认证过的班级,重新认证");
          this.$store.state.res2[index].vip = false;
          this.$store.state.res1[index].symbol = false;  
          this.$store.state.res1[index].name = '的对应班级';
        },
        giveUp(){  // 取消
            // 弹窗隐藏
            this.isReCertificationShow = false;
        },
        Replace(){  // 顶替Ta
              console.log('this.idvalue=',this.idvalue);
              this.$store.state.res1[this.index].xhb_class_token = this.$store.state.res2[this.valueId].id;

              //绑定
              var oIndex = this.index;      // 记录整校班级 index
              var detail = this.txt;
              var num1 = this.num1;
              var obj = {index:oIndex,name:detail,sta:true,num1:num1};
              sessionStorage.setItem(oIndex,num1);            //保存当前对应的状态
              this.$store.commit('setClass',obj);               //更改store的数据

              this.$router.push({path:'/CLYchooseClass'});
        },
      handleCheck(e,i) {  //选择班级按钮
        var el = e.currentTarget;
        $('.left').removeClass('no-bor');
        $(el).addClass('no-bor');
        this.ischeck = false;
        this.team = false; 
        this.valueId = i;
        sessionStorage.setItem('valueId',i);
        console.log('this.valueId:',this.valueId);

        var p = $(el).parent().find('.p1').html();
        console.log('选择了:',p);
        console.log('res2[i].num1:',this.list2[i].code);
        this.num1 = this.list2[i].code;
        this.txt = p;
      },
      handleCreateCheck(e,string) {  //创建新班级按钮
        var el = e.currentTarget;
        $('.left').removeClass('no-bor');
        $(el).addClass('no-bor');
        this.ischeck = false;
        this.team = true;

      },
      unbind(i) {  //取消对应按钮
        console.log('解绑...');
        var str = sessionStorage.getItem(i);
        console.log('str:',str);
        var item = this.list2.find( (datum)=>datum.code==str );
        console.log('item:',item);
        var data = {index1:i,index2:item.index};

        this.$store.commit('unbindClass',data);

        // this.$set(data,list[data.index1].isOver,false);
        // this.$set(data,list2[data.index2].hadBind,false);
        // this.$set(data,list[data.index1].className,'的对应班级');

        // this.list[data.index1].isOver = false;
        // this.list2[data.index2].hadBind = false;
        // this.list[data.index1].className = '的对应班级';

      },
      bindBtn() {  //确认按钮
        var oIndex = this.index;      // 记录整校班级 index
        var detail = this.txt;
        var num1 = this.num1;
        if(this.team){  // 创建晓黑板班级去认证
            sessionStorage.setItem('create','yes');
            this.$router.push({path:'/createClass',query:{index:oIndex}});
        }
        else{ //  选择班级去认证

           this.xhb_class_token = this.$store.state.res2[this.valueId].id;

          //  console.log('this.xhb_class_token',this.xhb_class_token);
          //  console.log('this.$store.state.res2=',this.$store.state.res2);
          //  console.log('this.$store.state.res1=',this.$store.state.res1); 

           this.axios.post('/h5/index/isClassBind',{
                    xhb_class_token:this.xhb_class_token
                }) 
                .then(res => {
                    console.log('bind res:',res);
                    if(res.data.response){
                        this.$store.state.res1[oIndex].xhb_class_token = this.$store.state.res2[this.valueId].id;
                        var obj = {index:oIndex,name:detail,sta:true,num1:num1};
                        sessionStorage.setItem(oIndex,num1);            //保存当前对应的状态
                        this.$store.commit('setClass',obj);             //更改store的数据
                        this.$router.push({ path:'/CLYchooseClass',query:{index:this.index} }); //跳回去的时候保存这次的序号
                    }
                    // 该班级已经被其他老师绑定
                    if(res.data.error_response){
                        // alert('该班级已经被其他老师绑定');
                        this.isReCertificationShow = true;
                        this.classTitle = this.$store.state.res2[this.valueId].name;
                        this.classUser = res.data.error_response.teacher_name;
                      
                    }
                    
                    
                })
                .catch(err => {
                  console.log('err=',err);
                  this.offline = true;
                clearTimeout(timer);
                var _this = this;
                var timer=null;
                timer = setTimeout(function(){
                  _this.offline = false;
                },2000);
                })
              
        }
      }
    },
    created() {
        if(!this.$store.state.res1.length){
          this.list = JSON.parse(localStorage.getItem('res1'));
        }else{
          this.list = this.$store.state.res1;
        }
        if(!this.$store.state.res2.length){
          this.list2 = JSON.parse(localStorage.getItem('res2'));
        }else{
          this.list2 = this.$store.state.res2;
        }
        //this.list = this.$store.state.res1 ||  JSON.parse(localStorage.getItem('res1')); //获取数据
        //this.list2 = this.$store.state.res2 || JSON.parse(localStorage.getItem('res2')); //获取数据

        this.index = this.$route.query.index;
        
        this.$route.query.flag ? this.flag=true : this.flag=false;
                    
        if(this.flag){
          var str = this.$route.query.txt;
          var item = this.list2.find( (datum)=>datum.code==str );
          var obj = {index1: this.index,index2: item.index};
          this.$store.commit('resetClass',obj);//先解绑
        }

        //判断ipad
        console.log('screen:',screen.width);
        if(screen.width>640){
          this.isPad = true;
        }else{
          this.isPad = false;
        }
    },
    mounted() {
        document.title = '选择班级';
        var oindex = this.index;
        var num1 = this.$route.query.txt;
        var word = this.$route.query.word;

        if(this.$route.query.flag=='yes'){ // 找到上次绑定班级的默认选项
          console.log('修改上次已经绑定过的班级');
          var l = $('.num1').length;
          var temp = 0;
          for(var i=0;i<l;i++){
            if($('.num1').eq(i).html()==num1){
              temp=i;
            }
          }
          $('.num1').eq(temp).parent().parent().prev().prev().addClass('no-bor');
          this.txt = word;
          this.num1 = num1;
          this.ischeck = false;
          this.valueId = '' || sessionStorage.getItem('valueId');
        }
    } 
  
}

</script>

<style scoped>
/* new css 2018 4-20 */

.box {
  height: 9.5333rem;
  margin-bottom: 1rem;
  overflow-y: scroll;
}
.box1 {
  height: 13.5333rem;
  margin-bottom: 1rem;
  overflow-y: scroll;
}
.bind {
    width: 9.2rem;
    margin: 0 auto 0.5333rem;
}

.bind li {
  width: 9.2rem;
  height: 1.8667rem;
  background: #363636;
  border-radius: 0.0533rem;
  /* margin-left: 0.4rem; */
  margin-top: 0.5333rem;
  position: relative;
}

.bind-div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.vip{
  width: 0.64rem;
  margin-left: 0.4rem;
  margin-right: 0.2667rem;
}

.cont {
  width: 5.3333rem;
}

.p-top {
  color: #888;
  width: 3.4rem;
  font-size: 0.3733rem;
  margin-bottom: 0.2667rem;
  font-family: PingFangSC-Regular;
}

.p-bot {
  color: #fff;
  font-size: 0.4533rem;
  font-family: PingFangSC-Regular;
}

.cancle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.16rem;
  height: 0.64rem;
  margin-right: 0.4rem;
  border: 1px solid #aaa;
  border-radius: 2.6667rem;
}

.cancle img {
  width: 0.3rem;
  margin-right: 0.1067rem;
}

.cancle span {
  color: #AAA;
  font-size: 0.32rem;
  font-family: PingFangSC-Regular;
}

.unbind {
  width: 9.2rem;
  margin: 0.5333rem auto;
}

.unbind li {
  width: 9.2rem;
  height: 1.8667rem;
  background: #363636;
  margin-bottom: 0.5333rem;
  border-radius: 0.0533rem;
  position: relative;
}

.unbind-div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.left {
  width: 0.64rem;
  height: 0.64rem;
  border-radius: 50%;
  border: 1px solid #fff;
  margin-left: 0.4rem;
  margin-right: 0.2667rem;
}

.left img {
  display: block;
  width: 100%;
  height: 100%;
}

.logo{
  width: 1.3333rem;
  height: 1.3333rem;
  margin-right: 0.2667rem;
  border-radius: 0.28rem;
}

.p1 {
  color: #fff;
  width: 5.84rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.4533rem;
  margin-bottom: 0.2667rem;
  font-family: PingFangSC-Regular;
}

.p2 img {
  width: 0.2667rem;
  margin-right: 0.1067rem;
}

.p2 span {
  color: #888;
  font-size: 0.3733rem;
  margin-right: 0.4rem;
  font-family: PingFangSC-Light;
}

.create {
  width: 9.2rem;
  height: 1.8667rem;
  display: flex;
  align-items: center;
  background: #363636;
  /* margin-left: 0.4rem; */
  /* margin-top: 0.5333rem; */
  border-radius: 0.0533rem;
  margin: 0 auto 1rem;

}

.txt {
  color: #fff;
  font-size: 0.4533rem;
  margin-left: 0.14rem;
  font-family: PingFangSC-Regular;
}

.referClass {
  width: 9.2rem;
  height: 1.28rem;
  /* margin-left: 0.4rem;
  margin-bottom: 0.8rem;
  margin-top: 2rem; */
  border-radius: 0.0533rem;
  background: #AAAAAA;
  font-size: 0.4533rem;
  color: #000000;
  border: none;
  display: block;
  margin: 0 auto 0.4rem;
  font-family: PingFangSC-Regular;
}

.active {
  background: #F8E71C;
}

.no-bor {
  border: 1px solid transparent;
  background:url('../../static/images/radio.png') no-repeat center;
  background-size: cover;
}
/* new css end */



/* 顶替弹窗样式*/

#getClass .modalShow {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

#getClass .modalShow .modal {
  width: 8.9333rem;
  height: 6.16rem;
  margin-left: 0.5333rem;
  margin-right:0.5333rem;
  background: #2B2B2B;
  border: 0.0533rem solid #BBAB71;
  border-radius: 0.2667rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}



#ReCertification {
    width: 8.9333rem;
    height: 6.16rem;
}


#ReCertification .content {
  font-family: PingFangSC-Light;
  font-size: 0.5333rem;
  color: #FFFFFF;
  line-height: 0.5333rem;
  text-align: center;
  margin-top: 0.5333rem;
}
#ReCertification .titleClass {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.6933rem;
  text-align: center;
  margin-top:0.5333rem;
}


#ReCertification .saveTip {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.6933rem;
  text-align: center;
}

#ReCertification .saveTip  .name {
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color:#fff;
  line-height: 0.6933rem;
}

#ReCertification .replace {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.6933rem;
  text-align: center;
}
/**/
#ReCertification .Btn {
    width: 4.0rem;
    height: 1.28rem;
    background: #2B2B2B;
    font-family: PingFangSC-Regular;
    font-size: 0.4533rem;
    color: #F8E71C;
    line-height: 0.4533rem;
    border-radius: 0.0533rem;
    border: none;
    margin-top:0.6667rem;
}

#ReCertification .Btn-left{
   margin-left: 0.4rem;
}
#ReCertification .Btn-rigth{
  
  background:#F8E71C;
  color: #000000;
  margin-right: 0.4rem;
}

.pop{
  width: 6.0533rem;
  height: 0.9867rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  text-align: center;
  line-height: 0.9867rem;
}

</style>

