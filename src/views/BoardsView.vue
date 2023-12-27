<template>
  <the-header />
  <button @click.prevent="resetLocalStorageButton">
    <RouterLink to="/registration">Выйти</RouterLink>
  </button>
  <div class="board">
    <column-board
      v-for="board in boards"
      class="board__box"
      :key="board.id"
      :board="board"
    />
  </div>
  <the-footer />
</template>
<script>
import router from '@/router';
import { RouterLink } from 'vue-router';
import ColumnBoard from '../components/boards/TheBoard.vue';
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    ColumnBoard,
    TheHeader,
    TheFooter,
  },

  computed: {
    ...mapGetters([
      'boards',
    ]),
  },

  methods: {
    ...mapActions([
      'getUserId',
      'getBoards',
      'resetLocalStorage',
    ]),

    async resetLocalStorageButton() {
      await this.resetLocalStorage();
    },
  },
  
  async mounted() {
    if (!localStorage.getItem('token')) {
      await router.push('/auth');
    } else {
      await this.getUserId();
      await this.getBoards();
    };
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
</style>