Page({
  data: {
    bacground: ['blue','red','yellow'],
    indicatorDots: true,
    autoPlay: false,
    vertical: false,
    interval: 1000,
    circular: false,
  },

  onLoad() {},

  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots,
    });
  },

  changeVertical() {
    this.setData({
      vertical: !this.data.vertical,
    });
  },

  changeCircular(e) {
    this.setData({
      circular: !this.data.circular,
    });
  },

  changeAutoPlay(e) {
    this.setData({
      autoPlay: !this.data.autoPlay,
    });
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value,
    });
  }

});
