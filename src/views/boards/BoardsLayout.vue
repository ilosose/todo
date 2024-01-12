<template>
  <the-header />
  <RouterView />
  <the-footer />
</template>
<script>
import { RouterView } from 'vue-router';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
export default {
  components: {
    TheHeader,
    TheFooter,
  },
  
  created() {

  },
}
</script>
<style>
  
</style>