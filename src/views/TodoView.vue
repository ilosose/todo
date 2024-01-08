<template>
 
  <div class="nav">
    <button @click.prevent="resetLocalStorageButton" class="nav__exit">
      <RouterLink to="/registration">Выйти</RouterLink>
    </button>
    <button @click.prevent="resetLocalStorageBoardButton" class="nav__go-back">
      <RouterLink to="/boards">Страница досок</RouterLink>
    </button>
  </div>

  <kanban-column
    @add-task="openModal"
    @task-droped="handleTaskDroped"
  />

  <the-modal 
    v-if="isModalOpen"
    @close-modal="closeModal"
    @add-task="addTaskData"
  />

</template>
<script>
import TheModal from '../components/todo/TheModal.vue';
import KanbanColumn from '../components/todo/TheColumn.vue';
import { RouterLink } from 'vue-router';
import { mapActions } from 'vuex';
import axios from '../utils/axios'

export default {
  components: {
    TheModal,
    KanbanColumn,
  },

  data() {
    return {
      isModalOpen: false,
      curentColumnId: null,
    }
  },

  methods: {
    ...mapActions(['resetLocalStorage']),

    ...mapActions('tasks', ['getColumns']),

    resetLocalStorageBoard() {
      localStorage.removeItem('boardId');
    },
  
    async resetLocalStorageButton() {
      await this.resetLocalStorage();
    },

    async resetLocalStorageBoardButton() {
      await this.resetLocalStorageBoard();
    },

    openModal(columnId) {
      this.isModalOpen = true;
      this.curentColumnId = columnId;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    async addTaskData(newTask) {
      const statusId = this.curentColumnId;
      const boardId = localStorage.getItem('boardId')
      const formData = {
        ...newTask,
        statusId: statusId
      };

      this.closeModal();

      await axios
        .post(`boards/${boardId}/tasks`, {formData})
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })

      await this.getColumns();
    },
  },

  async mounted() {
    await this.getColumns();
  },
};
</script>

<style scoped>
  .nav {
    display: flex;
    justify-content: end;
    margin-top: 10px;
    margin-right: 40px;
    padding: 5px;
  }

  .nav__exit {
    padding: 5px;
    padding-inline: 10px;
    margin-right: 15px;
    background: #D5CCFF;
    border-radius: 5px;
  }

  .nav__go-back {
    padding: 5px;
    padding-inline: 10px;
    background: #D5CCFF;
    border-radius: 5px;
  }
  
  .nav__exit:hover,
  .nav__go-back:hover {
    background: #13c4bb;
    cursor: pointer;
  }

</style>