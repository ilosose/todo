<template>

  <section class="board-item">
    <div class="board-item__header">
      <h2 class="board-item__title">{{ board.name }}</h2>
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
export default {
  props: {
    board: {
      type: Object,
      default: {}
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