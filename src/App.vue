<template>
  <RouterView />
</template>

<script >
import { RouterView } from 'vue-router';
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  },

  mounted() {
    if (this.$route.path === '/') {
      if (!this.isAuthenticated) {
        this.$router.push({ name: 'registration'});
        return;
      };
    }
  }
}
</script>

<style>
  @media screen and (max-width: 768px) {
      .container {
          max-width: 540px;
          margin: 0;
          padding: 0;
      }
  }

  @media screen and (min-width: 576px) {
      .container {
          max-width: 540px;
      }
  }

  @media screen and (min-width: 768px) {
      .container {
          max-width: 720px;
      }
  }

  @media screen and (min-width: 992px) {
      .container {
          max-width: 960px;
      }

      .kanban__column {
          flex: 0 0 calc(33.333% - 20px);
      }
  }

  @media screen and (max-width: 992px) {

      .kanban {
          width: 100%;
          flex-wrap: wrap;
          flex-direction: column;
          padding: 20px;
      }

      .kanban__column {
          width: 100%;
      }

  }

  @media screen and (min-width: 1200px) {
      .container {
          max-width: 1140px;
      }
  }

  @media screen and (min-width: 1400px) {
      .container {
          max-width: 1320px;
      }
  }

  * {
    font-family: 'Montserrat', sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body, #app {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #2B1887;
    color: white;
    min-height: 100vh;
    min-width: 380px;
  }

  html {
    min-width: 380px;
  }

  .header__container,
  footer {
    background-color: #1C0E5E;
    text-align: center;
    padding: 10px 0;
  }

  .header__title,
  .footer__text {
    margin: 0;
    padding: 10px 0;
  }

  .container {
    width: 100%;
    padding: 0 15px;
    margin: 0 auto;
  }
</style>
