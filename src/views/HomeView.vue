<template>
 
  <the-header />

  <button>
    <RouterLink to="/registration">Страница регистрации</RouterLink>
    <RouterLink to="/auth">Страница регистрации</RouterLink>
  </button>

  <kanban-column
      v-for="column in tasks"
      :key="column.id"
      :column="column.status"
      :tasks="column.tasks"
      @add-task="openModal(column.id)"
      @task-droped="handleTaskDroped"
    />

  <the-footer />

  <the-modal 
    v-if="false"
  />

</template>
<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import TheModal from '../components/todo/TheModal.vue'
import KanbanColumn from '../components/todo/TheColumn.vue';
import { RouterLink } from 'vue-router';
// import axios from '../utils/axios';

export default {
  components: {
    TheHeader,
    TheFooter,
    TheModal,
  }
}
</script>
<style>
  
</style>