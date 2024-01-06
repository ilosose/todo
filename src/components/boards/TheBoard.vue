<template>

  <section class="board-item">
    <div class="board-item__header">
      <h2 class="board-item__title" @click.prevent="openColumn(board.id)">{{ board.name }}</h2>
    </div>
    <div class="board-item__description">
      <p>{{ board.description }}</p>
    </div>
    <div class="board-item__info">
        <div class="board-item__createAt">
          <h3>Создана: {{ board.createdAt }}</h3>
        </div>
        <div class="board-item__updateAt">
          <h3>Обновлена: {{ board.updatedAt }}</h3>
        </div>  
    </div>
  </section>

</template>
<script>
import router from '@/router';
export default {
  props: {
    board: {
      type: Object,
      default: {}
    },
  },

  data() {
    return {
    }
  },

  methods: {
   async openColumn(boardId) {
      await localStorage.setItem('boardId', boardId);
      await router.push('/todo');
    },
  },
  
}
</script>
<style scope>

  .board-item__title:hover {
    color: #13c4bb;
    cursor: pointer;
  }
  
</style>