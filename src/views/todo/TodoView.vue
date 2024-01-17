<template>
  <div class="nav">
    <div class="box">
      <div v-for="user in users" :key="user.id" class="users__box">
        <div class="userEmail">{{ user.email }}</div>
        <button class="Add_button_style" @click="openAddUserModal">Добавить</button>
          <button class="delete_button_style" @click="deleteUser(user.id)">Удалить</button>
      </div>
    </div>
      <div >
      <div class="buttos__support">
      <button @click="this.$router.push({ name: 'boards' })" class="nav__go-back">Страница досок</button>
      <button @click.prevent="openAddColunmModal" class="nav__add-column">Добавить статус</button>
      <button class="management" @click.prevent="openAdminModal">Управление</button>
    </div>
    </div>
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

  <the-add-user v-if="isAddUser" @close-modal="closeAddUserModal" />

  <the-admin-modal v-if="isAdminModal" @close-admin-modal="closeAdminModal" />

  <the-edit-task v-if="isOpenEditTaskModal" @edit-task="editTask" />
</template>
<script>
import TheAddTask from "../../components/todo/modals/TheAddTask.vue";
import KanbanColumn from "../../components/todo/TheColumn.vue";
import TheAddColumn from "../../components/todo/modals/TheAddColumn.vue";
import TheEditColumn from "../../components/todo/modals/TheEditColumn.vue";
import TheEditTask from "../../components/todo/modals/TheEditTask.vue";
import TheAdminModal from "@/components/todo/modals/TheAdminModal.vue";
import TheAddUser from "../../components/todo/modals/TheAddUser.vue";
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
    TheAddUser,
  },

  data() {
    return {
      isAdminModal: false,
      isAddTaskModalOpen: false,
      isAddColumnModalOpen: false,
      isEditColumnModalOpen: false,
      isAddUser: false,
      curentColumnId: null,
      userMatch: [],
    };
  },

  computed: {
    ...mapGetters("columns", [
      "boardId",
      "curentTaskId",
      "curentStatusId",
      "isOpenEditTaskModal",
      "users",
    ]),
  },

  methods: {
    ...mapActions(["resetLocalStorage"]),

    ...mapActions("columns", ["getColumns", "getUsers"]),

    async resetLocalStorageButton() {
      await this.$router.push({ name: "registration" });
      await this.resetLocalStorage();
    },

    async resetLocalStorageBoardButton() {
      await this.$router.push({ name: "boards" });
      await this.resetLocalStorageBoard();
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

    openAdminModal() {
      this.isAdminModal = true;
    },

    openAddUserModal() {
      this.isAddUser = true;
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

    closeAdminModal() {
      this.isAdminModal = false;
    },

    closeAddUserModal() {
      this.isAddUser = false;
    },

    async addColumn(newColumn) {
      console.log(newColumn);
      const formData = {
        ...newColumn,
      };

      this.closeAddColumnModal();

      await axios.post(`boards/${this.boardId}/statuses`, { formData }).catch((err) => {
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

      await axios.post(`boards/${this.boardId}/tasks`, { formData }).catch((err) => {
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

    async deleteUser(userId) {
      await axios.delete(`boards/${this.boardId}/users/${userId}`).catch((err) => {
        console.log(err.response.data.cause);
      });
    },
  },

  async mounted() {
    await this.$store.commit("columns/setBoardId", this.$route.params.boardId);
    await this.getUsers(this.boardId);
    await this.getColumns(this.boardId);
  },
};
</script>

<style scoped>
.box {
  background-color: lightgrey;
  box-shadow: 2px 5px 5px rgb(111, 111, 111);
  padding: 15px;
  margin-left: 10px;
  border-radius: 10px;
  border: solid 1px black;
}
.nav__add-column {
  background-color: #eeeeee;
  box-shadow: 0 2px 2px rgb(111, 111, 111);
  font-family: "Andale Mono", monospace;
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  color: black;
  font-size: 15px;
  margin-right: 10px;
}
.nav__add-column:hover {
  background: gainsboro;
  transform : translate(0, 1px);
  cursor: pointer;
}
.management {
  background-color: #eeeeee;
  box-shadow: 0 2px 2px rgb(111, 111, 111);
  font-family: "Andale Mono", monospace;
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  color: black;
  font-size: 15px;
}
.management:hover {
  background: gainsboro;
  transform : translate(0, 1px);
  cursor: pointer;
}
.nav {
justify-content:space-between;
  display: flex;
  margin-top: 10px;
  margin-right: 40px;
}
.nav__go-back {
  background-color: #eeeeee;
  box-shadow: 0 2px 2px rgb(111, 111, 111);
  font-family: "Andale Mono", monospace;
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  color: black;
  font-size: 15px;
  margin-right: 10px;
}

.nav__go-back:hover {
  background: gainsboro;
  transform : translate(0, 1px);
  cursor: pointer;
}
.buttos__support{
  margin-top: 70px;
  align-items: center;
}
.users__box{
  background-color: ghostwhite;
  padding: 5px;
  border: solid 1px black;
  border-radius: 10px;
  margin-bottom: 8px;
  box-shadow: 2px 5px 5px rgb(111, 111, 111);
}
.userEmail{
  color: black;
  font-weight: 700;
  text-decoration: underline;
  margin-bottom: 6px;
  padding: 5px;
}
.Add_button_style{
  background-color: #eeeeee;
  box-shadow: 0 2px 2px rgb(111, 111, 111);
  font-family: "Andale Mono", monospace;
  border: 1px solid black;
  padding: 5px;
  border-radius: 10px;
  color: black;
  font-size: 15px;
  margin-right: 10px;
}
.Add_button_style:hover{
  background: gainsboro;
  transform : translate(0, 1px);
  cursor: pointer;
}
.delete_button_style{
  background-color: #eeeeee;
  box-shadow: 0 2px 2px rgb(111, 111, 111);
  font-family: "Andale Mono", monospace;
  border: 1px solid black;
  padding: 5px;
  border-radius: 10px;
  color: black;
  font-size: 15px;
  margin-bottom: 5px;
}
.delete_button_style:hover{
  background: gainsboro;
  transform : translate(0, 1px);
  cursor: pointer;
}
</style>
