<template>
  <div class="modal"> 
  <div class="modal__container">
    <form @submit.prevent="searchUser">
      <input type="text"  required v-model="name" placeholder="Поиск Пользователя"/>
      <div class="buttons">
        <button type="button" class="cancel-button" @click="$emit('close-modal')">Отмена</button> 
        <button type="submit">Найти</button>
      </div>
      <div class="content" v-if="users">
      <div v-for="user in users.items" :key="user.id">
        <div>
          <p style="color: black;">{{ user.email }}</p>
          <button class="add__users" @click="addUser(user.id)">Добавить пользователя</button>
        </div>
      </div>
    </div>
    </form>
  </div>
</div>
</template>

<script>
import axios from '../../../utils/axios';
import { mapActions, mapGetters } from 'vuex';
export default {
data() {
  return {
    name: '',
    users: null,
  }
},

watch: {
  async name(input) {
    if(input.length >= 5) {
      await axios
        .get(`users/match?email=${this.name}`)
        .then((res) => {
          this.users = res.data
        })
        .catch((err) => {
          console.log(err.response.data.cause)
        })
    }  
  }
},

computed: {
  ...mapGetters('columns', ['boardId'])
},

methods: {
  ...mapActions('columns', ['getUsers']),
  async searchUser() {
      await axios
        .get(`users/match?email=${this.name}`)
        .then((res) => {
          this.users = res.data
        })
        .catch((err) => {
          console.log(err.response.data.cause)
        })
  },

  async addUser(userId) {
    const dataId = []
    dataId.push(userId)
    const formData = {
      ids: dataId
    }
    await axios
      .post(`boards/${this.boardId}/users`, {formData})
      .then((res) => {
        alert('Пользователь добавлен!')
      })
      .catch((err) => {
        console.log(err.response.data.cause)
      })

    await this.getUsers(this.boardId)
  },

  resetForm() {
    this.userData = { name: '' };
  },
}
}
</script>

<style scoped>
.content{
  background-color: #ddd;
  border-radius: 10px;
  padding: 10px;
}
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

.modal__container {
  display: flex;
  background-color: #eeeeee;
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
  background-color: hsl(147, 92%, 45%);
    box-shadow: 0 2px 2px rgb(111, 111, 111);
    transition: background-color .4s;
    font-family: 'Andale Mono', monospace;
    border: 1px solid black;
    padding: 10px 30px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 10px;
    color: black;
    float: right;
}

button[type="submit"]:hover {
  background-color:hsl(147, 73%, 42%);
  transform : translate(0, 1px);
    cursor: pointer;
}

.cancel-button {
  background-color: #eeeeee;
    box-shadow: 0 2px 2px rgb(111, 111, 111);
    transition: background-color .4s;
    font-family: 'Andale Mono', monospace;
    border: 1px solid black;
    padding: 10px 30px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 10px;
    color: black;
}

.cancel-button:hover { 
  background-color:#dddddd;
  transform : translate(0, 1px);
    cursor: pointer;
}
.add__users{
  padding: 4px;
  border: solid 1px black;
  box-shadow: 0 2px 2px rgb(111, 111, 111);
  font-family: 'Andale Mono', monospace;
  transition: background-color .4s;
  font-size: 15px;
  margin: 5px 0px 20px 0px;
    font-weight: 700;
  border-radius: 7px;
}
</style>