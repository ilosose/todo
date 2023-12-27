<template>
  <RouterView />
</template>

<script >
import { RouterView } from 'vue-router';
</script>

<style>
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
