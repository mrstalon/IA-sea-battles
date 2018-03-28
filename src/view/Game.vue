<template>
  <div class="game-container">
      <div class="first-field-container">
          <h2>{{this.$store.state.firstUserChoosedAlgorithm}}</h2>
          <div class="field">
            <div v-for="(row, index) in this.$store.state.firstPlayerField" class="row" v-bind:key="index">
                <div v-for="(cell, subIndex) in row"
                 class="cell"
                 v-bind:key="subIndex">
                    <img src="../assets/water.jpg" v-if="cell === 0">
                    <img src="../assets/cross.png" v-if="cell === '-'">
                    <img src="../assets/ship.png" v-if="cell === 1">
                    <img src="../assets/fire.jpg" v-if="cell === 2">
                </div>
            </div>
          </div>
      </div>
      <div> 
          <h6 v-if="isGameEnded && this.$store.state.whichPlayerWon">Победил {{this.$store.state.whichPlayerWon}}</h6>
          <h6 v-if="isGameEnded && !this.$store.state.whichPlayerWon">Ничья</h6>
          <button class="button" v-on:click="startGame" v-if="!isGameEnded">Начать матч</button>
          <button class="button" v-on:click="endGame" v-if="!isGameEnded">Закончить матч</button>
          <button class="button" v-on:click="changeGameSpeed" v-if="!isGameEnded  && isGameStarted">{{this.delayMessage}}</button>
      </div>

      <div class="second-field-container">
        <h2>{{this.$store.state.secondUserChoosedAlgorithm}}</h2>
        <div class="field">
            <div v-for="(row, index) in this.$store.state.secondPlayerField" v-bind:key="index" class="row">
                <div v-for="(cell, subIndex) in row" v-bind:key="subIndex" 
                class="cell">
                <img src="../assets/water.jpg" v-if="cell === 0">
                <img src="../assets/cross.png" v-if="cell === '-'">
                <img src="../assets/ship.png" v-if="cell === 1">
                <img src="../assets/fire.jpg" v-if="cell === 2">
                </div>
            </div>
        </div>
      </div>
  </div>
</template>


<script>
import {router} from '../main';
import VasiaAlgorithm from '../algorithms/VasiaAlgorithm.js';
import MegaIA from '../algorithms/MegaIA.js';
import SkainetAlgorithm from '../algorithms/SkainetAlgorithm.js';


export default {
    mounted() {
        if (!this.$store.state.firstUserChoosedAlgorithm || !this.$store.state.secondUserChoosedAlgorithm) {
            router.back();
        }
        this.$store.commit('changeWhoWon', '');
    },
    data() {
        return {
            isFirstUserTurn: true,
            isGameEnded: false,
            delay: 2000,
            delayMessage: 'Ускорить',
            isGameStarted: false,
        }
    },
    computed: {
        firstUserAlgorithm() {
            if (this.$store.state.firstUserChoosedAlgorithm === 'Алгоритм Васи') {
                return VasiaAlgorithm;
            } else if (this.$store.state.firstUserChoosedAlgorithm === 'Мега ИИ') {
                return MegaIA;
            } else if (this.$store.state.firstUserChoosedAlgorithm === 'Разработка СКАЙНЕТ') {
                return SkainetAlgorithm;
            }
        },
        secondUserAlgorithm() {
            if (this.$store.state.secondUserChoosedAlgorithm === 'Алгоритм Васи') {
                return VasiaAlgorithm;
            } else if (this.$store.state.secondUserChoosedAlgorithm === 'Мега ИИ') {
                return MegaIA;
            } else if (this.$store.state.secondUserChoosedAlgorithm === 'Разработка СКАЙНЕТ') {
                return SkainetAlgorithm;
            }
        }
    },
    methods: {
        startGame() {
            this.isGameStarted = true;
            setTimeout(this.makeTurn, 2000);    
        },
        changeGameSpeed() {
            if(this.delay === 2000) {
                this.delay = 0;
                this.delayMessage = 'Замедлить';
            } else {
                this.delay = 2000;
                this.delayMessage = 'Ускорить';
            }
        },
        makeTurn() {
            if (this.isGameEnded) {
                return;
            }
            if (this.isFirstUserTurn) {
                let coordinates = this.firstUserAlgorithm(this.$store.state.secondPlayerField);
                this.firstUserShoot(coordinates);
            } else {
                console.log(this.secondUserAlgorithm(this.$store.state.firstPlayerField));
                let coordinates = this.secondUserAlgorithm(this.$store.state.firstPlayerField);
                this.secondUserShoot(coordinates);
            }
        },
        firstUserShoot(coordinates) {
            if (this.isGameEnded) {
                return;
            }
            this.$store.commit('firstUserShoot', coordinates);
            this.isFirstUserTurn = false;
            this.checkIsGameEnded();
            setTimeout(this.makeTurn, this.delay);
        },
        secondUserShoot(coordinates) {
            if (this.isGameEnded) {
                return;
            }   
            this.$store.commit('secondUserShoot', coordinates);
            this.isFirstUserTurn = true;
            this.checkIsGameEnded();
            setTimeout(this.makeTurn, this.delay);
        },
        checkIsGameEnded() {
            let isFirstPlayerWon = this.checkIsFirstPlayerWon();
            if (isFirstPlayerWon) {
                this.$store.commit('changeWhoWon', this.$store.state.firstUserChoosedAlgorithm);
                this.endGame();
            } 
            let isSecondPlayerWon = this.checkIsSecondPlayerWon();
            if (isSecondPlayerWon) {
                this.$store.commit('changeWhoWon', this.$store.state.secondUserChoosedAlgorithm);
                this.endGame();
            }
        },
        checkIsFirstPlayerWon() {
            let areAllShipsDestroied = true;
            this.$store.state.secondPlayerField.forEach(item => {
                item.forEach(subItem => {
                    if (subItem === 1) {
                        areAllShipsDestroied = false;
                    }
                });
            });
            return areAllShipsDestroied;
        },
        checkIsSecondPlayerWon() {
            let areAllShipsDestroied = true;
            this.$store.state.firstPlayerField.forEach(item => {
                item.forEach(subItem => {
                    if (subItem === 1) {
                        areAllShipsDestroied = false;
                    }
                });
            });
            return areAllShipsDestroied;
        },
        endGame() {
            this.delay = 2000;
            this.delayMessage = 'Ускорить';
            this.isFirstUserTurn = true;
            this.isGameEnded = true;
            this.isGameStarted = false;
            setTimeout(this.end, 5000);
        },
        end() {
            this.$store.commit('setGameFieldsToInitialState');
            router.push('/end');
        }
    }
}
</script>

<style>

button {
    height: 50px;
}

h1 {
    width: 300px;
}

.cell > img {
    width: 100%;
    height: 100%;
}

.water {
    background-color: blue;
}

.app {
    width: 100%;
    margin: 0px;
    height: 400px;
}

.game-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.game-container > div {
    width: 50%;
    height: 100%;
}

.game-container > :nth-child(2) {
    display: flex;
    flex-direction: column;
    padding: 15px;
    height: 150px;
}

.first-field-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.second-field-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.field {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
}

.row {
    width: 400px;
    height: 100px;
    display: flex;
    flex-direction: row;
}

.cell {
    width: 50px;
    height: 100%;   
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: black 1px solid;
}

</style>

