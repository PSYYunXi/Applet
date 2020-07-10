Component({
  mixins: [],
  data: {},
  props: {
    isIphoneXSeries: false, //是否是iphoneX系列
    title: '', //标题
    onCancel: ()=>{}, //取消按钮
    onSure: ()=>{}, //确定按钮
    options: [],
  },
  didMount() {
    this.currentIndex = 0;
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    /** pick滚动回调*/
    onChangePicker(res) {
      let value = res.detail.value[0];
      this.currentIndex = value;
    },

    /** 点击取消*/
    onCancel() {
      this.props.onCancel();
    },

    /** 点击确定*/
    onSure() {
      // this.props.onSure(this.currentIndex);
      this.props.onSure(this.props.options[this.currentIndex].option_name);
    }
  },
});
