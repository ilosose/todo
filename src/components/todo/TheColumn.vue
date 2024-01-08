<template>
   <div class="kanban" v-if="columns">
    <section
      v-for="status in columns" 
      :key="status.id"
      class="kanban__column"
      @dragover.prevent="allowDrop"
      @drop="handleDrop" 
    >
      <div class="kanban__header">
        <div class="kanban__header-content">
          <h2 class="kanban__title">{{ status.status.name }}</h2>
        </div>      
        <img 
          src="../assets/img/kanban/plus.svg" 
          alt="Добавить задачу" 
          class="kanban__icon kanban__icon--add"
          @click="$emit('add-task', status.status.id)">
      </div>
      <div class="kanban__list">
        <kanban-task 
          v-for="task in status.tasks"
          :key="task.id"
          :task="task"  
        />
      </div>
    </section>
  </div>
</template>

<script>
import KanbanTask from './TheTask.vue';
import { mapGetters } from 'vuex';

  export default {
    components: {
      KanbanTask,
    },

    computed: {
      ...mapGetters('tasks', ['columns'])
    },

    methods: {
      allowDrop(event) {
        event.preventDefault();
      },
      
      handleDrop(event) {
        event.preventDefault();
        const taskId = event.dataTransfer.getData('text/plain');
        this.$emit('task-droped', Number(taskId), this.column.id);
      },
    },

    created() {
    },
  }
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
  .kanban__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
  }

  .kanban__header-content {
      display: flex;
      align-items: center;
      gap: 10px;

  }

  .kanban__title {
      color: #2B1887;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
  }

  .kanban__icon--add:hover {
      cursor: pointer;
      opacity: .5;
  }

  .kanban__list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
  }
</style>