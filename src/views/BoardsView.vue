<template>
  <button @click.prevent="resetLocalStorageButton" class="exit">
    <RouterLink to="/registration">Выйти</RouterLink>
  </button>
  <the-add
  />
  <div class="board" v-if="this.boards">
    <column-board
      v-for="board in boards"
      class="board__box"
      :key="board.id"
      :board="board"
    />
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import ColumnBoard from "../components/boards/TheBoard.vue";
import TheAdd from "../components/boards/TheAdd.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "../utils/axios";

export default {
  components: {
    ColumnBoard,
    TheAdd,
  },

  data() {
    return {
      boards: [],
    };
  },

  computed:{
    ...mapGetters('boards', ['modals'])
  },

  methods: {
    ...mapActions(["resetLocalStorage"]),

    async getBoards() {
      const userId = localStorage.getItem("userId");
      await axios
        .get(`user/${userId}/boards`)
        .then((res) => {
          this.boards = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async resetLocalStorageButton() {
      await this.resetLocalStorage();
    },

    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },

  async mounted() {
    await this.getBoards();
  },
};
</script>

<style scope>
.board {
  display: flex;
  margin-right: auto;
  padding: 14px;
  margin-top: 150px;
  margin-left: 100px;
  margin: auto;
  color: #5d5fef;

  border-radius: 12px;
  background-color: #d5ccff;
}
.exit {
  justify-content: end;
  margin-left: auto;
  margin-right: 12px;
  padding: 15px;
  border-radius: 12px;
  background-color: #d5ccff;
}
.exit:hover {
  background: #13c4bb;
  cursor: pointer;
}
</style>
