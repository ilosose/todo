<template>
  <div class="registration container">
    <h1 class="registration__title">Регистрация</h1>
    <form @submit.prevent="submit" class="registration-form">
      <div class="registration-form__field">
        <label class="registration-form__label" for="password">Имя</label>
        <input type="text" placeholder="Имя" class="registration-form__input">
      </div>
      <div class="registration-form__field">
        <label class="registration-form__label" for="password">Почта</label>
        <input type="text" placeholder="email@inbox.com" class="registration-form__input">
      </div>
      <div class="registration-form__field">
        <label class="registration-form__label" for="password">Пароль</label>
        <input type="password" placeholder="Пароль" class="registration-form__input">
      </div>
      <div class="registration-form__field">
        <label class="registration-form__label" for="password">Повторить пароль</label>
        <input type="password" placeholder="Повторить пароль" class="registration-form__input">
      </div>
      <button type="submit" class="registration-form__submit">Зарегистрароваться</button>
    </form>
    <button class="registration-form__submit-redirect"><RouterLink to="/auth">Авторизация</RouterLink></button>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      formRegistration: {
        name: '',
        email: '',
        password: '',
        confermPassword: '',
      }
    }
  },

  methods: {
    ...mapActions([
      'signup',
    ]),

    async submit() {
      if(this.formRegistration.name != '' && this.formRegistration.email != '' && this.formRegistration.email != '', this.formRegistration.password != '' && this.formRegistration.confermPassword != '') {
        const formData = {
        formData: {
          ...this.formRegistration
          },
        };

        await signup(formData);

        await this.resetForm();

        await router.push('/auth');
      };
    },
      

    resetForm() {
      this.formRegistration = { name: '', email: '', password: '', confermPassword: '' };
    },
  }, 
};
</script>
<style scope>
  .registration {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background: #2B1887;

  }

  .registration__title {
  color: #f4f2ff;

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
    margin: 15px 0;
  }

  .registration-form__label {
    color: #f4f2ff;
    margin-left: 15px;
    text-align: start;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
  }

  .registration-form__input {
    border-radius: 10px;
    background: #D5CCFF;
    border: none;
    padding: 10px 25px;
    width: 100%;
    height: 45px;
    flex-shrink: 0;
  }

  .registration-form__submit {
    width: 100%;
    height: 45px;
    margin-bottom: 10px;
    border: none;
    border-radius: 10px;
    background: #5D5FEF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);
    color: #f4f2ff;
  }
  .registration-form__submit:hover {
    background: #13c4bb;
    cursor: pointer;
  }
</style>