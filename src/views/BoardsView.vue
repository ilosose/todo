<template>
  <button @click.prevent="resetLocalStorageButton" class="exit">
    <RouterLink to="/registration">Выйти</RouterLink>
  </button>
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
import { RouterLink } from 'vue-router';
import ColumnBoard from '../components/boards/TheBoard.vue';
import { mapActions, mapGetters } from 'vuex';
import axios from '../utils/axios';

export default {
  components: {
    ColumnBoard,
  },

  data() {
    return {
      boards: [],
    }
  },

  methods: {
    ...mapActions(['resetLocalStorage',]),

    async getBoards() {
      const userId = localStorage.getItem('userId')
      await axios
        .get(`user/${userId}/boards`)
        .then((res) => {
          this.boards = res.data
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async resetLocalStorageButton() {
      await this.resetLocalStorage();
    },
  },
  
  async mounted() {
    await this.getBoards();
  },
}
</script>

<style scope>
    .board {
      display: flex;
      margin-right: auto;
      padding: 14px;
      margin-top: 150px;
      margin-left: 100px;
      margin: auto;
      color: #5D5FEF;

      border-radius: 12px;
      background-color: #D5CCFF;
    }
    .exit {
      justify-content: end;
      margin-left: auto;
      margin-right: 12px;
      padding: 15px;
      border-radius: 12px;
      background-color: #D5CCFF;
    }
    .exit:hover {
      background: #13c4bb;
      cursor: pointer;
    }
</style>