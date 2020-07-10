Component({
  mixins: [],
  data: {},
  props: {
    onCancel: ()=>{},
    onSure: ()=>{}
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    
    onCancel() {
      this.props.onCancel();
    },

    onSure() {
      this.props.onSure();
    }
  },
});
