import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

const informationsData = require("../assets/informations.json");

export default new Vuex.Store({
  state: {
    selectedKey: null,
    help: null
  },
  mutations: {
    setSelectedKey: (state, payload) => {
      state.selectedKey = payload;
    },
    setHelp: (state, payload) => {
      state.help = payload;
    }
  },
  getters: {
    selectedKey: state => state.setSelectedKey,
    help: state => state.help,
  },
  actions: {
    getInformation({commit, state}) {
      const data = informationsData.filter(data => data.key === state.selectedKey)[0];
      commit('setHelp', data);
    }
  }
})
