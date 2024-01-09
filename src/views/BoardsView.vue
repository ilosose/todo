<template>
  <button @click.prevent="resetLocalStorageButton" class="exit">Выйти</button>
    <the-add 
      @add-board="addBoard"
    />
    <column-board />
</template>
<script>
import ColumnBoard from "../components/boards/TheBoard.vue";
import TheAdd from "../components/boards/TheAdd.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "../utils/axios";

export default {
  components: {
    ColumnBoard,
    TheAdd,
  },

  computed:{
    ...mapGetters('boards', ['isShowModal'])
  },

  methods: {
    ...mapActions(['resetLocalStorage']),
    ...mapActions('boards', ['getBoards']),

    async addBoard(newBoard) {
      const userId = localStorage.getItem('userId');
      const formData = {
        ...newBoard
      };

      await axios
        .post(`user/${userId}/boards`, {formData})
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        });
      
      await this.getBoards();
    },

    async resetLocalStorageButton() {
      await this.resetLocalStorage();
      await this.$router.push('/registration')
    },

  },

  async mounted() {
    await this.getBoards();
  },
};
</script>

<style scope>
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
