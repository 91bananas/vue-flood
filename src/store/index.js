import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const DEFAULT_GAME = {
    gamesize: 12,
    done: new Array(), // array of 'flooded' elements
    // global vars for move count
    ingame: false,
    lastMove: 0,
    maxMoves: 22,
    moveCount: 0,
    theSize: 0, // global size
    theSizeString: '', // global size
    gameOver: false,
    colors: ['blue', 'red', 'yellow', 'purple', 'orange', 'green'],
    showOptions: false,
    showMessage: false,
    showStartup: true,
    message: '',
    allColorsArray: [],
    allColorsArrayLookup: {},
};
const getColor = function (colors) {
    var random = Math.floor(Math.random()*6);
    return colors[random];
};
const generateArray = function(size, colors) {
    const returnArray = [];
    const loop = [...Array(size).keys()];
    for (let el in loop) {
        for (let el2 in loop) {
            returnArray.push({id: el + 'p' + el2, color: getColor(colors), done: false});
        }
    }
    return returnArray;

}

export default new Vuex.Store({
    state: Object.assign({}, DEFAULT_GAME),
    mutations: {
        SHOW_OPTIONS(state, show) {
            state.showOptions = show;
        },
        HIDE_OPTIONS(state, show) {
            state.showOptions = show;
        },
        START_GAME(state, newGame) {
            Object.assign(state, newGame);
        },
        MAKE_LARGE(state, newGamesize) {
            state.gamesize = newGamesize;
        },
        MAKE_SMALL(state, newGamesize) {
            state.gamesize = newGamesize;
        },
        MOVE(state, move) {
            if (state.ingame) {
                state.lastMove = move;
                state.moveCount++;
            }
        },
        UPDATE_ALL(state, payload) {
            let p = {};
            for (let a in payload.neighborsToUpdate) {
                p[payload.neighborsToUpdate[a].id] = a;
            }

            let newA = [];
            for (let i in state.allColorsArray) {
                let now = state.allColorsArray[i];
                if (now.done) {
                    now.color = payload.localColor;
                }
                if (now.id in p) {
                    now.done = true;
                    now.color = payload.localColor;
                }
                newA.push(Object.assign({}, now));
            }
            state.allColorsArray = newA;

            const allDone = state.allColorsArray.filter(arg => arg.done);
            if (allDone.length == (state.gamesize * state.gamesize) && (state.moveCount <= state.maxMoves))
            { // flooded entire board
                //displayr(1);
                state.message = 'Nice job! You flooded the board in ' + state.moveCount + ' moves!'
                state.showMessage = true;
                state.ingame = false;
            } else if (state.moveCount == state.maxMoves) {
                state.message = 'I\'m sorry you ran out of moves.';
                state.showMessage = true;
                state.ingame = false;
            }
        },
        // NEIGHBOR_DONE(state, element) {
        //     debugger;
        // }
    },
    actions: {
        showOptions({commit}) {
            commit('SHOW_OPTIONS', true);
        },
        hideOptions({commit}) {
            commit('HIDE_OPTIONS', false);
        },
        makeLarge({commit}) {
            commit('MAKE_LARGE', 20);
            this.dispatch('startGame');
        },
        makeSmall({commit}) {
            commit('MAKE_SMALL', 12);
            this.dispatch('startGame');
        },
        startGame({commit}) {
            let data = Object.assign({}, DEFAULT_GAME);
            if (this.getters.gamesize === 12) {
                data.maxMoves = 22;
                data.theSize = 0;
                data.theSizeString = ' Psmall';
                data.gamesize = 12;
            } else if (this.getters.gamesize === 20) {
                data.maxMoves = 32;
                data.theSize = 2;
                data.theSizeString = ' Plarge';
                data.gamesize = 20;
            }
            data.showStartup = false;
            data.ingame = true;

            data.allColorsArray = generateArray(data.gamesize, data.colors);

            data.allColorsArrayLookup = {};
            for (let el in data.allColorsArray) {
                const key = data.allColorsArray[el].id
                data.allColorsArrayLookup[key] = el;
            }
            const firstel = data.allColorsArray[0];
            firstel.done = true;
            data.done.push(firstel);

            commit('START_GAME', data);
            this.dispatch('checkDoneColors', firstel.color);
        },
        moveMade({commit}, color) {
            commit('MOVE', color);
            this.dispatch('checkDoneColors', color);
        },
        checkDoneColors({commit}, color)  {
            let neighborsToUpdate = [];
            let localColor = color;
            let elements = this.getters.allColorsArray.filter(element => element.done).map(element => Object.assign({}, element));
            for (var el = 0; el < elements.length; el++) {
            // for (el in elements) {
                let element = elements[el];
                // if (element.done) {
                    if (!color) { // if no color coming in use the done element, because it's probably first time through
                        localColor = element.color;
                    }

                    const id = element.id;
                    const tempID = id.split('p');
                    const tempx = tempID[0];
                    const tempy = tempID[1];
                    let dirs = [];

                    dirs.push(tempx + 'p' + String(parseInt(tempy) - 1));
                    dirs.push(String(parseInt(tempx) + 1) + 'p' + tempy);
                    dirs.push(tempx + 'p' + String(parseInt(tempy) + 1));
                    dirs.push(String(parseInt(tempx) - 1) + 'p' + tempy);

                    const _this = this;
                    for (let d in dirs) {
                        const dir = dirs[d];
                        if (dir.search('-') == -1) {
                            let neighbor = Object.assign({}, _this.getters.allColorsArray[
                                    _this.getters.allColorsArrayLookup[dir]
                                ]);
                            console.log(neighbor)
                            if (neighbor && neighbor.color === color && neighborsToUpdate.filter(n => n.id == dir).length === 0) {
                                Object.assign({}, neighbor)
                                neighbor.done = true;

                                neighborsToUpdate.push(neighbor);
                                elements.push(neighbor);
                            }
                        }
                    }
                // }

            }
            console.log(localColor);
            commit('UPDATE_ALL', {neighborsToUpdate, localColor});
        }
    },
    getters: {
        maxMoves: (state) => (state.maxMoves),
        moveCount: (state) => (state.moveCount),
        colors: (state) => (state.colors),
        allColorsArray: (state) => (state.allColorsArray),
        allColorsArrayLookup: (state) => (state.allColorsArrayLookup),
        showMessage: (state) => (state.showMessage),
        done: (state) => (state.done),
        showStartup: (state) => (state.showStartup),
        showOptions: (state) => (state.showOptions),
        gamesize: (state) => (state.gamesize),
        theSizeString: (state) => (state.theSizeString)
    }
});
