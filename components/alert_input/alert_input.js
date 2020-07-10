Component({
  mixins: [],
  data: {},
  props: {
    title: '',
    onCancel: ()=>{},
    onSave: (res)=>{}
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    /** 点击取消*/
    onCancel() {
      this.props.onCancel();
    },

    /** 点击保存*/
    onSave(res) {
      let value = res.detail.value.textarea;
      if (value.length == 0) {
        dd.alert({
          title: '提示',
          content: '内容不能为空',
          buttonText: '确定'
        });
      } else {
        this.props.onSave(value);
      }
    }
  },
});
