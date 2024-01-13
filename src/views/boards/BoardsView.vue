<template>
  <button @click.prevent="resetLocalStorageButton" class="exit">Выйти</button>
    <the-add @add-board="addBoard"/>
    <the-edit 
      v-if="isEditModal"
      @edit-board="editBoard"
      @close-edit-modal="closeEditModal"
     />
    <column-board @edit-board="openEditModal"/>
</template>
<script>
import ColumnBoard from "../../components/boards/TheBoard.vue";
import TheAdd from "../../components/boards/modals/TheAdd.vue";
import TheEdit from "../../components/boards/modals/TheEdit.vue"
import { mapActions } from "vuex";
import axios from "../../utils/axios";

export default {
  components: {
    ColumnBoard,
    TheAdd,
    TheEdit,
  },

  data() {
    return {
      isEditModal: false,
      curentBoardId: null,
    }
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
        .catch((err) => {
          console.log(err)
        });
      
      await this.getBoards();
    },

    openEditModal(boardId) {
      this.curentBoardId = boardId;
      this.isEditModal = true;
    },

    closeEditModal() {
      this.isEditModal = false;
    },

    async editBoard(editBoard) {
      const curentBoardId = this.curentBoardId;
      const userId = localStorage.getItem('userId');
      const formData = {
        ...editBoard
      };

      this.isEditModal = false;
      
      await axios
        .put(`user/${userId}/boards/${curentBoardId}`, {formData})
        .catch((err) => {
          console.log(err)
        });
      
      await this.getBoards();
    },

    async resetLocalStorageButton() {
      await this.resetLocalStorage();
      await this.$router.push({ name: 'registration' })
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
