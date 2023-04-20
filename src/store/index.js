import Vue from "vue";
import Vuex from "vuex";
import isStorageDamaged from "@/services/isStoreDamaged";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {
    id: 0,
    storage: {
      home: [],
      work: [],
      family: [],
    },
  },
  getters: {
    getMaxId(state) {
      let id = 0;
      for (let storage in state.storage) {
        if (storage.length > 0) {
          for (let record of state.storage[storage]) {
            if (record.id > id) {
              id = record.id;
            }
          }
        }
      }
      return id;
    },
  },
  mutations: {
    savaRecords(state) {
      window.localStorage.storage = JSON.stringify(state.storage);
      window.localStorage.id = state.id;
    },
    restoreRecords(state) {
      if (window.localStorage.storage !== undefined) {
        state.storage = JSON.parse(window.localStorage.storage);
        if (
          !("home" in state.storage) ||
          !("work" in state.storage) ||
          !("family" in state.storage) ||
          isStorageDamaged(state)
        ) {
          throw new Error("VUEX01: STORAGE DAMAGED");
        }
      }
    },
    resetRecordsToDefault(state) {
      state.storage = {
        home: [],
        work: [],
        family: [],
      };
    },
    createRecord(state, payload) {
      state.storage[payload.storage].push({
        id: payload.id,
        text: payload.text,
        checked: false,
      });
      state.id++;
    },
    deleteRecord(state, payload) {
      let index = state.storage[payload.storage].indexOf(payload.record);
      if (index === "undefined") {
        throw new Error("VUEX02: ELEMENT NOT EXIST");
      } else {
        state.storage[payload.storage].splice(index, 1);
      }
    },
    changeStatus(state, payload) {
      payload.record.checked = !payload.record.checked;
    },
    changeText(state, payload) {
      payload.record.text = payload.text;
    },
    setId(state, getters) {
      state.id = getters.getMaxId() + 1;
    },
  },
  actions: {
    createRecord({ commit }, payload) {
      commit("createRecord", {
        storage: payload.storage,
        text: payload.text,
        id: payload.id,
      });
    },
    deleteRecord({ commit }, payload) {
      commit("deleteRecord", {
        storage: payload.storage,
        record: payload.record,
      });
    },
    changeStatus({ commit }, payload) {
      commit("changeStatus", {
        record: payload.record,
      });
    },
    changeText({ commit }, payload) {
      commit("changeText", {
        record: payload.record,
        text: payload.text,
      });
    },
    setId({ commit }) {
      commit("setId");
    },
    saveRecords({ commit }) {
      commit("savaRecords");
    },
    restoreRecords({ commit }) {
      commit("restoreRecords");
    },
    resetRecordsToDefault({ commit }) {
      commit("resetRecordsToDefault");
    },
  },
});
