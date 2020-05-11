Page({
  data: {
    items: [
      { name: 'angular', value: 'AngularJS' },
      { name: 'react', value: 'React', checked: true },
      { name: 'polymer', value: 'Polymer' },
      { name: 'vue', value: 'Vue.js' },
      { name: 'ember', value: 'Ember.js' },
      { name: 'backbone', value: 'Backbone.js', disabled: true },
    ],
  },
  onLoad() {},

  onSubmit(e) {
    my.alert({
      content: e.detail.value.libs[0],
    });
    console.log('onSubmit', e.detail);
  },

  onReset(e) {
    console.log('onReset', e);
  },

  checkboxChange(e) {
    console.log('你选择的框架是：', e.detail.value);
  },
  
});
