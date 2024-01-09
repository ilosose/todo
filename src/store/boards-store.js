export default {
  namespaced: true,
  state: {
    isShowModal: false,
  },

  mutations: {
    openModal(state){
      state.isShowModal = true;
    },
    closeModal(state){
      state.isShowModal = false;
    }
  },

  actions: {},

  getters: {
    isShowModal(state) {
      return state.isShowModal;
    },
  }
}