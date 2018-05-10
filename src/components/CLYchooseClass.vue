<template>
  <div id="clychooseClass">
        <p class="leadTitle">您是{{ num }}个班级班主任, 请选择:</p>
        <ul>
            <li v-for="(item,index) in classList" :key="index" class="classList" @click="getMore(item,index)">
               <span class="className"> {{ item.class_name }}</span> 
               <img v-show="item.isOver" class="vip"  src="../../static/images/vip.png" />
               <span class="classTeam"> {{ item.className | teacherName }}</span>   
               <img v-show="item.isOver" class="over"  src='../../static/images/over.png'>
               <img src="../../static/images/more.png" class="more" />
            </li>
        </ul>
      <button :class="!dis?'referBtn':''" @click="referBtn"  class="referName" :disabled="dis">认证班级</button>
      <!-- 网络不好 -->
      <div v-show="offline" class="pop">
        网络不佳，请检查后重试
      </div>
  </div>
</template>

<script>
export default {
    name:'clychooseClass',
    data(){
        return {
            num:'',       
            teamName:'',         // 认证班级的名称
            havenListShow:false, // 展示已经认证好的班级,
            id:1,                // 接收从userName 组件传过来的userId
            CLYTogetClassId:'',  // 接收从getClass 传过来的认证好了的班级id
            classListShow:true,
            arr:[],
            bindClass:{
              class_id:'',
              xhb_class_token:''
            },
            dis: true,
            classList: [],
            index:'',
            detail:'',
            cur: null,
            offline:false,
        }
    },
    filters:{
      teacherName(value){
        if(value.split(' ').join('').length > 5){
            return value.split(' ').join('').slice(0,2) + '...'+value.split(' ').join('').slice(-3,value.length);
         }return value
      }
    },
    methods:{
        getMore(o,i) { //跳转到对应班级绑定页面
          if(this.classList[i].isOver==true){ //判断是否点击了已经绑定过的班级
            var txt = sessionStorage.getItem(i); //晓黑板的班级号
            var word = o.className; //晓黑板的name
            this.$router.push({ path:'/getClass',query:{index:i,txt:txt,flag:'yes',word:word}});
          }
          else{
            this.$router.push({ path:'/getClass',query:{index:i}}); //点击的时候带上对应的下标
          }
        },
        referBtn() {
          console.log('认证...');
          for(var i = 0; i<this.$store.state.res1.length; i++){
                var obj = {class_id:'',xhb_class_token:''};
                var str = sessionStorage.getItem(i);
                var item = this.$store.state.res2.find( (datum)=>datum.code==str );
                //console.log('item:',item.id);
                obj.class_id = this.$store.state.res1[i].class_id;
                obj.xhb_class_token = item.id;
                //this.bindClass.class_id = this.$store.state.res1[i].class_id;
                //this.bindClass.xhb_class_token = item.id;
                console.log('obj:',obj);
                this.arr.push(obj);
              }

                //暂时先不认证
                console.log('this.arr:',this.arr);

                var pullArr = [] || sessionStorage.getItem('need_pull_class');
                console.log('pullArr:',pullArr);
                this.axios.post('/h5/index/bindInfo',{ 
                  bind_class : JSON.stringify(this.arr),
                  teacher_id : sessionStorage.getItem('teacher_id'),
                  phone : sessionStorage.getItem('phone'),
                  user_token : sessionStorage.getItem('user_token'),
                  need_pull_class : JSON.stringify(pullArr),
                  is_class_director : sessionStorage.getItem('is_class_director'),
                  is_regular : sessionStorage.getItem('is_regular'),
                  is_has_school_class : sessionStorage.getItem('is_has_school_class'),
                  is_has_xhb_class : sessionStorage.getItem('is_has_xhb_class')
                })
                .then(res => {
                  console.log('bindClass:',res);
                  if(res.data.response){
                      this.$router.push({path:'/PassOk'});
                  }
                  if(res.data.error_response){
                      console.log(res.data.error_response.msg);
                  }
                })
                .catch(err => {
                  console.log('err:',err);
                  this.offline = true;
                  clearTimeout(timer);
                  var _this = this;
                  var timer=null;
                  timer = setTimeout(function(){
                    _this.offline = false;
                  },2000);
                })
        }
    },
    created() {
      this.classList = JSON.parse(localStorage.getItem('res1'));
        // if(!this.$store.state.res1.length){
        //   this.classList = JSON.parse(localStorage.getItem('res1'));
        // }else{
        //   this.classList = this.$store.state.res1;
        // }
        this.num = this.$store.state.res1.length ||JSON.parse(localStorage.getItem('res1')).length;
        var result;
        if(this.classList.length){
          result = this.classList.every(function(el){
              if(el.isOver){
                return true;
              }  
          });
        }else{
          this.dis = true;
        }
        if(result){
          this.dis = false;
        }
    },
    mounted(){
        document.title = "认证班级";
    }
}
</script>

<style scoped>

.havenList {
  width: 9.2rem;
  height: 1.8667rem;
  background: #363636;
  border-radius: 0.0533rem;
  line-height: 1.8667rem;
  margin-top: 0.5333rem;
  margin-left: 0.4rem;
  position: relative;
}

.vip {
  display: inline-block;
  width:0.64rem;
  height: 0.64rem;
}

.over {
  width: 1.3067rem;
  right: 0.8107rem;
  top:0.4rem;
  position: absolute;
}

.leadTitle {
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #888888;
  line-height: 0.3733rem;
  margin-top: 0.5333rem;
  margin-left: 0.5333rem;
}

.classList {
  width: 9.2rem;
  height: 1.8667rem;
  background: #363636;
  border-radius: 0.0533rem;
  line-height: 1.8667rem;
  margin-top: 0.5333rem;
  margin-left: 0.4rem;
  position: relative;
  display:flex;
  align-items: center;
}

.className {
  margin-left: 0.4rem;
  margin-right: 0.2667rem;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.4533rem;
}

.classTeam{
  color: #AAAAAA;
  width: 2.8rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.4533rem;
  line-height: 0.4533rem;
  margin-left: 0.2133rem;
  font-family: PingFangSC-Light;
}

.more {
  position: absolute;
  top: 0.7467rem;
  left: 8.5867rem;
  width: 0.2133rem;
  height: 0.3733rem;
  display: inline-block;
}

.referName {
  width: 9.2rem;
  height: 1.28rem;
  margin-left: 0.4rem;
  position: fixed;
  bottom: 0.8rem;
  border-radius: 0.0533rem;
  border: none;
  background: #AAAAAA;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #000000;
  line-height: 0.4533rem;
}

.referBtn{
  background: #F8E71C;
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


