<template>
  <header class="header">
    <div class="container header__container">
      <h1 class="header__title">{{ title }}</h1>
      <div class="header__option">
        <img
          v-if="isBoardPage"
          @click="openWindow"
          src="./assets/img/header/plus.svg"
          alt="header__icon--add"
          class="header__icon header__icon--add"
        />
        <button @click.prevent="resetLocalStorageButton" class="exit">Выйти</button>
      </div>
    </div>
    <div class="table"></div>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "Kanban Board",
      userIcon: "К.П",
    };
  },

  methods:{
    ...mapActions(['resetLocalStorage']),

    openWindow(){
      this.$store.commit('boards/openModal');
    },

    async resetLocalStorageButton() {
        await this.resetLocalStorage();
        await this.$router.push({ name: 'registration' })
      },
  },
    
  computed: {
    isBoardPage() {
      return this.$route.path === "/boards";
    },
  },
};
</script>

<style scoped>
header {
  margin-top: 10px;
}

.header__container {
  background-color: gainsboro;
  box-shadow: 3px 3px 10px black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}

.header__title {
  color: black;
  font-weight: 300;
}

.header__option {
  display: flex;
  align-items: center;
  gap: 15px;
}

  .exit:hover {
    background-color:#dddddd;
  transform : translate(0, 1px);
    cursor: pointer;
  }
  .exit{
    background-color: #eeeeee;
    box-shadow: 0 2px 2px rgb(111, 111, 111);
    transition: background-color .4s;
    font-family: 'Andale Mono', monospace;
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
    color: black;
  }

.header__icon:hover {
  cursor: pointer;
  opacity: 0.4;
}
</style>
