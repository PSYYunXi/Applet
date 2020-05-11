Page({
  data: {
    value:[1,1],
  },
  onLoad() {},

  onChange(e) {
    console.log(e.detail.value);
    this.setData({
      value:e.detail.value,
    });
  },
});
