<template>
  <div class="board" v-if="boards">
    <section v-for="board in boards" class="board-item" :key="board.id" @click.prevent="openColumn(board.id)">
      <div class="board-item__header">
        <h2 class="board-item__title">
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
      <div class="btn-group">
        <button class="board-item__buttons" @click.prevent="openEditWindow($event, board.id)">Изменить</button>  
        <button class="board-item__buttons" @click.prevent="deleteBoard($event, board.id)">Удалить</button>
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

    async deleteBoard(event, boardId) {
      event.stopPropagation();
      const userId = localStorage.getItem("userId");
      await axios.delete(`user/${userId}/boards/${boardId}`).catch((err) => {
        console.log(err);
      });

      await this.getBoards();
    },
    
    openEditWindow(event, boardId){
      event.stopPropagation();
      this.$emit('edit-board', boardId);
    },
    
    async openColumn(boardId) {
      await this.$router.push({ name: 'todo', params: { boardId: boardId}});
    },
  },
}

</script>
<style scope>

p, h4, h2{
 font-family: 'Andale Mono', monospace;
 font-weight: 800;

}

.board {
    display: flex;
    padding: 40px;
    align-items: flex-start;
    justify-content: center;
    gap: 40px;
    margin: 10px 0;
  }

  .board-item__title{
    width: 100%;
    text-decoration:underline;

  }

  .board-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    gap: 24px;
    padding: 14px;
    border-radius: 8px;
    background-color: rgb(240, 240, 240);
    border-bottom: 3px solid grey;
    color: black;
    box-shadow: 0 8px 10px black;
    transition: 0.3s;
  }


  .board-item:hover {
    background-color: lightgray;
    color: black;
    transform: translate(1.2px, 1.2px);
    cursor: pointer;
  }

.multi-button {
  border-radius:6px;
  font-size:0;
  box-shadow: 6px 6px 2px 1px rgba(0, 0, 255, .2);
}

.board-item__buttons {
  font-family: Lato, sans-serif;
  outline:none;
  display:inline-flex;
  place-items: center;
  font-family: Lato, sans-serif;
  font-weight:bold;
  background-color:#eeeeee;
  border: 1px solid black;
  color:black;
  cursor:pointer;
  padding:10px;
  border-radius: 10px;
  margin: 0 5px;  
  transition: background-color .4s;
  box-shadow: 0 2px 2px rgb(111, 111, 111);
  font-family: 'Andale Mono', monospace;
}

.board-item__buttons:hover {
  background-color:#dddddd;
  transform : translate(0, 1px);
}

.board-item__buttons:active {
  background-color:#cccccc;
  transform : translate(0, 2px);
}


.outer-left {
   border-radius : 6px 0 0 6px;
}

.outer-right {
  border-radius : 0 6px 6px 0; 
}
 
</style>
