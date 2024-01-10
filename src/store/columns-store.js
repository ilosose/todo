import axios from "../utils/axios";

export default {
  namespaced: true,
  state: {
    columns: [],
    boardId: null,
  },

  mutations: {
    setBoardId(state, boardId) {
      state.boardId = boardId;
    },
    setColumns: (state, columnsData) => {
      state.columns = columnsData;
    },
  },

  actions: {
    getColumns({ commit }, boardId) {
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
    boardId(state) {
      return state.boardId;
    },
    columns(state) {
      return state.columns;
    },
  }
}