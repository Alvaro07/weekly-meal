import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: {
      days: {
        monday: {
          title: "monday",
          breakfast: null,
          lunch: null,
          dinner: null
        },
        tuesday: {
          title: "tuesday",
          breakfast: null,
          lunch: null,
          dinner: null
        },
        wednesday: {
          title: "wednesday",
          breakfast: null,
          lunch: null,
          dinner: null
        },
        thursday: {
          title: "thursday",
          breakfast: null,
          lunch: null,
          dinner: null
        },
        friday: {
          title: "friday",
          breakfast: null,
          lunch: null,
          dinner: null
        },
        saturday: {
          title: "saturday",
          breakfast: null,
          lunch: null,
          dinner: null
        },
        sunday: {
          title: "sunday",
          breakfast: null,
          lunch: null,
          dinner: null
        }
      }
    }
  },
  mutations: {
    addDayMeal: (state, data) => {
      state.board.days[data.day][data.type] = data.meal;
    }
  },
  actions: {}
});
