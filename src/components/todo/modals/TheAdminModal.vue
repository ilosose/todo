<template>
  <div class="modal" >
    <div class="modal__container">
      <form @submit.prevent="submitAdmin">
        <input type="text" v-model="name" placeholder="Поиск пользователя" />
      </form>
      <div v-for="user in users" :key="user.id">
        <div class="accordion">
          <input class="email__users" type="radio " name="radio-a" id="user"  checked  />
          <label class="accordion-label" @click="open(user.id)"  for="user">
            <div class="ava">{{ user.id }}</div>
            <div>{{ user.email }}</div>
          </label>
        </div>
        <div class="hideContent accordions" :ref="'hideContent-' + user.id">
          <div class="content">
            <input class="switcher__input" @click="permissionsManageBoard(user.id)" :ref="user.id + 789" type="checkbox" :id="user.id + 789" />
            <label class="switcher__label" :for="user.id + 789"></label>
            <p @click="close(user.id)">Управление досками</p>
          </div>
          <div class="content">
            <input class="switcher__input" @click="permissionsManegeStatuses(user.id)" :ref="user.id + 123" type="checkbox" :id="user.id + 123" />
            <label class="switcher__label" :for="user.id + 123"></label>
            <p @click="close(user.id)">Управление статусами</p>
          </div>
          <div class="content">
            <input class="switcher__input" @click="permissionsManageUsers(user.id)" :ref="user.id + 321" type="checkbox" :id="user.id + 321" />
            <label class="switcher__label" :for="user.id + 321"></label>
            <p @click="close(user.id)">Управление пользователями</p>
          </div>
        </div>
      </div>
      <div class="buttons">
          <button type="button" class="cancel-button" @click="closemodal">Закрыть</button>
          <button type="submit" @click="submitAdmin">Поиск</button>
        </div>
    </div>
  </div>
</template>
<script>
import axios from '../../../utils/axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('columns', ['boardId', 'users'])
  },
  data() {
    return {
      name: '',
    };
  },

  methods: {
    ...mapActions('columns', ['getUsers']),

    submitAdmin() {
      const inputUser = this.users.filter((e) =>  { return e.name === this.name || e.email === this.name } )
      this.$store.commit('columns/setUsers', inputUser)
    },

    async closemodal() {
      this.$emit("close-admin-modal");
      this.resetform();
      await this.getUsers(this.boardId)
    },

    resetform() {
      this.usersearch = { name: '' };
    },

    async permissionsManageBoard(userId) {

      const checkbox = this.$refs[userId + 789]
      if(checkbox[0].checked == true) {
        await axios
          .put(`boards/${this.boardId}/users/${userId}/permissions/manage-board`)
          .catch((err) => {
            console.log(err.response.data.cause)
          })

        await axios
          .put(`boards/${this.boardId}/users/${userId}/permissions/delete-board`)
          .catch((err) => {
            console.log(err.response.data.cause)
          })
      } else {
        await axios
          .delete(`boards/${this.boardId}/users/${userId}/permissions/delete-board`)
          .catch((err) => {
            console.log(err.response.data.cause)
          })

        await axios
          .delete(`boards/${this.boardId}/users/${userId}/permissions/manage-board`)
          .catch((err) => {
            console.log(err.response.data.cause)
          })
      }
      
    },

    async permissionsManegeStatuses(userId) {
      const checkbox = this.$refs[userId + 123]
      if(checkbox[0].checked == true) {
        await axios
          .put(`boards/${this.boardId}/users/${userId}/permissions/manage-board-statuses`)
          .catch((err) => {
            console.log(err.response.data.cause)
          })

        await axios
          .put(`boards/${this.boardId}/users/${userId}/permissions/delete-board-statuses`)
          .catch((err) => {
            console.log(err.response.data.cause)
          })
      } else {
        await axios
          .delete(`boards/${this.boardId}/users/${userId}/permissions/delete-board-statuses`)
          .catch((err) => {
            console.log(err.response.data.cause)
          })

        await axios
          .delete(`boards/${this.boardId}/users/${userId}/permissions/manage-board-statuses`)
          .catch((err) => {
            console.log(err.response.data.cause)
          })
      }
        
    },

    async permissionsManageUsers(userId) {
      const checkbox = this.$refs[userId + 321]
      if(checkbox[0].checked == true) {
        await axios
          .put(`boards/${this.boardId}/users/${userId}/permissions/manage-board-users`)
          .catch((err) => {
            console.log(err.response.data.cause)
          })
      } else {
        await axios
          .delete(`boards/${this.boardId}/users/${userId}/permissions/manage-board-users`)
          .catch((err) => {
            console.log(err.response.data.cause)
          })
      }
    },

    open(userId) {
      const bodyElement = this.$refs['hideContent-'+ userId]
      bodyElement.forEach(element => {
        element.style.transition = 'all 0.5s'
        element.style.height = '90px'
      });
    },
    close(userId) {
      const bodyElement = this.$refs['hideContent-'+ userId]
      bodyElement.forEach(element => {
        element.style.transition = 'all 0.5s'
        element.style.height = '0px'
      });
    },
  },
};
</script>

<style scoped>
p{
  padding: 5px;
}
.switcher__label {
  float: right;
  position: absolute;
}

.switcher__input {
  display: none;
}

.switcher__input:checked+.switcher__label {
  color: #000;
}

.switcher__input:checked+.switcher__label:before {
  background-color: seagreen;
}

.switcher__input:checked+.switcher__label:after {
  transform: translateX(23px);
}

.switcher__input:checked+.switcher__label:active:after {
  transform: translateX(12px);
}

.switcher__input:checked+.switcher__label:active:before {
  background-color: #4C9900;
}

.switcher__label {
  display: inline-block;
  vertical-align: top;
  padding-left: 50px;
  font-size: 14px;
  color: #ccc;
  cursor: pointer;
  position: relative;
  transition: color .1s linear;
}

.switcher__label:before {
  content: "";
  display: block;
  width: 45px;
  height: 22px;
  background-color: #e5e5e5;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: background-color .1s linear;
}

.switcher__label:after {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 1px;
  z-index: 2;
  transition: transform .2s linear;
}

.switcher__label:active:after {
  transform: translateX(12px);
}

.switcher__label:active:before {
  background-color: #4C9900;
}


input:checked+.accordion-label::after {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}












.ava {
  text-align: center;
  margin: 5px 5px;
  background-color: seagreen;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.email__users {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.hideContent {
  background: whitesmoke;
  color: #000;
  width: auto;

}
.accordions {
  overflow: hidden;
  height: 0px;
  transition: all 0.5m;
}

.accordiooon {
  transition: all 0.5s;
  height: 50px;
}


.accordion-label {
  display: flex;
  margin-top: 10px;
  color: #000;
  border-radius: 10px 10px 0px 0px;
  background: rgb(100, 155, 100);
  font-weight: bold;
  cursor: pointer;
  font-size: 20px;
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

.buttons {
  padding-top: 10px;
}

.modal__container {
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
  margin-bottom: 10px;
}



input,
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
