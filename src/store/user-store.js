export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
  },

  mutations: {},

  actions: {},
  
  getters: {
    isAuthenticated(state) {
      const token = localStorage.getItem("token");
      if (token) {
        return state.isAuthenticated = true;
      }
      return state.isAuthenticated = false;
    }
  }
}