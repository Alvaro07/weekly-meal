<template>
  <div class="c-card">
    <header class="c-card__header">
      <h3 class="c-card__header__day">{{ day | capitalize }}</h3>

      <span class="c-card__header__add-button" @click.prevent="addMeal">
        <font-awesome-icon icon="plus-square"/>
      </span>
    </header>
    <main class="c-card__content">
      <div class="c-card__content__item" v-if="data.breakfast">
        <Tag
          small
          type="breakfast"
          extraClass="margin-bottom-5 margin-right-10"
          @onClick="() => openMeal(data.breakfast, 'breakfast')"
        />
        <font-awesome-icon
          icon="times"
          class="c-card__content__item__remove"
          @click.prevent="() => removeMeal('breakfast')"
        />
        <p>{{data.breakfast}}</p>
      </div>
      <div class="c-card__content__item" v-if="data.lunch">
        <Tag
          small
          type="lunch"
          extraClass="margin-bottom-5 margin-right-10"
          @onClick="() => openMeal(data.lunch, 'lunch')"
        />
        <font-awesome-icon
          icon="times"
          class="c-card__content__item__remove"
          @click.prevent="() => removeMeal('lunch')"
        />
        <p>{{data.lunch}}</p>
      </div>
      <div class="c-card__content__item" v-if="data.dinner">
        <Tag
          small
          type="dinner"
          extraClass="margin-bottom-5 margin-right-10"
          @onClick="() => openMeal(data.dinner, 'dinner')"
        />
        <font-awesome-icon
          icon="times"
          class="c-card__content__item__remove"
          @click.prevent="() => removeMeal('dinner')"
        />
        <p>{{data.dinner}}</p>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Tag from "./Tag";

export default {
  name: "Card",
  components: {
    Tag
  },
  props: {
    day: {
      validator: value => ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].indexOf(value) !== -1,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    addMeal() {
      this.$emit("addMeal");
    },
    removeMeal(typeMeal) {
      this.$emit("removeMeal", typeMeal);
    },
    openMeal(data, type) {
      this.$emit("openMeal", data, type);
    }
  },
  computed: {
    ...mapState(["board"])
  }
};
</script>

<style lang="scss">
.c-card {
  --minimun-height: 100px;

  background: rgba($gold, 0.1);
  border: 1px solid rgba($gold, 0.4);
  border-radius: 5px;
  position: relative;
  min-height: var(--minimun-height);
  height: 100%;

  @include mediaTablet() {
    --minimun-height: 150px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 5px 5px 10px;

    &__day {
      text-align: center;
      font-family: $paytone;
      font-size: 1.8rem;
      color: $darkGreen;
    }

    &__add-button {
      --button-color: #{$darkGreen};

      font-size: 3rem;
      color: var(--button-color);
      cursor: pointer;
      transition: 0.3s all ease;

      &:hover {
        --button-color: #{$orange};
      }
    }
  }

  &__content {
    padding: 10px;

    &__item {
      &:not(:last-child) {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px dotted $gold;
      }

      &__remove {
        --color: #{$orange};

        color: var(--color);
        transition: 0.3s all ease;
        cursor: pointer;
        font-size: 1.8rem;

        &:hover {
          --color: #{$lightOrange};
        }
      }
    }
  }
}
</style>