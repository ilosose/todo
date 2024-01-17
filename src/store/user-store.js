export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
  },
  
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