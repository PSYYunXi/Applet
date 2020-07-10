Component({
  mixins: [],
  data: {
    week: ['日', '一', '二', '三', '四', '五', '六'],
    days: [],
    today: '2020-07-06',//当天，展示星星标记
    currentShow: '2020-07-06',//展示日期
    currentDate: '2020-07-06',//点击选中日期
    changeTap: false,
    startRange: '',
    timeRange: [],
    timeStart: '',
    timeEnd: '',
    selectDay:'',//type 为single时的日期
  },
  props: {
    onCancel: ()=>{},
    onSure: ()=>{},
    type: 'range',//两种类型 range选择范围，single选择单个日期
  },
  didMount() {
    let day = this.getDay();
    this.setData({
      today: day,
      currentDate: day
    });
    this.calendar(day);
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
     //获取今天
    getDay() {
      var today = new Date();
      var y = today.getFullYear();
      var m = today.getMonth();
      var d = today.getDate();
      //当月月份
      var todayMonth = today.getMonth() + 1;
      if (todayMonth < 10) {
        todayMonth = "0" + todayMonth;
      }
      var sendDay = y + "-" + todayMonth + '-' + d;
      return sendDay;
    },

    calendar(e) {
      let that = this;
      let today = new Date(e);
      let y = today.getFullYear();
      let m = today.getMonth();
      let d = today.getDate();
      //当月月份
      let todayMonth = today.getMonth() + 1;
      if (todayMonth < 10) {
        todayMonth = "0" + todayMonth;
      }
      //当月第一天是星期几
      let week = new Date(y, m, 1).getDay();
      //当月最后一天
      let lastDay = new Date(y, m + 1, 0).getDate();
      //渲染日历
      let days = [];
      for (let i = 0; i < week; i++) {
        let obj = {
          id: i,
          day: '',
          today: '',
          sign: false
        };
        days.push(obj);
      }
      let timeRange = this.data.timeRange;
      let timeLen = timeRange.length;
      for (let j = 0; j< lastDay; j++) {
        let k = j + 1;
        let idx = j + week;
        //渲染每天日期状态
        let theDay = y + "-" + todayMonth + '-' + k;
        let show = false;
        let starts = false;
        let ends = false;
        for (let m = 0;m < timeLen;m++){
          if(timeRange[m] == theDay){
            show = true;
            //渲染 起 和 止 标记
            if(m == 0){
              starts = true;
            }
            if(m == (timeLen - 1)){
              ends = true;
            }
          }
        }
        //渲染每天日期
        let cell = {
          id: idx,
          day: k,
          today: theDay,
          sign: show,
          start: starts,
          end: ends
        };
        days.push(cell);
      }
      let currentShow = y + "年" + todayMonth + "月";
      this.setData({
        days: days,
        currentDate: e,
        currentShow: currentShow
      });
    },

    //上个月
    past() {
      let today = new Date(this.data.currentDate);
      let y = today.getFullYear();
      //取出月份不加 1 ，就等于上个月实际月份
      let m = today.getMonth();
      let d = 1;
      //如果当前 m 等于 0 当月为一月份，变成上一年的12月
      if (m < 1) {
        y = y - 1;
        m = 12;
      }
      if (m < 10) {
        m = '0' + m;
      }
      let day = y + '-' + m + '-' + d;
      this.calendar(day);
    },

    //下个月
    future() {
      let today = new Date(this.data.currentDate);
      let y = today.getFullYear();
      //取出当前月
      let m = today.getMonth();
      let d = 1;
      //十二月份变成下一年的 1 月
      if (m > 10) {
        y = y + 1;
        m = 1;
      } else {
        m = m + 2;
      }
      if (m < 10) {
        m = '0' + m;
      }
      let day = y + '-' + m + '-' + d;
      this.calendar(day);
    },

     //上一年
    pastYear() {
      let today = new Date(this.data.currentDate);
      let y = today.getFullYear();
      // //取出月份不加 1 ，就等于上个月实际月份
      let m = today.getMonth();
      y = y - 1;
      m = m + 1;
      let d = 1;
      let day = y + '-' + m + '-' + d;
      this.calendar(day);
    },

    //下一年
    futureYear() {
      let today = new Date(this.data.currentDate);
      let y = today.getFullYear();
      // //取出当前月
      let m = today.getMonth();
      m = m + 1;
      y = y + 1;
      let d = 1;
      let day = y + '-' + m + '-' + d;
      this.calendar(day);
    },

    //选择日期范围，1选择日期
    getDates(datestr) {
      var temp = datestr.split("-");
      var m = parseInt(temp[1]) - 1;
      var date = new Date(temp[0], m, temp[2]);
      return date;
    },

    //选择日期范围，2生成日期范围内所有的日期列表
    datesList(s,e){
      let that = this;
      let arys = [];
      let start = s;
      let end = e;
      let startTime = that.getDates(start);
      let endTime = that.getDates(end);
      while ((endTime.getTime() - startTime.getTime()) >= 0) {
        let year = startTime.getFullYear();
        let monthA = startTime.getMonth() + 1;
        let month = monthA.toString().length == 1 ? "0" + monthA.toString() : monthA;
        let d = startTime.getDate();
        let ds = year + "-" + month + "-" + d;
        arys.push(ds)
        startTime.setDate(startTime.getDate() + 1);
      }
      return arys;
    },

    selectNone(e) {

    },

    //选择日期范围
    select(e) {
      console.log(e);
      if(this.props.type == 'single') {
        let day = e.currentTarget.dataset.today;
        this.setData({
          selectDay: day,
          timeRange: [day],
        });
        this.calendar(day);
      } else {
        let that = this;
        let day = e.currentTarget.dataset.today;
        let taps = this.data.changeTap;
        let startRange = this.data.startRange;
        //初始化 startRange，进入页面第一次点击触发
        if(startRange == ''){
          startRange = day;
        }
        let list = [];
        let paramR = day;
        let paramS = day;
        let paramE = day;
        let timeShowS = '';
        let timeShowE = '';
        if(taps && day){
          //截止时间动作,先比较两个时间
          let dateS = new Date(startRange);
          let dateE = new Date(day);
          if (dateS.getTime() == dateE.getTime()){
            list = [day];
          }else if (dateS.getTime() > dateE.getTime()) {
            list = that.datesList(day, startRange);
            paramE = startRange;
          } else if (dateS.getTime() < dateE.getTime()) {
            list = that.datesList(startRange, day);
            paramS = startRange;
          }
          timeShowS = paramS;
          timeShowE = paramE;
        }else if(!taps && day){
          //开始时间动作
          list = [day];
        }
        that.setData({
          changeTap: !taps,
          startRange: paramR,
          timeRange: list,
          timeStart: paramS,
          timeEnd: paramE,
          timeShowS: timeShowS,
          timeShowE: timeShowE
        });
        that.calendar(day);
      }

    },
    /** 点击取消*/
    onCancel() {

    },

    /** 点击确定*/
    onSure() {
      //两个都有值才是选择了一个时间范围
      if (this.props.type == 'range') {
        if (this.data.timeShowS &&
            this.data.timeShowE && 
            this.data.timeShowS.length > 0 && 
            this.data.timeShowE.length > 0) {
          console.log(this.data.timeShowS);
          console.log(this.data.timeShowE);
        } else {
          dd.alert({
            title: '提示',
            content: '请选择日期范围',
            buttonText: '我知道了'
          });
        }
      } else {
        if (this.data.selectDay && this.data.selectDay.length > 0) {
          console.log(this.data.selectDay);
        } else {
          dd.alert({
            title: '提示',
            content: '请选择日期',
            buttonText: '我知道了'
          });
        }
      }
    },
  },
});
