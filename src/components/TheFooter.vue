<template>
  <footer class="footer">
    <p class="footer__text">{{ footerText }}</p>
  </footer>  
</template>

<script>
  export default {
    data() {
      return {
        footerText: 'To-Do-List-Kanban'
      }
    }
  }
</script>

<style>
.footer{
  background-color: gainsboro;
  color: black;
  text-decoration: underline;
  box-shadow: -1px -2px 20px black;
}

</style>