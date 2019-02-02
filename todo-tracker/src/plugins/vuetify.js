import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

const vuetify_settings = {
  iconfont: 'md',
  theme: {
    primary:  '#9652FF',
    success:  '#3CD1C2',
    info:     '#FFAA2C',
    error:    '#F83E70'
  }
};

Vue.use(Vuetify, vuetify_settings)
