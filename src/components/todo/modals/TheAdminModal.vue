<template>
    <div class="modal"> 
    <h1 class="title__modal">Админ меню</h1>
    <div class="modal__container">
      <form >
        <input type="text"  required  placeholder="Поиск пользователя"/>
        <div class="users_name">
          <div class="accordion__item" href="#item1">  
          <div class="ava">
          </div>
          <div class="accordion__item__title">ivan@ivan.ru
          </div>
          </div>
          <div class="accordion__item__content" id="item1"> 
          asdadsdasd
          </div>
        </div>
        <div class="buttons">
          <button type="button" class="cancel-button" @click.prevent="$emit('close-modal')">Закрыть</button> 
          <button type="submit">Применить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.accordion__item__content  {
    display: none;
    padding: 20px;
    :target {
      display: block;
    }
}
.accordion__item__title{
position: absolute;
margin: 12px 50px;
text-align: center;
}
.ava{
position: absolute;
margin: 5px 5px ;
background-color: seagreen;
height: 40px;
width: 40px;
border-radius: 50%;
}
.accordion__item{
margin-top: 10px;
border-radius: 10px;

width: 100%;
height: 50px;
background-color: white;
}
.users_name{
background-color: whitesmoke;
width: 100%;
height: 400px;
border-radius: 10px;
}
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(255 255 255 / 33%);
    backdrop-filter: blur(15px);
  }
  .buttons{
    padding-top: 10px;
  }
  .title__modal{
position: absolute;
color: whitesmoke;
margin-bottom: 650px;
  }
  .modal__container {
    display: flex;
    background-color: whitesmoke;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 430px;
  }
  
  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 15px;
  }
  ::placeholder{
padding-top: 5px;
  }

  input[type="text"],
  input[type="date"],
  textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  textarea {
    padding-bottom: 50px;
    resize: vertical; 
  }
  
  button[type="submit"] {
    padding: 10px 20px;
    background-color: rgb(32, 146, 99);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    float: right;
  }
  
  button[type="submit"]:hover {
    background-color: rgb(25, 116, 78);
  }
  
  .close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    text-decoration: none;
    color: rgb(0, 0, 0);
    font-size: 24px;
  }

  .cancel-button {
    padding: 10px 30px;
    background-color: rgb(155, 155, 155);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    float: left;

  }
  
  .cancel-button:hover { 
    background-color: gray;
  }
</style>