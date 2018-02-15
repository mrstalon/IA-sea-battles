import citiesList from './citiesList';

const cities = citiesList.map((item) => {
    return item.toLowerCase();
});

const store = {
    state: {
        cities,
        mentionedСities: [''],
        currentCity: '',
        userCities: [],
        botCities: [],
    },
    mutations: {
        cityConfirmation(state, payLoad) {
            state.cities.splice(payLoad.id, 1);
            state.mentionedСities.push(payLoad.city);
            state.currentCity = payLoad.city.toLowerCase();
        },
        initializingState(state) {
            state.cities = citiesList.map((item) => {
                return item.toLowerCase();
            });
            state.mentionedСities = [''];
            state.currentCity = '';
        },
        addCityToUsersCities(state, city) {
            state.userCities.push(city);
        },
        addCityToBotCities(state, city) {
            state.botCities.push(city);
        },
        clearUserAndBotCitiesLists(state) {
            state.userCities = [];
            state.botCities = [];
        },
    },
};

export default store;
