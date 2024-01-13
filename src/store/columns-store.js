import axios from "../utils/axios";

export default {
  namespaced: true,
  state: {
    columns: [],
    boardId: null,
    isOpenEditTaskModal: false,
    curentTaskId: null,
    curentStatusId: null,
  },

  mutations: {
    setBoardId(state, boardId) {
      state.boardId = boardId;
    },
    setColumns: (state, columnsData) => {
      state.columns = columnsData;
    },
    setTaskId: (state, taskId) => {
      state.curentTaskId = taskId;
      state.isOpenEditTaskModal = true;
    },
    setStatusId: (state, statusId) => {
      state.curentStatusId = statusId;
    },
    closeEditTaskModal: (state) => {
      state.isOpenEditTaskModal = false;
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
    isOpenEditTaskModal(state) {
      return state.isOpenEditTaskModal;
    },
    curentTaskId(state) {
      return state.curentTaskId;
    },
    curentStatusId(state) {
      return state.curentStatusId;
    }
  }
}