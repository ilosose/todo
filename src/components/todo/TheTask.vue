<template>
  <div
    v-if="task"
    class="task-item"
    draggable="true"
    @dragstart="startDrag($event, task.id)"
    @dragend="endDrag"
  >
    <h3 class="task-item__title">{{ task.name }}</h3>
    <p class="task-item__description">{{ task.description }}</p>
    <div class="task-item__info">
      <div class="task-item__complexity complexity">
        <span
          v-for="dot in this.getComplexityDot(new Date(task.plannedCompletionAt))"
          :class="dot.tag"
          :key="dot.id"
          class="complexity__dot"
        ></span>
      </div>
      <div class="task-item__client">{{ new Date(task.plannedCompletionAt).toLocaleDateString() }}</div>
    </div>
    <div>
      <button class="task-item__edit" @click.prevent="editTask(task.id, task.statusId)">Редактировать</button>
      <button class="task-item__delete" @click.prevent="deleteTask(task.id)">Удалить</button>
    </div>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    task: {
      type: Object,
      default: {},
    },
  },

  computed: {
    ...mapGetters("columns", ["boardId"]),
  },

  methods: {
    ...mapActions("columns", ["getColumns"]),

    getComplexityDot(plannedCompletionAt) {
      const currentDate = new Date();
      const inputTime = new Date(plannedCompletionAt);
      const timeDiff = inputTime.getTime() - currentDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3000 * 14));

      if (daysDiff <= 7) {
        return [
          { tag: "complexity__dot--high" },
          { tag: "complexity__dot--high" },
          { tag: "complexity__dot--high" },
        ];
      } else if (daysDiff <= 14) {
        return [
          { tag: "complexity__dot--medium" },
          { tag: "complexity__dot--medium" },
        ];
      } else {
        return [{ tag: "complexity__dot--low" }];
      }
    },

    editTask(taskId, statusId) {
      this.$store.commit('columns/setTaskId', taskId);
      this.$store.commit('columns/setStatusId', statusId);
    },

    async deleteTask(taskId) {
      await axios
        .delete(`boards/${this.boardId}/tasks/${taskId}`)
        .catch((err) => {
          alert(err.response.data.cause);
        });

      await this.getColumns(this.boardId);
    },

    startDrag(event, taskId) {
      event.dataTransfer.setData("text/plain", taskId);
    },
  },
};
</script>

<style scoped>
.task-item__delete {
  color: white;
  background: #e42c5f;
  border-radius: 5px;
  border: none;
  float: right;
  padding: 8px;
}
.task-item__delete:hover{
  background-color: #c21949;
}

.task-item {
  background-color: #f4f2ff;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.task-item__info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-item__complexity {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.complexity__dot {
  width: 24px;
  height: 12px;
  flex-shrink: 0;
  background-color: #d9d9d9;
  border-radius: 0px 10px 10px 24px;
  display: inline-block;
  margin-right: 5px;
}

.complexity__dot--medium {
  background-color: #fde047;
}

.complexity__dot--high {
  background-color: #e42c5f;
}

.complexity__dot--low {
  background-color: #2ce49d;
}

.complexity__dot--done {
  background-color: #2d41a7;
}

.task-item__title {
  flex-grow: 1;
  font-weight: 600;
  color: #333;
}

.task-item__description {
  color: gray;
  font-size: 12px;
  margin: 10px 0;
}

.task-item__client {
  font-size: 14px;
  color: #4f46e5;
  text-align: center;
}
</style>
