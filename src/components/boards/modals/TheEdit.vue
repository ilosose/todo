<template>
    <div class="window">
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

export default {
  data() {
    return {
      editBoard: {
        name: '',
        description: '',
      },
    };
  },

  methods:{
    submitEdit() {
      this.$emit('edit-board', { ...this.editBoard });
      this.resetForm();
    },

    closeEditModal() {
      this.$emit('close-edit-modal')
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
  z-index: 1;
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