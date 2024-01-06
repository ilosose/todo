<template>
  <div
    v-if="task"
    class="task-item"
    draggable="true"
    @dragstart="startDrag"
    @dragend="endDrag"
  >
    <h3 class="task-item__title">{{ task.name }}</h3>
      <p class="task-item__description">{{ task.description }}</p>
      <div class="task-item__info">
        <div class="task-item__complexity complexity">
          <span
            v-for="dot in this.getComplexityDot(task.createdAt)" 
            :class="dot.tag"
            :key="dot.id"
            class="complexity__dot"
            ></span>
        </div>
        <div class="task-item__client">{{ task.createdAt }}</div>
      </div>
  </div>
</template>

<script>
  export default {
    props: {
      task: {
        type: Object,
        default: {},
      },
    },
    
    methods: {
      getComplexityDot(createdAt) {
        const currentDate = new Date();
        const inputTime = new Date(createdAt);
        const timeDiff = inputTime.getTime() - currentDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3000 * 14));

        if (daysDiff <= 7) {
          return [
            { tag: 'complexity__dot--high', id: 1 },
            { tag: 'complexity__dot--high', id: 2 },
            { tag: 'complexity__dot--high', id: 3 }
          ];
        } else if (daysDiff <= 14) {
          return [
            { tag: 'complexity__dot--medium', id: 4 },
            { tag: 'complexity__dot--medium', id: 5 }
          ];
        } else {
          return [
            { tag: 'complexity__dot--low', id: 6 }
          ];
        };
      },
      
      startDrag(event) {
        console.log(event);
        event.dataTransfer.setData('text/plain', this.task.id);
      },
    }
  }
</script>

<style scoped>
  .task-item {
    background-color: #f4f2ff;
    border-radius: 10px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%; 
  }
  
  .task-item__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .task-item__complexity {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
  
  .complexity__dot {
    width: 24px;
    height: 12px;
    flex-shrink: 0;
    background-color: #d9d9d9; 
    border-radius: 0px 10px 10px 24px;
    display: inline-block;
    margin-right: 5px;
  }
  
  .complexity__dot--medium {
    background-color: #FDE047; 
  }

  .complexity__dot--high {
    background-color: #e42c5f; 
  }
  
  .complexity__dot--low {
    background-color: #2ce49d; 
  }

  .complexity__dot--done {
    background-color: #2d41a7; 
  }
  
  .task-item__title {
    flex-grow: 1;
    font-weight: 600;
    color: #333;
  }

  .task-item__description {
    color: gray;
    font-size: 12px;
    margin: 10px 0;
  }
  
  .task-item__client {
    font-size: 14px;
    color: #4F46E5; 
    text-align: center;
  }

  .task-item__title:hover {
    cursor: pointer;
    opacity: .5;
  }
</style>