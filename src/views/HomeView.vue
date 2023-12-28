<template>
 
  <the-header />
  <div class="nav">
    <button @click.prevent="resetLocalStorageButton" class="nav__exit">
      <RouterLink to="/registration">Выйти</RouterLink>
    </button>
    <button @click.prevent="resetLocalStorageBoardButton" class="nav__go-back">
      <RouterLink to="/boards">Страница досок</RouterLink>
    </button>
  </div>

  <div class="kanban" v-if="tasks">
    <kanban-column 
      v-for="column in tasks"
      class="kanban__column"
      :key="column.id"
      :column="column.status"
      :tasks="column.tasks"
      @add-task="openModal(column.status.id)"
      @task-droped="handleTaskDroped"
    />
  </div>

  <the-footer />

  <the-modal 
    v-if="isModalOpen"
    @close-modal="closeModal"
    @add-task="addTaskData"
  />

</template>
<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import TheModal from '../components/todo/TheModal.vue';
import KanbanColumn from '../components/todo/TheColumn.vue';
import { RouterLink } from 'vue-router';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import router from '@/router';

export default {
  components: {
    TheHeader,
    TheFooter,
    TheModal,
    KanbanColumn,
  },

  computed: {
    ...mapGetters([
      'tasks',
      'curentBoardId',
      'curentColumnId',
      'isModalOpen',
    ]),
  },

  methods: {
    ...mapActions([
      'getTasks',
      'openModal',
      'closeModal',
      'resetLocalStorage',
      'resetLocalStorageBoard',
      'addTask',
    ]),
  
    async resetLocalStorageButton() {
      await this.resetLocalStorage();
    },

    async resetLocalStorageBoardButton() {
      await this.resetLocalStorageBoard();
    },

    async addTaskData(newTask) {
      const statusId = this.curentColumnId;
      const formData = {
        formData: {
          ...newTask,
          statusId: statusId
        }
      };
      console.log(formData)
      this.closeModal();
      await this.addTask(formData);
      await this.getTasks();
    }
  },

  async mounted() {
    if (!localStorage.getItem('token')) {
      await router.push('/auth');
    } else {
      await this.getTasks();
    };
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