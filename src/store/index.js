const store = {
    state: {
        firstPlayerField: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        secondPlayerField: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        algorithms: [
            'Алгоритм Васи',
            'Мега ИИ',
            'Разработка СКАЙНЕТ',
        ],
        firstUserChoosedAlgorithm: '',
        secondUserChoosedAlgorithm: '',
        whichPlayerWon: '',
    },
    mutations: {
        changeWhoWon(state, payload) {
            state.whichPlayerWon = payload;
        },
        firstUserShoot(state, payload) {
            let x = payload[0];
            let y = payload[1];

            if (state.secondPlayerField[x][y] === 1) {
                state.secondPlayerField[x].splice(y, 1, 2);
            } else {
                state.secondPlayerField[x].splice(y, 1, '-');
            }
        },
        secondUserShoot(state, payload) {
            let x = payload[0];
            let y = payload[1];

            if (state.firstPlayerField[x][y] === 1) {
                console.log('hit');
                state.firstPlayerField[x].splice(y, 1, 2);
            } else {
                state.firstPlayerField[x].splice(y, 1, '-');
            }
        },
        changeFirstUserAlgorithm(state, payload) {
            state.firstUserChoosedAlgorithm = payload;
        },
        changeSecondUserAlgorithm(state, payload) {
            state.secondUserChoosedAlgorithm = payload;
        },
        setGameFieldsToInitialState(state) {
            state.firstPlayerField = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
            state.secondPlayerField = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
        }
    },
};

export default store;
