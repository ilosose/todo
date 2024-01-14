<template>
  <div class="nav">
    <button @click.prevent="resetLocalStorageButton" class="nav__exit">
      Выйти
    </button>
    <button
      @click.prevent="this.$router.push({ name: 'boards' })"
      class="nav__go-back"
    >
      Страница досок
    </button>
    <button @click.prevent="openAddColunmModal" class="nav__add-column">
      Добавить статус
    </button>
    <button @click.prevent="openAdminModal">Управление</button>
  </div>

  <kanban-column
    @add-task="openAddTaskModal"
    @edit-column="openEditColumnModal"
    @task-droped="handleTaskDroped"
  />

  <the-add-column
    v-if="isAddColumnModalOpen"
    @add-column="addColumn"
    @close-modal="closeAddColumnModal"
  />

  <the-edit-column
    v-if="isEditColumnModalOpen"
    @edit-column="editColumn"
    @close-modal="closeEditColumnModal"
  />

  <the-add-task
    v-if="isAddTaskModalOpen"
    @add-task="addTaskData"
    @close-modal="closeAddTaskModal"
  />
  <the-admin-modal
  v-if="isAdminModal"
  @close-admin-modal="closeAdminMoadl"
  />

  <the-edit-task v-if="isOpenEditTaskModal" @edit-task="editTask" />
</template>
<script>
import TheAddTask from "../../components/todo/modals/TheAddTask.vue";
import KanbanColumn from "../../components/todo/TheColumn.vue";
import TheAddColumn from "../../components/todo/modals/TheAddColumn.vue";
import TheEditColumn from "../../components/todo/modals/TheEditColumn.vue";
import TheEditTask from "../../components/todo/modals/TheEditTask.vue";
import TheAdminModal from "@/components/todo/modals/TheAdminModal.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "../../utils/axios";

export default {
  components: {
    TheAddTask,
    TheAddColumn,
    TheEditColumn,
    TheEditTask,
    KanbanColumn,
    TheAdminModal,
  },

  data() {
    return {
      isAdminModal: false,
      isAddTaskModalOpen: false,
      isAddColumnModalOpen: false,
      isEditColumnModalOpen: false,
      curentColumnId: null,
    };
  },

  computed: {
    ...mapGetters("columns", [
      "boardId",
      "curentTaskId",
      "curentStatusId",
      "isOpenEditTaskModal",
    ]),
  },

  methods: {
    ...mapActions(["resetLocalStorage"]),

    ...mapActions("columns", ["getColumns"]),

    async resetLocalStorageButton() {
      await this.$router.push({ name: "registration" });
      await this.resetLocalStorage();
    },

    async resetLocalStorageBoardButton() {
      await this.$router.push({ name: "boards" });
      await this.resetLocalStorageBoard();
    },
    openAdminModal() {
      this.isAdminModal = true;

    },
    closeAdminMoadl(){
      this.isAdminModal = false;

    },

    openAddTaskModal(columnId) {
      this.isAddTaskModalOpen = true;
      this.curentColumnId = columnId;
    },

    openAddColunmModal() {
      this.isAddColumnModalOpen = true;
    },

    openEditColumnModal(columnId) {
      this.isEditColumnModalOpen = true;
      this.curentColumnId = columnId;
    },

    closeAddTaskModal() {
      this.isAddTaskModalOpen = false;
    },

    closeAddColumnModal() {
      this.isAddColumnModalOpen = false;
    },

    closeEditColumnModal() {
      this.isEditColumnModalOpen = false;
    },

    async addColumn(newColumn) {
      console.log(newColumn);
      const formData = {
        ...newColumn,
      };

      this.closeAddColumnModal();

      await axios
        .post(`boards/${this.boardId}/statuses`, { formData })
        .catch((err) => {
          alert(err.response.data.cause);
        });

      await this.getColumns(this.boardId);
    },

    async editColumn(editColumn) {
      const statusId = this.curentColumnId;
      const formData = {
        ...editColumn,
      };

      this.closeEditColumnModal();

      await axios
        .put(`boards/${this.boardId}/statuses/${statusId}`, { formData })
        .catch((err) => {
          alert(err.response.data.cause);
        });

      await this.getColumns(this.boardId);
    },

    async addTaskData(newTask) {
      const statusId = this.curentColumnId;
      const formData = {
        ...newTask,
        statusId: statusId,
      };

      this.closeAddTaskModal();

      await axios
        .post(`boards/${this.boardId}/tasks`, { formData })
        .catch((err) => {
          alert(err.response.data.catch);
        });

      await this.getColumns(this.boardId);
    },

    async editTask(editTask) {
      const taskId = this.curentTaskId;
      const curentStatusId = this.curentStatusId;
      const formData = {
        ...editTask,
        statusId: curentStatusId,
      };

      this.$store.commit("columns/closeEditTaskModal");

      await axios
        .put(`boards/${this.boardId}/tasks/${taskId}`, { formData })
        .catch((err) => {
          alert(err.response.data.cause);
        });

      await this.getColumns(this.boardId);
    },

    async handleTaskDroped(taskId, statusId) {
      const formData = {
        statusId: statusId,
      };

      await axios
        .patch(`boards/${this.boardId}/tasks/${taskId}`, { formData })
        .catch((err) => {
          alert(err.response.data.cause);
        });

      await this.getColumns(this.boardId);
    },
  },

  async mounted() {
    await this.$store.commit("columns/setBoardId", this.$route.params.boardId);
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
  background: #d5ccff;
  border-radius: 5px;
}

.nav__go-back {
  padding: 5px;
  padding-inline: 10px;
  background: #d5ccff;
  border-radius: 5px;
}

.nav__exit:hover,
.nav__go-back:hover {
  background: #13c4bb;
  cursor: pointer;
}
</style>
