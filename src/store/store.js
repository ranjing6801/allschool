import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export const store = new Vuex.Store({
  state:{
      saveId:[] ,       // 保存整校班级id
      selectData:[],    // 初始值和options一样 当已经有可以取消的对应班级的时候,保存剩下的还没有认证的班级
      items:[],         // 可以取消认证的班级
      havenClass:[],    // 已经认证过的班级
      xhbClass:[            // 整校班级
        {name:"一年级1班",classId:0,symbol:'',className:'的对应班级',teamId:''},
        {name:"一年级2班",classId:1,symbol:'',className:'的对应班级',teamId:''},
        {name:"一年级3班",classId:2,symbol:'',className:'的对应班级',teamId:''}
      ],
    	res2:[        // 晓黑板班级
            {
              teamName:'阳光中队',  // 班级名称
              banjiNumber:'123654',   // 班级号
              banjichuangjianzhe:'王姐姐',   //  班级创建者 如果不知道真实姓名下展示小黑板账号
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
          ]
    },
    getters:{

    },
    mutations:{

    },
    actions:{

    }
})