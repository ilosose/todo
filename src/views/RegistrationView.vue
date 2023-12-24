<template>
  <div class="registration container">
    <button><RouterLink to="/auth">Авторизация</RouterLink></button>
    <form @submit.prevent="signUp" class="registration-form">
      <label class="registration-form__label" for="password">Имя</label>
      <input type="text" placeholder="Имя" class="registration-form__input">
      <label class="registration-form__label" for="password">Почта</label>
      <input type="text" placeholder="email@inbox.com" class="registration-form__input">
      <label class="registration-form__label" for="password">Пароль</label>
      <input type="password" placeholder="Пароль" class="registration-form__input">
      <label class="registration-form__label" for="password">Повторить пароль</label>
      <input type="password" placeholder="Повторить пароль" class="registration-form__input">
      <button type="submit">Зарегистрароваться</button>
    </form>
  </div>
</template>
<script>
import { RouterLink } from 'vue-router'
export default {
  data() {
    return {
      formRegistration: {
        name: '',
        email: '',
        password: '',
        confermPassword: ''
      }
    }
  },

  methods: {
    signUp() {
      this.$emit('reg', { ...this.formRegistration })
      this.resetForm()
    },

    resetForm() {
      this.formRegistration = { name: '', email: '', password: '', confermPassword: '' }
    }
  } 
}
</script>
<style scope>
  .registration {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
  .registration-form__input {
    padding: 10px;
    margin-left: 5px;
    border: none;
    border-radius: 5px;
  }
</style>