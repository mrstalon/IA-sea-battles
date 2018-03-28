<template>
  <div class="container">
      <h1>Выберите алгоритмы для сражения</h1>
      <button v-on:click="redirectToGame">Играть</button>
      <div class="chooser-container">
          <div class="first-player-container">
              <h3>Первый игрок</h3>
              <select v-model="firstUserAlgorithm">
                  <option v-for="(option, index) in this.$store.state.algorithms"
                    :key="index">
                    {{option}}
                    </option>
              </select>
              <h3 v-if="firstUserAlgorithm">Вы выбрали - {{firstUserAlgorithm}}</h3>
          </div>
          <div class="second-player-container">
            <h3>Второй игрок</h3>
            <select v-model="secondUserAlgorithm">
                <option v-for="(option, index) in this.$store.state.algorithms"
                    :key="index">
                    {{option}}
                </option>
            </select>
            <h3 v-if="secondUserAlgorithm">Вы выбрали - {{secondUserAlgorithm}}</h3>
          </div>
      </div>
  </div>
</template>


<script>
import {router} from '../main';

export default {
    beforeDestroy() {
        this.$store.commit('changeFirstUserAlgorithm', this.firstUserAlgorithm);
        this.$store.commit('changeSecondUserAlgorithm', this.secondUserAlgorithm);
    },
    data() {
        return {
            firstUserAlgorithm: this.$store.state.firstUserChoosedAlgorithm,
            secondUserAlgorithm: this.$store.state.secondUserChoosedAlgorithm,
        }
    },
    methods: {
        redirectToGame() {
            router.push('/game');
        }
    }
}
</script>

<style scoped>

h1 {
    width: 600px;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.chooser-container {
    width: 800px;
    display: flex;
    flex-direction: row;
}

.chooser-container > div {
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

button {
    height: 50px;
}

</style>

