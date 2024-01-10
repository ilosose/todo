import { createStore } from "vuex";

import user from './user-store';
import boards from './boards-store';
import columns from './columns-store';

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
    columns,
  }
})

export default store;
