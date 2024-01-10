<template>
  <div class="board" v-if="boards">
    <section v-for="board in boards" class="board-item" :key="board.id">
      <div class="board-item__header">
        <h2 class="board-item__title" @click.prevent="openColumn(board.id)">
          {{ board.name }}
        </h2>
      </div>
      <div class="board-item__description">
        <p>{{ board.description }}</p>
      </div>
      <div class="board-item__info">
        <div class="board-item__createAt">
          <h4>Email: {{ board.owner.email }}</h4>
        </div>
        <div class="board-item__updateAt">
          <h4>Имя: {{ board.owner.name }}</h4>
        </div>
      </div>
      <div>
        <button class="board-item__delete" @click.prevent="deleteBoard(board.id)">Удалить</button>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "../../utils/axios";
export default {
  computed: {
    ...mapGetters("boards", ["boards"]),
  },

  methods: {
    ...mapActions("boards", ["getBoards"]),

    async deleteBoard(boardId) {
      const userId = localStorage.getItem("userId");
      await axios.delete(`user/${userId}/boards/${boardId}`).catch((err) => {
        console.log(err);
      });

      await this.getBoards();
    },

    async openColumn(boardId) {
      console.log(boardId);
      await this.$router.push({ name: "todo", params: { boardId: boardId } });
    },
  },
};
</script>
<style scope>

.board {
  display: flex;
  padding: 40px;
  align-items: flex-start;
  gap: 40px;
  margin: 10px 0;
}

.board-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
  padding: 14px;
  border-radius: 12px;
  background-color: #d5ccff;
  color: #2b1887;
}

.board-item__title:hover {
  color: #13c4bb;
  cursor: pointer;
}
</style>
