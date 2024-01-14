<template>
  <div class="modal">
    <div class="modal__container">
      <form @submit.prevent="submitAdmin">
        <input
          type="text"
          v-model="usersearch.name"
          placeholder="Поиск пользователя"
        />
        <div class="accordion">
          <input
            class="email__users"
            type="radio"
            name="radio-a"
            id="check1"
            checked
          />
          <label class="accordion-label" for="check1">
            <div class="ava">I.G</div>
            Ivanov@gmail.com
          </label>
          <div class="accordion-content">
            <div>
              <input class="switcher__input" type="checkbox" id="switcher" />
              <label class="switcher__label" for="switcher"></label>
              <p>NeforOlegovich</p>
            </div>
          </div>
          <div class="accordion-content">
            <div>
              <input class="switcher__input" type="checkbox" id="switcher1" />
              <label class="switcher__label" for="switcher1"></label>
              <p>NeforOlegovich</p>
            </div>
          </div>
          <div class="accordion-content">
            <div>
              <input class="switcher__input" type="checkbox" id="switcher2" />
              <label class="switcher__label" for="switcher2"></label>
              <p>NeforOlegovich</p>
            </div>
          </div>
        </div>
        <div class="accordion">
          <input class="email__users" type="radio" name="radio-a" id="check2" />
          <label class="accordion-label" for="check2">
            <div class="ava">P.G</div>
            Penta@gmail.com
          </label>
          <div class="accordion-content">
            <div>
              <input class="switcher__input" type="checkbox" id="switcher4" />
              <label class="switcher__label" for="switcher4"></label>
              <p>proreka@gmail.com</p>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button type="button" class="cancel-button" @click="closemodal">
            Закрыть
          </button>
          <button type="submit">Применить</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      usersearch:{
        name: '',
      }
    }
  },
  methods: {
    submitAdmin() {
      this.$emit('usersearch', {...this.usersearch});
      console.log(this.usersearch.name)
      this.resetform()
    },

    closemodal() {
      this.$emit('close-admin-modal');
      this.resetform()
    },

    resetform(){
      this.usersearch = {name: ''}
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

.switcher__input:checked + .switcher__label {
  color: #000;
}

.switcher__input:checked + .switcher__label:before {
  background-color: seagreen;
}

.switcher__input:checked + .switcher__label:after {
  transform: translateX(23px);
}

.switcher__input:checked + .switcher__label:active:after {
  transform: translateX(12px);
}

.switcher__input:checked + .switcher__label:active:before {
  background-color: #4c9900;
}

.switcher__label {
  display: inline-block;
  vertical-align: top;
  padding-left: 50px;
  font-size: 14px;
  color: #ccc;
  cursor: pointer;
  position: relative;
  transition: color 0.1s linear;
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
  transition: background-color 0.1s linear;
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
  transition: transform 0.2s linear;
}

.switcher__label:active:after {
  transform: translateX(12px);
}

.switcher__label:active:before {
  background-color: #4c9900;
}

input:checked + .accordion-label::after {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

input:checked ~ .accordion-content {
  max-height: 100vh;
  padding: 18px;
}

.accordion-label:after {
  width: 16px;
  height: 16px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.accordion-content {
  max-height: 0px;
  padding: 0 16px;
  color: black;
  background: whitesmoke;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.accordion-content p {
  margin: 0;
  color: black;
  font-size: 18px;
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

.accordion {
  width: 100%;
  color: black;
  overflow: hidden;
  margin-bottom: 16px;
}

.accordion:last-child {
  margin-bottom: 0;
}

.accordion-label {
  display: flex;
  -webkit-box-pack: justify;
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

::placeholder {
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
