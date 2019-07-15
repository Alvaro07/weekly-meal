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
    board: {
      days: {
        monday: {
          title: "monday",
          breakfast: null,
          lunch: null,
          dinner: null,
          order: 0
        },
        tuesday: {
          title: "tuesday",
          breakfast: null,
          lunch: null,
          dinner: null,
          order: 1
        },
        wednesday: {
          title: "wednesday",
          breakfast: null,
          lunch: null,
          dinner: null,
          order: 2
        },
        thursday: {
          title: "thursday",
          breakfast: null,
          lunch: null,
          dinner: null,
          order: 3
        },
        friday: {
          title: "friday",
          breakfast: null,
          lunch: null,
          dinner: null,
          order: 4
        },
        saturday: {
          title: "saturday",
          breakfast: null,
          lunch: null,
          dinner: null,
          order: 5
        },
        sunday: {
          title: "sunday",
          breakfast: null,
          lunch: null,
          dinner: null,
          order: 6
        }
      }
    }
  },
  mutations: {
    addUser: (state, data) => {
      state.user = { name: data.name, email: data.email, id: data.id };
    },
    addAllBoard: (state, board) => {
      state.board = board;
    },
    addDayMeal: (state, data) => {
      state.board.days[data.day][data.type] = data.meal;
    }
  },
  actions: {}
});
