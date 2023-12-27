<template>

  <section class="board-item">
    <div class="board-item__header">
      <h2 class="board-item__title" @click.prevent="openColumns(board.id)">{{ board.name }}</h2>
    </div>
    <div class="board-item__description">
      <p>{{ board.description }}</p>
    </div>
    <div class="board-item__info">
        <div class="board-item__createAt">
          {{ board.createdAt }}
        </div>
        <div class="board-item__updateAt">
          {{ board.updatedAt }}
        </div>  
    </div>
  </section>

</template>
<script>
import router from '@/router';
import { mapActions } from 'vuex';
export default {
  props: {
    board: {
      type: Object,
      default: {}
    },
  },


  methods: {
    ...mapActions([
      'openColumnsByBoard',
      'getTasks'
    ]),

   async openColumns(boardId) {
      await this.openColumnsByBoard(boardId);
      await router.push('/');
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