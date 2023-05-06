import Vue from "vue";
import Vuex from "vuex";

import isStorageDamaged from "@/helpers/isStoreDamaged";

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
  getters: {},
  mutations: {
    mutationSaveRecords(state) {
      window.localStorage.storage = JSON.stringify(state.storage);
    },
    mutationRestoreRecords(state) {
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
    mutationSetCurrentId(state) {
      let id = -1;
      for (let storage in state.storage) {
        if (storage.length > 0) {
          for (let record of state.storage[storage]) {
            if (record.id === id) {
              throw new Error(
                `VUEX00: DUPLICATE ID(id:${id}, record.id:${record.id})`
              );
            }
            if (record.id > id) {
              id = record.id;
            }
          }
        }
      }
      state.id = id + 1;
    },
    mutationResetRecordsToDefault(state) {
      state.storage = {
        home: [],
        work: [],
        family: [],
      };
    },
    mutationCreateRecord(state, payload) {
      state.storage[payload.storage].push({
        id: state.id++,
        text: payload.text,
        checked: false,
      });
      state.id++;
    },
    mutationDeleteRecord(state, payload) {
      console.log(payload);
      //{record, storage}
      let index = -1;
      index = state.storage[payload.storage].indexOf(payload.record);
      if (index === -1) {
        throw new Error("VUEX02: ELEMENT NOT EXIST");
      } else {
        state.storage[payload.storage].splice(index, 1);
      }
    },
    mutationChangeStatus(state, payload) {
      payload.record.checked = !payload.record.checked;
    },
    mutationChangeText(state, payload) {
      payload.record.text = payload.text;
    },
  },
  actions: {
    actionRestoreRecords({ commit }) {
      commit("mutationRestoreRecords");
      commit("mutationSetCurrentId");
    },
  },
});
