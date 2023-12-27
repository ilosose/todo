<template>
 
  <the-header />

  <button @click.prevent="resetLocalStorageButton">
    <RouterLink to="/registration">Выйти</RouterLink>
  </button>

  <div class="kanban">
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
  />

</template>
<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import TheModal from '../components/todo/TheModal.vue'
import KanbanColumn from '../components/todo/TheColumn.vue';
import { RouterLink } from 'vue-router';
import { mapActions, mapGetters } from 'vuex';
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
      'isModalOpen',
    ]),
  },

  methods: {
    ...mapActions([
      'getTasks',
      'openModal',
      'closeModal',
      'resetLocalStorage',
    ]),

    async resetLocalStorageButton() {
      await this.resetLocalStorage()
    },
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
</style>