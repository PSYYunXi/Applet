Page({
  data: {
    idx:0,
    pages:[
      'button',
      'checkbox',
      'cover-vier',
      'form',
      'icon',
      'input',
      'label',
      'movable-area',
      'picker',
      'pickview',
      'progress',
      'radio',
      'richText',
      'scroll-view',
      'switch',
      'text',
      'textarea',
      'view',
    ]
  },
  onLoad() {},

  click(e) {
    console.log(e.currentTarget.dataset.index);
    this.data.idx = e.currentTarget.dataset.index;
    my.navigateTo({
      url: '../' + this.data.pages[this.data.idx] + '/' + this.data.pages[this.data.idx],
    });
  },
});
