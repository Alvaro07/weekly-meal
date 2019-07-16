import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: null,
      email: null,
      id: null
    },
    board: [
      {
        day: "monday",
        breakfast: null,
        lunch: null,
        dinner: null,
        order: 0
      },
      {
        day: "tuesday",
        breakfast: null,
        lunch: null,
        dinner: null,
        order: 1
      },
      {
        day: "wednesday",
        breakfast: null,
        lunch: null,
        dinner: null,
        order: 2
      },
      {
        day: "thursday",
        breakfast: null,
        lunch: null,
        dinner: null,
        order: 3
      },
      {
        day: "friday",
        breakfast: null,
        lunch: null,
        dinner: null,
        order: 4
      },
      {
        day: "saturday",
        breakfast: null,
        lunch: null,
        dinner: null,
        order: 5
      },
      {
        day: "sunday",
        breakfast: null,
        lunch: null,
        dinner: null,
        order: 6
      }
    ]
  },
  mutations: {
    addUser: (state, data) => {
      state.user = { name: data.name, email: data.email, id: data.id };
    },
    addAllBoard: (state, board) => {
      state.board = board;
    },
    addDayMeal: (state, data) => {
      state = state.board.map((e, index) => {
        if (e.day === data.day) {
          state.board[index] = {
            ...state.board[index],
            [data.type]: data.meal
          };
          console.log("data", data.type);
          console.log("data", data.meal);
          console.log("state.board[index]", state.board[index]);
        }
      });
    }
  },
  actions: {}
});
