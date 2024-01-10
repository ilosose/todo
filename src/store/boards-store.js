import axios from "../utils/axios";

export default {
  namespaced: true,
  state: {
    boards: [],
    isAddModal: false,
  },

  mutations: {
    setBoards(state, boardsData) {
      state.boards = boardsData;
    },

    openModal(state) {
      state.isAddModal = true;
    },
    
    closeModal(state) {
      state.isAddModal = false;
    },
  },

  actions: {
    getBoards({ commit }) {
      const userId = localStorage.getItem('userId');
      return axios
        .get(`user/${userId}/boards`)
        .then((res) => {
          const boardsData = res.data;
          commit('setBoards', boardsData)
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  getters: {
    boards(state) {
      return state.boards;
    },

    isAddModal(state) {
      return state.isAddModal;
    }
  }
}