<template>
  <div class="auth container">
    <h1 class="auth__title">Авторизация</h1>
    <form class="auth-form" @submit.prevent="submit">
      <div class="auth-form__field">
        <label class="auth-form__label" for="email">Почта</label>
        <input class="auth-form__input" placeholder="email" type="email" v-model="formAuth.email">
      </div>
      <div class="auth-form__field">
        <label class="auth-form__label" for="password">Пароль</label>
        <input class="auth-form__input" placeholder="password" type="password" v-model="formAuth.password">
      </div>
      <div class="auth-form__field auth-form__field--remember-me">
        <input class="auth-form__checkbox" type="checkbox" id="remember-me">
        <label class="auth-form__label" for="remember-me">Запомнить меня.</label>
      </div>
      <button class="auth-form__submit" type="submit">Войти</button>
    </form>
    <RouterLink class="auth-form__redirect" to="/registration">Регистрация</RouterLink>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import axios from '../../utils/axios';

  export default {
    data() {
      return {
        formAuth: {
          email: '',
          password: '',
        },
      };
    },

    methods: {
      async submit() {
        const formData = {
          ...this.formAuth
        };
      
        await axios
          .post('auth/signin', {formData})
          .then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            this.$router.push({ name: 'boards' });
          })
          .catch((err) => {
            alert(err.response.data.cause);
            this.$router.push({ name: 'auth' });
          })
        
        await this.resetForm();
      },

      resetForm() {
        this.formAuth = { email: '', password: '' };
      },
    },
  };
</script>

<style scoped>

  .auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #2B1887;

  }
  .auth__title {
    color: #f4f2ff;
    text-align: center;
    font-size: 50px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .auth-form__field {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5px;
    margin: 15px 0;
  }

  .auth-form__field--remember-me {
    flex-direction: row;
    gap: 0px;
    align-items: center;
  }

  .auth-form__label {
    color: #f4f2ff;
    margin-left: 15px;
    text-align: start;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
  }

  .auth-form__input {
    border-radius: 10px;
    background: #D5CCFF;
    border: none;
    padding: 10px 25px;
    width: 100%;
    height: 45px;
    flex-shrink: 0;
  }

  .auth-form__checkbox {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: #5D5FEF;
    width: 15px;
    height: 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
  }

  .auth-form__checkbox:checked {
    background-color: #5D5FEF;
  }

  .auth-form__checkbox:checked::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 2px;
    width: 3px;
    height: 6px;
    border: solid #f4f2ff;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  .auth-form__submit {
    width: 100%;
    height: 45px;
    margin-bottom: 10px;
    border: none;
    border-radius: 10px;
    background: #5D5FEF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);
    color: #f4f2ff;
  }
  .auth-form__submit:hover {
    background: #13c4bb;
    cursor: pointer;
  }

  .auth-form__redirect {
    padding-inline: 70px;
    border-radius: 10px;
    font-weight: 600;
    color: lightsteelblue;
    
  }

  .auth-form__redirect:hover {
    color: whitesmoke;
    cursor: pointer;
  }
</style>