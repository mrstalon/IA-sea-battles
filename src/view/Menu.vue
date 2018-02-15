<template>
  <div class="container">
      <header>
          <h1>Города</h1>
          <button class="start-game-button" v-on:click="redirect('game')">Играть</button>
      </header>
      <main>
          <h2>Правила игры</h2>
          <p>
            Города — игра для нескольких (двух или более) человек, в которой каждый участник
            в свою очередь называет реально существующий город любой страны, название которого
            начинается на ту букву, которой оканчивается название предыдущего участника.
          </p>
          <h3>Проблемные буквы</h3>
          <p>
            Обычно исключения составляют названия, оканчивающиеся на твёрдый и мягкий знаки,
            а также буквы «Ы» и «Й»: в таких случаях участник называет город на предпоследнюю букву.
          </p>
      </main>
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
    width: 600px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 150px 350px;
    grid-template-areas: 
      "h h h h h h"
      "m m m m m m";
}

header {
    grid-area: h;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.start-game-button {
    display: inline-block;
    height: 50px;
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

.start-game-button:hover {
    color: rgb(255,255,255);
    background-image: linear-gradient(#9dc7e7, #74afdd 50%, #378bce);
    cursor: pointer;
}

main {
    grid-area: m;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
