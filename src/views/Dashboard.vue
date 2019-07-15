<template>
  <div>
    <NavHeader></NavHeader>
    <main class="dashboard">
      <ul class="dashboard__list" v-if="!loading">
        <li v-for="(item, index) in board.days" :key="index">
          <Card :day="item.title" @addMeal="() => openModal('modal-add', item.title)"></Card>
        </li>
      </ul>

      <p v-if="loading">Loading ...</p>
    </main>

    <Modal v-show="modal.isOpen && modal.name === 'modal-add'" @close="closeModal" title="Add Meal">
      <form>
        <Tag type="breakfast" extraClass="margin-right-10" @onClick="selectTag" ref="breakfast"/>
        <Tag type="lunch" extraClass="margin-right-10" @onClick="selectTag" ref="lunch"/>
        <Tag type="dinner" @onClick="selectTag" ref="dinner"/>

        <InputField
          type="text"
          label="Your meal:"
          extraClass="margin-top-30"
          disabled
          ref="inputMeal"
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
      </form>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { eventBus } from "../event-bus.js";
import firebase from "firebase";
import { database } from "../main";
// import { getUser } from "firebase/functions";

import NavHeader from "../components/NavHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Tag from "../components/Tag";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default {
  name: "dashboard",
  components: {
    NavHeader,
    Card,
    Modal,
    Tag,
    InputField,
    Button
  },
  data() {
    return {
      loading: false,
      modal: {
        name: null,
        isOpen: false,
        thisDay: null
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

    openModal(modal, day) {
      this.modal = { name: modal, isOpen: true, thisDay: day };
    },
    closeModal() {
      this.disableTags();
      this.addForm.meal = null;
      eventBus.$emit("resetField");
      this.$refs.addMealButton.disabledButton();
      this.$refs.inputMeal.disable();
      this.modal = { name: null, isOpen: false };
    },
    selectTag(e) {
      if (this.$refs[e].isActive) {
        this.disableTags();
        this.addForm.activeTag = null;
        this.$refs.inputMeal.disable();
        this.$refs.addMealButton.disabledButton();
      } else {
        this.disableTags();
        this.$refs[e].selectTag(true);
        this.addForm.activeTag = e;
        this.$refs.inputMeal.activate();
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
    addMeal() {
      let data = {
        day: this.modal.thisDay,
        type: this.addForm.activeTag,
        meal: this.addForm.meal
      };
      this.$store.commit("addDayMeal", data);
      this.closeModal();
    }
  },
  computed: mapState(["board"]),
  created() {
    this.loading = true;
    var user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      var docRef = database
        .collection("users")
        .where("email", "==", user.email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(function(doc) {
            let data = {
              name: doc.data().user,
              email: doc.data().email,
              id: doc.id
            };
            resolve(data);
          });
        })
    }).then(data => {
      this.$store.commit("addUser", data);
      this.loading = false;
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

