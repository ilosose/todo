import { createStore } from "vuex";
import axios from '../utils/axios';

const store = createStore({
  state() {
    return {
      tasks: [],
      boards: [],
      isModalOpen: false,
      curentColumnId: null,
    }
  },

  mutations: {
    setTasks: (state, tasksData) => {
      state.tasks = tasksData;
    },

    setBoards: (state, boardsData) => {
      state.boards = boardsData;
    },

    openModal: (state, columnId) => {
      state.curentColumnId = columnId;
      state.isModalOpen = true;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },

  actions: {
    openModal({ commit }, columnId) {
      commit('openModal', columnId);
    },

    closeModal({ commit }) {
      commit('closeModal');
    },

    openColumnsByBoard(_, boardId) {
      localStorage.setItem('boardId', boardId);
    },

    resetLocalStorage() {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('boardId');
      localStorage.removeItem('userId');
    },

    resetLocalStorageBoard() {
      localStorage.removeItem('boardId');
    },

    signin(_, formData) {
      return axios
        .post('auth/signin', formData)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('userEmail', formData.formData.email);
        })
        .catch((err) => {
          console.log(err);
        })
    },

    signup(_, formData) {
      return axios
        .put('auth/signup', formData)
        .then((res) => {
          console.log('Получилось!');
        })
        .catch((err) => {
          console.log(err);
        })
    },

    getBoards({ commit }) {
      const userId = localStorage.getItem('userId')
      return axios
        .get(`user/${userId}/boards`)
        .then((boards) => {
          const boardsData = boards.data;
          commit('setBoards', boardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getTasks({ commit }) {
      const boardId = localStorage.getItem('boardId');
      return axios
        .get(`boards/${boardId}/tasks`)
        .then((tasks) => {
          const tasksData = tasks.data;
          console.log(tasksData)
          commit('setTasks', tasksData);     
        })
        .catch((err) => {
          console.log(err);
        })
    },

    addTask(_, newTask) {
      const boardId = localStorage.getItem('boardId')
      return axios
        .post(`boards/${boardId}/tasks`, newTask)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  
  getters: {
    tasks(state) {
      return state.tasks;
    },

    boards(state) {
      return state.boards;
    },

    isModalOpen(state) {
      return state.isModalOpen;
    },
    
    curentColumnId(state) {
      return state.curentColumnId;
    },
  },
})

export default store;
