<template>
  <form>
    <Tag
      type="breakfast"
      extraClass="margin-right-10"
      @onClick="selectTag"
      ref="breakfast"
      :active="mealSelect && mealSelect.type === 'breakfast' ? true : null"
    />
    <Tag
      type="lunch"
      extraClass="margin-right-10"
      @onClick="selectTag"
      ref="lunch"
      :active="mealSelect && mealSelect.type === 'lunch' ? true : null"
    />
    <Tag
      type="dinner"
      @onClick="selectTag"
      ref="dinner"
      :active="mealSelect && mealSelect.type === 'dinner' ? true : null"
    />

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

    <div class="form__loader-wrap" v-if="loading">
      <Loader/>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import { updateBoard } from "../firebase/functions";
import { eventBus } from "../event-bus.js";
import Tag from "../components/Tag";
import TextareaField from "../components/TextareaField";
import Button from "../components/Button";
import Loader from "../components/Loader";

export default {
  name: "meal-form",
  components: {
    Tag,
    TextareaField,
    Button,
    Loader
  },
  props: ["day", "mealSelect"],
  data() {
    return {
      loading: false,
      activeTag: null,
      meal: null
    };
  },
  mounted() {
    if (this.mealSelect) {
      this.meal = this.mealSelect.meal;
      this.activeTag = this.mealSelect.type;
      this.$refs.textareaMeal.activate();
      this.$refs.textareaMeal.addContent(this.mealSelect.meal);
      this.$refs.addMealButton.activeButton();
    }
  },
  methods: {
    addMeal() {
      this.loading = true;
      this.$store.commit("addDayMeal", { day: this.day, type: this.activeTag, meal: this.meal });

      updateBoard(this.board, this.user.id).then(() => {
        this.meal = null;
        this.loading = false;
        eventBus.$emit("resetField");
        this.$refs.addMealButton.disabledButton();
        this.$refs.textareaMeal.disable();
        this.disableTags();
        this.$emit("closeFormModal");
      });
    },
    onKeyUpMeal(e) {
      this.meal = e;
      if (this.meal.length > 0) {
        this.$refs.addMealButton.activeButton();
      } else {
        this.$refs.addMealButton.disabledButton();
      }
    },
    selectTag(e) {
      if (this.$refs[e].isActive) {
        this.disableTags();
        this.activeTag = null;
        this.$refs.textareaMeal.disable();
        this.$refs.addMealButton.disabledButton();
      } else {
        this.disableTags();
        this.$refs[e].selectTag(true);
        this.activeTag = e;
        this.$refs.textareaMeal.activate();
        if (this.length > 1) this.$refs.addMealButton.activeButton();
      }
    },
    disableTags() {
      this.$refs.breakfast.selectTag(false);
      this.$refs.lunch.selectTag(false);
      this.$refs.dinner.selectTag(false);
    }
  },
  computed: {
    ...mapState(["board", "user"])
  }
};
</script>

<style lang="scss">
/**
  * Loader wrap
  */

.form__loader-wrap {
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 51px;
  left: 0;
  z-index: 1;

  width: 100%;
  height: calc(100% - 51px);
  border-radius: 5px;
  background-color: rgba(white, 0.5);
}
</style>