import { createStore } from "vuex";
import axios from '../utils/axios';

const store = createStore({
  state() {
    return {
      tasks: [],
      isModalOpen: false,
      curentColumnId: null,
    }
  },

  mutations: {
    setTasks: (state, tasksData) => {
      state.tasks = tasksData;
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
    openModal({commit}, columnId) {
      return commit('openModal', columnId)
    },

    closeModal({commit}) {
      return commit('closeModal')
    },

    signin(_, formData) {
      return axios
        .post('auth/signin', formData)
        .then((res) => {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('email', formData.formData.email)
          console.log('Получилось!')
        })
        .catch((err) => {
          console.log(err)
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

    getTasks({ commit }) {
      return axios
        .get('boards/21/tasks')
        .then((tasks) => {
          console.log(tasks.data)
          const tasksData = tasks.data
          commit('setTasks', tasksData)       
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  
  getters: {
    tasks(state) {
      return state.tasks;
    },

    isModalOpen(state) {
      return state.isModalOpen;
    },
  },
})

export default store;
