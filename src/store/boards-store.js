import axios from "../utils/axios";

export default {
  namespaced: true,
  state: {
    boards: [],
    isShowModal: false,
  },

  mutations: {
    setBoards(state, boardsData) {
      state.boards = boardsData;
    },
    openModal(state) {
      state.isShowModal = true;
    },
    closeModal(state) {
      state.isShowModal = false;
    }
  },

  actions: {
    getBoards({ commit }) {
      const userId = localStorage.getItem('userId');
      return axios
        .get(`user/${userId}/boards`)
        .then((res) => {
          console.log(res.data)
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
    isShowModal(state) {
      return state.isShowModal;
    },
  }
}