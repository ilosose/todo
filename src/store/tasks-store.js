export default {
  namespaced: true,
  state: {
    columns: [],
  },

  mutations: {
    setColumns: (state, columnsData) => {
      state.columns = columnsData;
    },
  },

  actions: {},

  getters: {
    columns(state) {
      return state.columns;
    },
  }
}