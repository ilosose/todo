<template>
  <div class="modal">
    <div class="modal__container">
      <form @submit.prevent="submitAdmin">
        <input type="text" v-model="usersearch.name" placeholder="Поиск пользователя" />
      </form>
      <div v-for="user in users.items" :key="user.id">
        <div class="accordion" >
          <input class="email__users" type="radio" name="radio-a" :id="user.id"  checked  />
          <label class="accordion-label" @click="open(user.id)" :for="user.id">
            <div class="ava">{{ user.id }}</div>
            <div>{{ user.email }}</div>
          </label>
        </div>
        <div class="hideContent accordions" :ref="'hideContent-' + user.id" :class="{'accordiooon': isHide == true}" >
          <div class="content" v-if="isHide == true" >
            <input class="switcher__input" type="checkbox" :id="user.id" />
            <label class="switcher__label" :for="user.id"></label>
            <p>NeforOlegovich</p>
          </div>
        </div>
      </div>
      <div class="buttons">
          <button type="button" class="cancel-button" @click="closemodal">Закрыть</button>
          <button type="submit" @click="submitAdmin">Применить</button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    users: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      usersearch: {
        name: "",
      },
      isHide: false,
    };
  },
  methods: {
    submitAdmin() {
      this.$emit("user-search", { ...this.usersearch });

    },

    closemodal() {
      this.$emit("close-admin-modal");
      this.resetform();
    },

    resetform() {
      this.usersearch = { name: "" };
    },
    open(userid) {
      this.isHide = !this.isHide
      const bodyElement = this.$refs['hideContent-'+userid]
      console.log(userid)
      console.log(this.isHide)
    },
  },
};
</script>

<style scoped>
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
  margin-bottom: 20px;
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
  margin-bottom: 20px;
  display: flex;
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
