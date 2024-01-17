<template>
  <div 
    class="kanban" 
    v-if="columns"  
  >
    <section
      v-for="status in columns"
      :key="status.id"
      class="kanban__column"
    >
      <div class="kanban__header"
        draggable="true"
        @dragstart="startDrag($event, status.status.name, status.status.id)"
        @dragover.prevent="allowDrop"
        @drop="handleStatusDrop($event, status.status.name, status.status.id)" 
      >
        <div class="kanban__header-content">
          <h2 class="kanban__title">{{ status.status.name }}</h2>
        </div>
        <div class="icons">
          <img
            src="../assets/img/kanban/plus.svg"
            alt="Добавить задачу"
            class="kanban__icon kanban__icon--add"
            @click="$emit('add-task', status.status.id)"
          />
          <img
            src="../assets/img/kanban/pen.svg"
            alt="Изменить колонку"
            class="kanban__icon kanban__icon--edit"
            @click="$emit('edit-column', status.status.id)"
          />
          <img 
            src="../assets/img/kanban/bucket.svg" 
            alt="Удалить колонку"
            class="kanban__icon kanban__icon--delete"
            @click="deleteStatus(status.status.id)"
          />
        </div>
      </div>
      <div 
        class="kanban__list"
        @dragover.prevent="allowDrop"
        @drop="handleTaskDrop($event, status.status.id)" 
      >
        <kanban-task v-for="task in status.tasks" :key="task.id" :task="task" />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import KanbanTask from "./TheTask.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    KanbanTask,
  },

  computed: {
    ...mapGetters('columns', ['columns', 'boardId']),
  },

  methods: {
    ...mapActions('columns', ['getColumns']),
    async deleteStatus(statusId) {
      await axios
        .delete(`boards/${this.boardId}/statuses/${statusId}`)
        .catch((err) => {
          console.log(err.response.data.cause)
        })
      await this.getColumns(this.boardId);
    },

    allowDrop(event) {
      event.preventDefault();
    },

    handleTaskDrop(event, statusId) {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("text/plain");
        this.$emit("task-droped", Number(taskId), statusId);
    },

    startDrag(event, targetStatusName, targetStatusId) {
      event.dataTransfer.setData("targetStatusName", targetStatusName);
      event.dataTransfer.setData("targetStatusId", targetStatusId)
    },

    async handleStatusDrop(event, statusNameArea, statusIdArea) {
      event.preventDefault();
      const targetStatusName = event.dataTransfer.getData("targetStatusName");
      const targetStatusId = event.dataTransfer.getData("targetStatusId");
      const targetStatus = {
        formData: {
          name: statusNameArea
        }
      }
      const areaStatus = {
        formData: {
          name: targetStatusName
        }
      }

      await axios
        .put(`boards/${this.boardId}/statuses/${statusIdArea}`, areaStatus)
        .catch((err) => {
          console.log(err.response.data.cause)
        })

      await axios
        .put(`boards/${this.boardId}/statuses/${targetStatusId}`, targetStatus)
        .catch((err) => {
          console.log(err.response.data.cause)
        })

      await this.getColumns(this.boardId)
    }

  },
};
</script>

<style scoped>
.kanban__icon--edit {
  width: 26px;
  height: 26px;
  padding-right: 8px;
}
.kanban__icon--edit:hover{
  opacity: 0.7;
  cursor: pointer;
}

.kanban__icon--delete {
  width: 23px;
  height: 23px;
}
.kanban__icon--delete:hover {
  opacity: 0.7;
  cursor: pointer;
}
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
  gap: 12px;
  flex: 1 0 0;
  padding: 14px;
  border-radius: 12px;
  background-color: gainsboro;
  box-shadow: 0 5px 5px rgb(111, 111, 111);
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
  color: black;
  font-size: 25px;
  font-style: normal;
  padding-left: 10px;
  font-family: 'Andale Mono', monospace;
  text-decoration: underline;
  font-weight: 900;
  line-height: normal;
}
.kanban__icon--add:hover {
  cursor: pointer;
  opacity: 0.5;
}

.kanban__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding-top: 20px;
}
</style>
