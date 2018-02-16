<template>
    <div class="container">
        <div class="game-process-info-container">
            <div class="error-message-container">
                <h4 v-if="isErrorOccurred" class="error-message">{{this.$store.state.errorMessage}}</h4>    
            </div>
            <div class="game-process-info">
                    <div>
                        <h1 v-if="!showBotAnswer && isThisTurnFirst === false">Вы назвали: {{this.$store.state.currentCity}}</h1>
                        <h1 v-if="showBotAnswer && isThisTurnFirst === false">Бот назвал: {{this.$store.state.currentCity}}</h1>
                    </div>
                    <div class="user-input" v-if="usersTurn"> 
                        <button  class="speak-button" v-on:click="startUserSpeechRecognition()">
                            <img v-bind:src="addPathToMicroIcon()">
                        </button>
                        <input v-model="usersCityName" placeholder="Введите название города">
                        <button v-on:click="confirmUserInput()">Подтвердить</button>
                    </div>
                    <h1 v-else>Бот ходит</h1>
            </div>
        </div>
      <div>
        <div id="map"></div>
        <button v-on:click="userDefeated()" class="end-game-button">Сдаться</button>
      </div>
    </div>
</template>


<script>
import axios from 'axios';
import {router} from '../main.js';

export default {
    mounted() {
        this.$store.commit('clearUserAndBotCitiesLists');
        ymaps.ready(() => {
            this.myMap = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 1,
            });
        });
    },
    data() {
        return {
            usersCityName: '',
            isThisTurnFirst: true,
            showBotAnswer: false,
            usersTurn: true,
            myMap: {},
            isErrorOccurred: false,
        }
    },
    methods: {
        userDefeated() {
            this.$store.commit('initializingState');
            this.$store.commit('changeWhoWonMessage', 'Вы проиграли!!');
            router.push('/end');
        },
        placeCityMark(cityName) {
            let x;
            let y;

            axios.get('https://geocode-maps.yandex.ru/1.x/?geocode=' + cityName + '&format=json')
                .then((response) => {
                    let coordinates = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
                    coordinates = coordinates.split(' ');
                    y = coordinates[0];
                    x = coordinates[1];
                    let mark = new ymaps.Placemark([x,y], { hintContent: cityName});
                    this.myMap.geoObjects.add(mark);
            });

        },
        confirmUserInput() {
            if(this.isThisTurnFirst) {
                this.checkHasCityAlreadyBeenNamed();
            } else {
                this.checkIsFirstLetterMatch();
            }

        },
        checkIsFirstLetterMatch() {
            let neededLetter = this.$store.state.currentCity[this.$store.state.currentCity.length - 1].toLowerCase();
            const usersFirstLetter = this.usersCityName[0].toLowerCase();

            if(neededLetter === 'ь' || neededLetter === 'й' || neededLetter === 'ы' || neededLetter === 'ъ') {
                neededLetter = this.$store.state.currentCity[this.$store.state.currentCity.length - 2].toLowerCase();
            }

            if(usersFirstLetter === neededLetter) {
                this.checkHasCityAlreadyBeenNamed();
            } else {
                this.$store.commit('setErrorMessage', 'Название города начинается не на ту букву');
                this.isErrorOccurred = true;
                setTimeout(() => {
                    this.isErrorOccurred = false;
                }, 4000);
            }
        },
        checkHasCityAlreadyBeenNamed() {
            const mentionedCities = this.$store.state.mentionedСities;
            const userCityName = this.usersCityName.toLowerCase();
            let wasCityMentioned = false;

            mentionedCities.forEach((item, index) => {

                if(item.toLowerCase() === userCityName) {
                    wasCityMentioned = true;
                }
            });

            if (wasCityMentioned) {
                this.$store.commit('setErrorMessage', 'Город уже был упомянут');
                this.isErrorOccurred = true;
                setTimeout(() => {
                    this.isErrorOccurred = false;
                }, 4000);
                return; 
            } else {
                this.checkIsCityExists();
            }
        },
        checkIsCityExists(id) {
            const citiesArray = this.$store.state.cities;
            const userCityName = this.usersCityName.toLowerCase();
            let isCityExist = false;
            let idOfCity;
            citiesArray.forEach((item, index) => {
                if(item === userCityName) {
                    isCityExist = true;
                    idOfCity = index;
                }
            });
            if (isCityExist) {
                this.isThisTurnFirst = false;
                this.placeCityMark(this.usersCityName);
                this.showBotAnswer = false;
                this.$store.commit('cityConfirmation', {city: this.usersCityName, id: idOfCity});
                this.$store.commit('addCityToUsersCities', userCityName);
                this.usersTurn = false;
                this.botAnswer();
            } else {
                this.$store.commit('setErrorMessage', 'Такого города не существует или его нет у нас в базе');
                this.isErrorOccurred = true;
                setTimeout(() => {
                    this.isErrorOccurred = false;
                }, 4000);
            }
        },
        addPathToMicroIcon() {
            return './src/assets/micro-icon.png';
        },
        startUserSpeechRecognition() {
            let newCityName = '';
            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            let recognition = new SpeechRecognition();
            recognition.lang = 'ru-RU';
            recognition.interimResults = false;
            recognition.start();

            recognition.addEventListener('result', (event) => {
                let last = event.results.length - 1;
                let city = event.results[last][0].transcript;
                this.usersCityName = city;
            });
        },
        botAnswer() {
            const citiesArray = this.$store.state.cities;
            const mentionedCities = this.$store.state.mentionedСities;
            let lastCharOfTheCityName = this.$store.state.currentCity[this.$store.state.currentCity.length-1];
            if(lastCharOfTheCityName === 'ь' || lastCharOfTheCityName === 'й' || lastCharOfTheCityName === 'ы' || lastCharOfTheCityName === 'ъ') {
                lastCharOfTheCityName = this.$store.state.currentCity[this.$store.state.currentCity.length-2];
            }

            let cityToAnswer = '';
            setTimeout(() => {
                let returnedObject = findMatchWordToAnswer();
                if (returnedObject === true) {
                    this.botDefeated();
                }
                let indexOfMatchCity = returnedObject.id;
                cityToAnswer = returnedObject.item.toLowerCase();
                this.placeCityMark(cityToAnswer);
                this.$store.commit('cityConfirmation', {city: cityToAnswer, id: indexOfMatchCity});
                this.$store.commit('addCityToBotCities', cityToAnswer);
                this.showBotAnswer = true;
                this.usersTurn = true;
                this.usersCityName = '';
            }, 2000);


            function findMatchWordToAnswer() {
                let isBotDefeated = true;
                for(let i=0; i<citiesArray.length; i++) {
                    if (citiesArray[i][0] === lastCharOfTheCityName) {
                        return {
                            item: citiesArray[i],
                            id: i,
                        };
                    }
                }
                return isBotDefeated;
            }
        },
        botDefeated() {
            this.$store.commit('changeWhoWonMessage', 'Вы победили!!');
            router.push('/end');
        }
    }
}


</script>

<style scoped>

.error-message-container {
    height: 200px;
    display: flex;
    align-items: center;
}

.game-process-info-container {
    display: flex;
    flex-direction: column;
}

.error-message {
    color: red;
    width: 300px;
}

.user-input {
    display: flex;
    flex-direction: row;
    align-items: center;
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

.speak-button {
    width: 40px;
}

.speak-button > img {
    width: 20px;
}

.speak-button:hover {
    cursor: pointer;
}

#map {
    width: 300px;
    height: 300px;
    margin-top: 24px;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.game-process-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.container > :last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container > :last-child > button {
    margin-top: 10px;
}

input {
    height: 36px;
    border-radius: 8px;
    font-size: 16px;
}

</style>