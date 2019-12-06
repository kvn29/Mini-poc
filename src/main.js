import Vue from 'vue'
import App from './App.vue'
import store from './store/index';

window.$ = require('jquery');
window.jQuery = require('jquery');

import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/js/all';

require('./assets/jquery.flowchart.min.js');
import './assets/jquery.flowchart.min.css';

Vue.config.productionTip = false
import Popper from 'popper.js';
window.Popper = Popper;


import { ToastPlugin, DropdownPlugin, FormSelectPlugin, InputGroupPlugin, FormInputPlugin, ModalPlugin } from 'bootstrap-vue'
Vue.use(ToastPlugin);
Vue.use(DropdownPlugin);
Vue.use(FormSelectPlugin);
Vue.use(InputGroupPlugin);
Vue.use(FormInputPlugin);
Vue.use(ModalPlugin);

import './assets/custom.scss';

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
