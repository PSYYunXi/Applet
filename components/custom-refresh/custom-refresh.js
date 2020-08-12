const State = { //下拉刷新状态
  init: 'none',
  pulling: 'pulling',
  enough: 'pulling enough',
  refreshing: 'refreshing',
  success: 'success',
  failure: 'failure',
  reset: 'reset',
}

const LoadState = { //上拉加载状态
  normal: 'normal', //能正常上拉加载
  nomore: 'nomore' //暂无更多
}

/**
 * 自定义下拉刷新 配合scrollview使用
 */

Component({
  mixins: [],
  data: { 
    enable:true
  },
  props: {
    pullState: State.init,  
    pullDownHeight: 0, //下拉距离
    scrollTop: 0,
    pullDirection: '',//下拉刷新
    pullUpHeight: 0,  

    
    onRefresh: (res)=>{},
    onLoadMore: (res)=>{},

    loadState: LoadState.normal, //上拉加载状态
    show:false, //控制显示下拉加载状态
    loadMore: false, //是否需要上拉加载
    
  },
  didMount() {
    this.data.pullDirection = '';
    var endState = {
      pullState: State.reset,
      pullDownHeight: 0,
      pullUpHeight: 0,
    };
    this.setData(endState)
  },
  didUpdate() {},
  didUnmount() {},
  methods: {

    initState() {
      this.data.pullState = State.init;

    },

    onScroll(e) {
      if (e.detail.scrollTop <0) {
        this.setData({
          enable:false
        });
        var that = this;
        let promise = new Promise((resolve,reject)=>{
          let timer = setTimeout(() => {
            that.setData({
              enable: true
            });
            resolve(timer);
          }, 50);
        });
        promise.then((timer)=>{
          clearTimeout(timer);
        });
      }
      this.props.scrollTop = e.detail.scrollTop;
    },

    onTouchStart(e) {
      if (!this.canRefresh()) return;
      if (e.touches.length == 1){
        this.firstTouch = {
          clientY: e.touches[0].clientY,
          scrollTop: this.props.scrollTop
        };
      }
    },

    onTouchMove(e) {
      if (!this.canRefresh()) return;
      
      var distance = this.calculateDistance(e.touches[0]);
      if (distance > 0) {//下拉
        if (this.props.scrollTop<=0) {
          var pullDistance = distance - this.firstTouch.scrollTop;
          var pullHeight =  this.easing(pullDistance);
          this.setData({
            pullState: pullHeight >= 55 ? State.enough : State.pulling,
            pullDownHeight: pullHeight >= 60 ? 60 : pullHeight,
          });
        } 
        this.data.pullDirection = 'pullDown';
      } else {//上拉
        this.data.pullDirection = 'pullUp';
      }
    },

    onTouchEnd(e) {
      if (!this.canRefresh()) return;
      if (this.data.pullState == State.enough) {
        if (this.data.pullDirection == 'pullDown') {
          this.setData({
            pullState: State.refreshing,
          });
          this.onRefresh();
        } else {

        }
      } else {
        this.data.pullDirection = '';
        var endState = {
          pullState: State.reset,
          pullDownHeight: 0,
          pullUpHeight: 0,
        };
        this.setData(endState)
      }
    },

    easing(distance) {
      return distance / 2.0;
      // t: current time, b: begInnIng value, c: change In value, d: duration
      // var t = distance;
      // var b = 0;
      // var d = 170; // 允许拖拽的最大距离
      // var c = d / 1.2; // 提示标签最大有效拖拽距离
      // return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },

    canRefresh() {
      if (this.data.pullState == State.refreshing || this.data.pullState == State.success || this.data.pullState == State.failure) {
        return false;
      }
      return true;
    },
    
    calculateDistance(touch) {
      return touch.clientY - this.firstTouch.clientY;
    },

    onRefresh() {
      this.setData({
        loadState: LoadState.normal
      });
      this.props.onRefresh(this);
    },

    pullDownFinished(res) {
      if (this.data.pullState != State.refreshing) {
        return;
      }
      if (res == 'success' || res == 'failure') {
        var that = this;
        this.setData({
          pullState: res,
        });
        var promise = new Promise((resolve,reject)=>{
          let timer = setTimeout(function(){
            that.setData({
              pullState:State.reset,
              pullDownHeight:0,
            });
            resolve(timer);
          },500);
        });
        promise.then((timer)=>{
          clearTimeout(timer);
        });
      } else {
        this.setData({
            pullState:State.reset,
        });
      }
    },

    onLoadMore(res) {
      if (this.data.show) {
        return;
      }
      if (this.data.loadState == LoadState.nomore) {
        this.setData({
          show:true,
        });
        var that = this;
        var promise = new Promise((resolve,reject)=>{
          let timer = setTimeout(function(){
            that.setData({
              show: false
            });
            resolve(timer);
          },1000);
        });
        promise.then((timer)=>{
          clearTimeout(timer);
        });
      } else {
        this.setData({
          show:true,
        });
        this.props.onLoadMore(this);
      }
    },
    
    /** 这里的state传值只可能是norml或者是nomre两种，在调用的时候需要注意*/
    loadMoreFinished(state) {
      if (state == 'normal') {
        this.setData({
          show:false,
          loadState: 'normal'
        });
      } else {
        this.setData({
          show:false,
          loadState: 'nomore'
        });
      }
    },

    onNone() {

    }
  },
});
