<template>
    <div class="modal"> 
    <h1 class="title__modal">Изменить доску</h1>
    <div class="modal__container">
      <form @submit.prevent="editColumnData">
        <input type="text"  required v-model="editColumn.name" placeholder="Новое название доски"/>
        <div class="buttons">
          <button type="button" class="cancel-button" @click="$emit('close-modal')">Отмена</button> 
          <button type="submit">Изменить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editColumn: {
        name: ''
      }
    }
  },

  methods: {
    editColumnData() {
      this.$emit('edit-column', { ...this.editColumn });
      this.resetForm();
    },

    resetForm() {
      this.editColumn = { name: '' };
    }
  }
}
</script>

<style scoped>
.modal {
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
  .buttons{
    padding-top: 10px;
  }
  .title__modal{
    position: absolute;
    color: whitesmoke;
    margin-bottom: 400px;
  }
  .modal__container {
    display: flex;
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 430px;
  }
  
  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 15px;
  }
  ::placeholder{
    padding-top: 5px;
  }

  input[type="text"],
  input[type="date"],
  textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  textarea {
    padding-bottom: 50px;
    resize: vertical; 
  }
  
  button[type="submit"] {
    padding: 10px 20px;
    background-color: rgb(32, 146, 99);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    float: right;
  }
  
  button[type="submit"]:hover {
    background-color: rgb(25, 116, 78);
  }
  
  .close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    text-decoration: none;
    color: rgb(0, 0, 0);
    font-size: 24px;
  }

  .cancel-button {
    padding: 10px 30px;
    background-color: rgb(155, 155, 155);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    float: left;

  }
  
  .cancel-button:hover { 
    background-color: gray;
  }
</style>