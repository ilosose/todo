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
        <div class="header__user-icon">{{ userIcon }}</div>
      </div>
    </div>
    <div class="table"></div>
  </header>
</template>

<script>

export default {
  data() {
    return {
      title: "Kanban Board",
      userIcon: "К.П",
    };
  },

  methods:{
    openWindow(){
      this.$store.commit('boards/openModal');
    }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}

.header__title {
  font-weight: 300;
}

.header__option {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header__user-icon {
  width: 40px;
  height: 40px;
  background-color: #d9d9d9;
  border-radius: 50%;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.header__icon:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>
