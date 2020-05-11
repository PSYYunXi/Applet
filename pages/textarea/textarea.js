import { mkdirSync } from "fs";

Page({
  data: {
    height: 20,
    focus: false,
  },
  onLoad() {},

  bindButtonTap() {
    this.onFocus();
  },

  onFocus() {
    this.setData({
      focus: true
    });
  },

  onBlur() {
    this.setData({
      focus:false
    });
  },

  bindTextAreaBlur(e) {
    console.log(e.detail.value);
  },

  bindFormSubmit(e) {
    console.log(e);
    my.alert({
      content:e.detail.value.textarea,
    });
  }
  

});
