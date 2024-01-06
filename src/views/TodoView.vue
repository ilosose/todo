<template>
 
  <div class="nav">
    <button @click.prevent="resetLocalStorageButton" class="nav__exit">
      <RouterLink to="/registration">Выйти</RouterLink>
    </button>
    <button @click.prevent="resetLocalStorageBoardButton" class="nav__go-back">
      <RouterLink to="/boards">Страница досок</RouterLink>
    </button>
  </div>

  <div class="kanban" v-if="columns">
    <kanban-column 
      v-for="column in columns"
      class="kanban__column"
      :key="column.id"
      :column="column.status"
      :tasks="column.tasks"
      @add-task="openModal(column.status.id)"
      @task-droped="handleTaskDroped"
    />
  </div>

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
import { mapActions, mapGetters } from 'vuex';
import axios from '../utils/axios'

export default {
  components: {
    TheModal,
    KanbanColumn,
  },

  data() {
    return {
      columns: [],
      isModalOpen: false,
      curentColumnId: null,
    }
  },

  methods: {
    ...mapActions([
      'resetLocalStorage'
    ]),

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

    getColumns() {
      const boardId = localStorage.getItem('boardId');
      axios
        .get(`boards/${boardId}/tasks`)
        .then((res) => {
          this.columns = res.data
        })
        .catch((err) => {
          console.log(err);
        })
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
  .kanban {
    display: flex;
    padding: 40px;
    align-items: flex-start;
    gap: 40px;
    margin: 10px 0;
  }

  .kanban__column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    flex: 1 0 0;
    padding: 14px;
    border-radius: 12px;
    background-color: #D5CCFF;
  }
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