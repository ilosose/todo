<template>
  <div class="registration container">
    <h1 class="registration__title">Регистрация</h1>
    <form @submit.prevent="comparison" class="registration-form">
      <div class="registration-form__field">
        <label class="registration-form__label" for="name" >Имя</label>
        <input type="text" placeholder="Имя" class="registration-form__input" v-model="this.formRegistration.name" required minlength="5">
      </div>
      <div class="registration-form__field">
        <label class="registration-form__label" for="email">Почта</label>
        <input type="email" placeholder="email@inbox.com" class="registration-form__input" v-model="this.formRegistration.email" required>
      </div>
      <div class="registration-form__field">
        <label class="registration-form__label" for="password">Пароль</label>
        <input type="password" placeholder="Пароль" class="registration-form__input" v-model="this.formRegistration.password" required>
      </div>
      <div class="registration-form__field">
        <label class="registration-form__label" for="password">Повторить пароль</label>
        <input type="password" placeholder="Повторить пароль" class="registration-form__input" v-model="this.formRegistration.confermPassword" required>
      </div>
      <div v-if="error" class="EerrorPassword"> {{ error }}</div>
      <button type="submit" class="registration-form__submit">Зарегистрароваться</button>
    </form>
    <RouterLink to="/auth" class="registration-form__redirect">Авторизация</RouterLink>
  </div>
</template>

<script>
import axios from '../../utils/axios';

export default {
  data() {
    return {
      formRegistration: {
        name: '',
        email: '',
        password: '',
        confermPassword: '',
      },
      error: null
    }
  },

  methods: {
    comparison(){
      if(this.formRegistration.password == this.formRegistration.confermPassword){
       this.submit()
       this.error = null
      }else
      this.error = 'Пароли не совпадают!'
    },

    async submit() {
      if(this.formRegistration.name != '' && 
        this.formRegistration.email != '' && 
        this.formRegistration.email != '' && 
        this.formRegistration.password != '' && 
        this.formRegistration.confermPassword != '') {

        const formData = {
          ...this.formRegistration
        }

        await axios
          .put('auth/signup', {formData})
          .then((res) => {
            this.$router.push({ name: 'auth' })
          })
          .catch((err) => {
            alert(err.response.data.cause)
          })
        
      };
    },

    resetForm() {
      this.formRegistration = { name: '', email: '', password: '', confermPassword: '' };
    },
  }, 
};
</script>
<style scope>
.registration-form{
  background-color: gainsboro;
  padding: 10px;
  border-radius: 10px;
}
  .EerrorPassword{
    padding-left: 10px;
    color: red;
    padding-bottom: 10px;
    font-weight: 600;
  }
  .registration {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: transparent;
  }

  .registration__title {
    color: black;
    font-family: 'Andale Mono', monospace;
    text-align: center;
    font-size: 50px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .registration-form__field {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5px;
    margin: 10px 0;
  }

  .registration-form__label {
    font-family: 'Andale Mono', monospace;
    color: black;
    margin-left: 15px;
    text-align: start;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
  }

  .registration-form__input {
    border-radius: 10px;
    background: ghostwhite;
    border: solid 2px grey;
    padding: 10px 25px;
    width: 100%;
    height: 45px;
    flex-shrink: 0;
  }

  .registration-form__submit {
    width: 100%;
    height: 45px;
    margin-bottom: 10px;
    border-radius: 10px;
    background: gainsboro;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);
    color: black;
    font-weight: 600;
    font-family: 'Andale Mono', monospace;
    border:solid 2px black;
  }

  .registration-form__submit:hover {
    background-color: whitesmoke;
    transform : translate(0, 1px);
    cursor: pointer;
  }

  .registration-form__redirect {
    font-weight: 600;
    padding-top: 10px;
    color: slategray;
    font-family: 'Andale Mono', monospace;
  }

  .registration-form__redirect:hover {
    color: black;
    transform : translate(0, 1px);
    cursor: pointer;
  }
</style>