<template>
  <div>
    <NavHeader></NavHeader>
    <main class="dashboard">
      <ul class="dashboard__list" v-if="!loading">
        <li v-for="(item, index) in board" :key="index">
          <Card
            :day="item.day"
            :data="item"
            @addMeal="() => openModal('modal-add', item.day, null)"
            @removeMeal="typeMeal => removeMeal(typeMeal, item.day)"
            @openMeal="(data, type, day) => openMeal(data, type, item.day)"
            :ref="item.day"
          ></Card>
        </li>
      </ul>

      <div class="dashboard__loader-wrap" v-if="loading">
        <Loader/>
        <p class="dashboard__loader-wrap__text">Loading ...</p>
      </div>
    </main>

    <Modal v-if="modal.isOpen && modal.name === 'modal-add'" @close="closeModal" title="Add Meal">
      <MealForm
        @closeFormModal="closeModal(modal.thisDay)"
        :day="modal.thisDay"
        :mealSelect="modal.mealSelected"
      ></MealForm>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { eventBus } from "../event-bus.js";
import firebase from "firebase";
import { database } from "../main";
import { getUser, getBoard, updateBoard } from "../firebase/functions";

import NavHeader from "../components/NavHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";
import MealForm from "../components/MealForm";
import Loader from "../components/Loader";

export default {
  name: "dashboard",
  components: {
    NavHeader,
    Card,
    Modal,
    MealForm,
    Loader
  },
  data() {
    return {
      loading: true,
      modal: {
        name: null,
        isOpen: false,
        thisDay: null,
        loading: false,
        mealSelected: null
      }
    };
  },
  methods: {
    openModal(modal, day, dataSelected) {
      this.modal = { ...this.modal, name: modal, isOpen: true, thisDay: day, mealSelected: dataSelected };
    },
    closeModal(element) {
      this.modal = { ...this.modal, name: null, isOpen: false, mealSelected: null };

      if (element) {
        this.$scrollTo(`#${element}`);
      }
    },
    openMeal(data, type, day) {
      let dataSelected = { meal: data, type };
      this.openModal("modal-add", day, dataSelected);
    },
    removeMeal(typeMeal, day) {
      this.$store.commit("removeDayMeal", { type: typeMeal, day });
      this.$refs[day][0].activeLoader();

      updateBoard(this.board, this.user.id).then(() => {
        this.$forceUpdate();
        this.$refs[day][0].removeLoader();
      });
    }
  },
  computed: mapState(["board", "user"]),

  created() {
    var user = firebase.auth().currentUser;
    getUser(user.email).then(data => {
      this.$store.commit("addUser", data);
      getBoard(data.id).then(data => {
        this.$store.commit("addAllBoard", data.board);
        this.loading = false;
      });
    });
  }
};
</script>

<style lang="scss">
.dashboard {
  --columns: 1;

  max-width: 1280px;
  margin: 0px auto;
  padding: 30px 20px;

  /**
  * Loader wrap
  */

  &__loader-wrap {
    width: 100%;
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 100px 0;

    &__text {
      font-weight: 700;
      padding-top: 15px;
    }
  }

  /**
  * Days list container
  */

  &__list {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(var(--columns), 1fr);

    @include mediaTablet() {
      --columns: 2;
    }

    @include mediaDesktop() {
      --columns: 3;
    }
  }
}
</style>

