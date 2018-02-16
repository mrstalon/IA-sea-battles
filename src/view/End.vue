<template>
  <div class="container">
      <h1>{{this.$store.state.whoWonMessage}}</h1>
      <div class="buttons-container">
            <button v-on:click="redirect('/game')">New Game</button>
            <button v-on:click="redirect('/')">Menu</button>
      </div>
      <div class="lists-container">
          <div>
              <h3>Города названные игроком</h3>
              <ul v-for="(city,index) in this.$store.state.userCities" :key=index>
                  <li>{{city}}</li>
              </ul>
          </div>
          <div>
              <h3>Города названные ботом</h3>
              <ul v-for="(city,index) in this.$store.state.botCities" :key=index>
                  <li>{{city}}</li>
              </ul>
          </div>
      </div>
  </div>
</template>


<script>
import {router} from '../main.js';

export default {
    methods: {
        redirect(url) {
            router.push(url);
        }
    }
}


</script>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.lists-container {
    display: flex;
    flex-direction: row;
    width: 850px;
    justify-content: space-around;
}

button {
    display: inline-block;
    height: 45px;
    width: 100px;
    font-size: 80%;
    color: rgba(255,255,255,.9);
    text-shadow: #2e7ebd 0 1px 2px;
    text-decoration: none;
    text-align: center;
    line-height: 1.1;
    white-space: pre-line;
    padding: .7em 0;
    border: 1px solid;
    border-color: #60a3d8 #2970a9 #2970a9 #60a3d8;
    border-radius: 6px;
    outline: none;
    background: #60a3d8 linear-gradient(#89bbe2, #60a3d8 50%, #378bce);
    box-shadow: inset rgba(255,255,255,.5) 1px 1px;
}

button:hover {
    color: rgb(255,255,255);
    background-image: linear-gradient(#9dc7e7, #74afdd 50%, #378bce);
    cursor: pointer;
}

</style>
