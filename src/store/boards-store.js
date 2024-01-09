export default {
  namespaced: true,
  state: {
    isShowModal: false,
  },

  mutations: {
    openModal(state){
      state.showModal = true;
    },
    closeModal(state){
      state.showModal = false;
    }
  },

  actions: {},

  getters: {
    modals(state) {
      return state.modals;
    },
  }
}