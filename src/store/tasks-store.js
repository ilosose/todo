import axios from "../utils/axios";

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

  actions: {
    getColumns({ commit }) {
      const boardId = localStorage.getItem('boardId')
      return axios
        .get(`boards/${boardId}/tasks`)
        .then((res) => {
          const columnsData = res.data
          commit('setColumns', columnsData)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  getters: {
    columns(state) {
      return state.columns;
    },
  }
}