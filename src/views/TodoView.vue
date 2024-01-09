<template>
 
  <div class="nav">
    <button @click.prevent="resetLocalStorageButton" class="nav__exit">
      Выйти
    </button>
    <button @click.prevent="this.$router.push({ name: 'boards' })" class="nav__go-back">
      Страница досок
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
import { mapActions, mapGetters } from 'vuex';
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

  computed: {
    ...mapGetters('tasks', ['boardId'])
  },

  methods: {
    ...mapActions(['resetLocalStorage']),

    ...mapActions('tasks', ['getColumns']),
  
    async resetLocalStorageButton() {
      await this.$router.push({ name: 'registration' });
      await this.resetLocalStorage();
    },

    async resetLocalStorageBoardButton() {
      await this.$router.push({ name: 'boards' });
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
      const formData = {
        ...newTask,
        statusId: statusId
      };

      this.closeModal();

      await axios
        .post(`boards/${this.boardId}/tasks`, {formData})
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })

      await this.getColumns(this.boardId);
    },
  },

  async mounted() {
    await this.$store.commit('tasks/setBoardId', this.$route.params.boardId)
    await this.getColumns(this.boardId);
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