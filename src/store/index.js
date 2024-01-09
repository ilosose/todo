import { createStore } from "vuex";

import user from './user-store';
import boards from './boards-store';
import tasks from './tasks-store';

const store = createStore({
  actions: {
    resetLocalStorage() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  },
  
  modules: {
    user,
    boards,
    tasks,
  }
})

export default store;
