import axios from "../utils/axios";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    columns: [],
    boardId: null,
    users: null,
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
    setUsers: (state, usersData) => {
      state.users = usersData;
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
          router.push({ name: 'boards' })
        })
    },
    getUsers({ commit }, boardId){
      return axios
        .get(`boards/${boardId}/users`)
        .then((response)=>{
          const usersData = response.data
          commit('setUsers', usersData)
        })
        .catch((err)=>{
          alert(err.response.data.cause)
        })
    },
  },

  getters: {
    boardId(state) {
      return state.boardId;
    },
    columns(state) {
      return state.columns;
    },
    users(state) {
      return state.users
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