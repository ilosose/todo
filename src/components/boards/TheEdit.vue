<template>
    <div class="window" v-if="isEditModal">
    <div class="window__container">
      <form @submit.prevent="submitEdit">
        <input
          type="text"
          v-model="editBoard.name"
          required
          placeholder="Введите заголовок доски"
        />
        <textarea
          v-model="editBoard.description"
          required
          placeholder="Введите описание доски"
        ></textarea>
        <button type="submit">Изменить</button>
        <button 
          type="button" 
          class="cancel-btn" 
          @click="closeEditModal"
        >
          Отмена
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'; 

    export default {
        data() {
    return {
      editBoard: {
        name: '',
        description: '',
      },
    };
  },
  computed: {
    ...mapGetters('boards', ['isEditModal']),
  },
  methods:{
    submitEdit() {
      this.$store.commit('boards/closeEditModal')
      this.$emit('edit-board', { ...this.editBoard });
      this.resetForm();
    },
    closeEditModal() {
        this.$store.commit('boards/closeEditModal');
        this.resetForm();
      },
      resetForm() {
      this.editBoard = { name: '', description: '' };
    },
  }
    }
</script>

<style scoped>
.window {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255 / 33%);
  backdrop-filter: blur(15px);
}

.window__container {
  display: flex;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 430px;
}

form {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
}

input[type="text"],
textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  resize: vertical;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #2d41a7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: darkblue;
}

.close-window {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  color: black;
  font-size: 24px;
}

.cancel-btn {
  padding: 10px 20px;
  background-color: rgb(255, 0, 64);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: darkred;
}
</style>