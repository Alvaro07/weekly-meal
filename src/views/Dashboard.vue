<template>
  <div>
    <NavHeader></NavHeader>
    <main class="dashboard">
      <ul class="dashboard__list" v-if="!loading">
        <li v-for="(item, index) in board" :key="index">
          <Card
            :day="item.day"
            :data="item"
            @addMeal="() => openModal('modal-add', item.day)"
            @removeMeal="typeMeal => removeMeal(typeMeal, item.day)"
            @openMeal="(data, type, day) => openMeal(data, type, item.day)"
            :ref="'card'-item.day"
          ></Card>
        </li>
      </ul>

      <p v-if="loading">Loading ...</p>
    </main>

    <Modal v-show="modal.isOpen && modal.name === 'modal-add'" @close="closeModal" title="Add Meal">
      <form>
        <Tag type="breakfast" extraClass="margin-right-10" @onClick="selectTag" ref="breakfast"/>
        <Tag type="lunch" extraClass="margin-right-10" @onClick="selectTag" ref="lunch"/>
        <Tag type="dinner" @onClick="selectTag" ref="dinner"/>

        <textareaField
          label="Your meal:"
          extraClass="margin-top-30"
          disabled
          ref="textareaMeal"
          @input="e => onKeyUpMeal(e)"
        />

        <Button
          text="Add your meal"
          icon="drumstick-bite"
          small
          extraClass="margin-top-30"
          variant="orange"
          ref="addMealButton"
          disabled
          @onClick="() => addMeal()"
        />

        <p v-if="modal.loading">Loading ...</p>
      </form>
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
import Tag from "../components/Tag";
import InputField from "../components/InputField";
import textareaField from "../components/textareaField";
import Button from "../components/Button";

export default {
  name: "dashboard",
  components: {
    NavHeader,
    Card,
    Modal,
    Tag,
    InputField,
    Button,
    textareaField
  },
  data() {
    return {
      loading: true,
      modal: {
        name: null,
        isOpen: false,
        thisDay: null,
        loading: false
      },
      addForm: {
        activeTag: null,
        meal: null
      }
    };
  },
  methods: {
    /*
    /* Modal add meal methods
    */

    openModal(modal, day, dataSelected) {
      this.modal = { ...this.modal, name: modal, isOpen: true, thisDay: day };
      if (dataSelected) {
        this.$refs[dataSelected.type].selectTag(true);
        this.$refs.textareaMeal.addContent(dataSelected.meal);
        this.$refs.textareaMeal.activate();
        this.$refs.addMealButton.activeButton();
        this.addForm = { activeTag: dataSelected.type, meal: dataSelected.meal };
      }
    },
    closeModal() {
      this.disableTags();
      this.addForm.meal = null;
      eventBus.$emit("resetField");
      this.$refs.addMealButton.disabledButton();
      this.$refs.textareaMeal.disable();
      this.modal = { name: null, isOpen: false };
    },
    selectTag(e) {
      if (this.$refs[e].isActive) {
        this.disableTags();
        this.addForm.activeTag = null;
        this.$refs.textareaMeal.disable();
        this.$refs.addMealButton.disabledButton();
      } else {
        this.disableTags();
        this.$refs[e].selectTag(true);
        this.addForm.activeTag = e;
        this.$refs.textareaMeal.activate();
        if (this.addForm.length > 1) this.$refs.addMealButton.activeButton();
      }
    },
    disableTags() {
      this.$refs.breakfast.selectTag(false);
      this.$refs.lunch.selectTag(false);
      this.$refs.dinner.selectTag(false);
    },
    onKeyUpMeal(e) {
      this.addForm.meal = e;
      if (this.addForm.meal.length > 0) {
        this.$refs.addMealButton.activeButton();
      } else {
        this.$refs.addMealButton.disabledButton();
      }
    },
    openMeal(data, type, day) {
      let dataSelected = { meal: data, type };
      this.openModal("modal-add", day, dataSelected);
    },
    addMeal() {
      this.modal.loading = true;
      this.$store.commit("addDayMeal", { day: this.modal.thisDay, type: this.addForm.activeTag, meal: this.addForm.meal });

      updateBoard(this.board, this.user.id).then(() => {
        this.closeModal();
        this.addForm.meal = null;
      });
    },
    removeMeal(typeMeal, day) {
      this.$store.commit("removeDayMeal", { type: typeMeal, day });

      updateBoard(this.board, this.user.id).then(() => {
        this.$forceUpdate();
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
  padding: 15px;

  &__list {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(var(--columns), 1fr);

    @include mediaTablet() {
      --columns: 3;
    }

    @include mediaDesktop() {
      --columns: 4;
    }
  }
}
</style>

