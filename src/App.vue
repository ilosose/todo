<template>
  <RouterView />
</template>

<script >
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  },

  mounted() {  
    if(!this.isAuthenticated) {
      this.$router.push({ name: 'registration'});
      return
    }
    if(this.$route.name === null) {
      this.$router.push({ name: 'boards' });
      return
    }
    this.$router.push({ name: 'boards' });
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
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath opacity=".5" d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"/%3E%3Cpath d="M6 5V0H5v5H0v1h5v94h1V6h94V5H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
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
