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
        dinner: null
      },
      {
        day: "tuesday",
        breakfast: null,
        lunch: null,
        dinner: null
      },
      {
        day: "wednesday",
        breakfast: null,
        lunch: null,
        dinner: null
      },
      {
        day: "thursday",
        breakfast: null,
        lunch: null,
        dinner: null
      },
      {
        day: "friday",
        breakfast: null,
        lunch: null,
        dinner: null
      },
      {
        day: "saturday",
        breakfast: null,
        lunch: null,
        dinner: null
      },
      {
        day: "sunday",
        breakfast: null,
        lunch: null,
        dinner: null
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
        }
      });
    },
    removeDayMeal: (state, data) => {
      state = state.board.map((e, index) => {
        if (e.day === data.day) {
          state.board[index] = {
            ...state.board[index],
            [data.type]: null
          };
        }
      });
    }
  },
  actions: {}
});
