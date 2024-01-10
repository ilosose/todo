import axios from "../utils/axios";

export default {
  namespaced: true,
  state: {
    boards: [],
    isShowModal: false,
    isEditModal: false,
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
    },
    openEditModal(state){
      state.isEditModal = true;
    },
    closeEditModal(state){
      state.isEditModal = false;
    }
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
    isShowModal(state) {
      return state.isShowModal;
    },
    isEditModal(state){
      return state.isEditModal;
    }
  }
}