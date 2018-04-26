import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export const store = new Vuex.Store({
  state:{
      res1:[],
      res2:[],      
      zxClass:[            // 整校班级
        {className:"一年级1班",class_id:0,symbol:'',name:'的对应班级',teamId:''},
        {className:"一年级2班",class_id:1,symbol:'',name:'的对应班级',teamId:''},
        {className:"一年级3班",class_id:2,symbol:'',name:'的对应班级',teamId:''}
      ],
    	xhbClass:[        // 晓黑板班级
            {
              teamName:'阳光中队',  // 班级名称
              banjiNumber:'123654',   // 班级号
              banjichuangjianzhe:'王姐姐',  //  班级创建者 如果不知道真实姓名下展示小黑板账号
              Members:32,  // 班级中的人数
              pid:0 ,
              isbgShow:'',
              teamShow:'1'
            },
            { 
              teamName:'1年级2班数学组',
              banjiNumber:'666666',
              banjichuangjianzhe:'张老师',
              Members:50,
              pid:1,
              isbgShow:'',
              teamShow:'2'
            },
            { 
              teamName:'小花班',
              banjiNumber:'888888',
              banjichuangjianzhe:'刘老师',
              Members:60,
              pid:2,
              isbgShow:'',
              teamShow:'3'
            }
        ],
      classList: [
            {name:'一年级1班',className:'的对应班级',isOver:false,title:'超人1号',num1:12305,person:'王静怡1',num2: '32人',index:0},
            {name:'一年级2班',className:'的对应班级',isOver:false,title:'超人2号',num1:12306,person:'王静怡2',num2: '28人',index:1},
            {name:'一年级3班',className:'的对应班级',isOver:false,title:'超人3号',num1:12307,person:'王静怡3',num2: '27人',index:2}
        ],
      classList2: [
            {name:'一年级1班',className:'的对应班级',isOver:false,hadBind:false,title:'超人1号',code:12305,teacherName:'王静怡1',membersCount: '32人',index:0},
            {name:'一年级2班',className:'的对应班级',isOver:false,hadBind:false,title:'超人2号',code:12306,teacherName:'王静怡2',membersCount: '28人',index:1},
            {name:'一年级3班',className:'的对应班级',isOver:false,hadBind:false,title:'超人3号',code:12307,teacherName:'王静怡3',membersCount: '27人',index:2}
        ],
    },
    getters:{
      getRes1 (state, getters) {
        return state.res1;
      },
      getRes2 (state, getters) {
        return state.res2;
      },
    },
    mutations:{
      setClass(state,opt) {
        state.res1[opt.index].isOver = opt.sta;
        state.res1[opt.index].className = opt.name;
        var myindex = state.res2.find( (datum)=>datum.code==opt.num1 );
        console.log('myindex',myindex);
        state.res2[myindex.index].hadBind = true;
      },
      resetClass(state,opt) {
        state.res1[opt.index1].isOver = false;
        state.res2[opt.index2].hadBind = false;
        state.res1[opt.index1].className = '的对应班级';
      },
      unbindClass(state,opt) {
        state.res1[opt.index1].isOver = false;
        state.res2[opt.index2].hadBind = false;
        state.res1[opt.index1].className = '的对应班级';
      }
    },
    actions:{
      unbindClass2({commit},opt){
        let index1 = opt.index1;
        let index2 = opt.index2; 
        commit('unbindClass',{index1,index2});
      }
    }
})