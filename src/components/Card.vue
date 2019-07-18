<template>
  <div class="c-card">
    <header class="c-card__header">
      <h3 class="c-card__header__day">{{ day | capitalize }}</h3>

      <span class="c-card__header__add-button" @click.prevent="addMeal">
        <font-awesome-icon icon="plus"/>
      </span>
    </header>
    <main class="c-card__content">
      <div class="c-card__content__item" v-if="data.breakfast">
        <h3 class="c-card__header-type">
          <span
            class="c-card__header-type__title c-card__header-type__title--breakfast"
            @click.prevent="() => openMeal(data.breakfast, 'breakfast')"
          >Breakfast</span>
          <span class="c-card__header-type__remove" @click.prevent="() => removeMeal('breakfast')">
            <font-awesome-icon icon="times"/>
          </span>
        </h3>

        <p class="c-card__meal">{{data.breakfast}}</p>
      </div>
      <div class="c-card__content__item" v-if="data.lunch">
        <h3 class="c-card__header-type">
          <span
            class="c-card__header-type__title c-card__header-type__title--lunch"
            @click.prevent="() => openMeal(data.lunch, 'lunch')"
          >Lunch</span>
          <span class="c-card__header-type__remove" @click.prevent="() => removeMeal('lunch')">
            <font-awesome-icon icon="times"/>
          </span>
        </h3>
        <p class="c-card__meal">{{data.lunch}}</p>
      </div>
      <div class="c-card__content__item" v-if="data.dinner">
        <h3 class="c-card__header-type">
          <span
            class="c-card__header-type__title c-card__header-type__title--dinner"
            @click.prevent="() => openMeal(data.dinner, 'dinner')"
          >Dinner</span>
          <span class="c-card__header-type__remove" @click.prevent="() => removeMeal('dinner')">
            <font-awesome-icon icon="times"/>
          </span>
        </h3>
        <p class="c-card__meal">{{data.dinner}}</p>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Card",

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

  background: rgba($gold, 0.2);
  position: relative;
  min-height: var(--minimun-height);
  height: 100%;
  border-bottom: 1px solid $gold;

  @include mediaTablet() {
    --minimun-height: 150px;
  }

  /**
  * header day card
  */

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #fffdfa;

    &__day {
      text-align: center;
      font-size: 2.2rem;
      font-weight: 500;
      color: $darkGreen;
    }

    &__add-button {
      --button-color: #{$darkGreen};

      font-size: 2.1rem;
      color: var(--button-color);
      cursor: pointer;
      transition: 0.3s all ease;

      &:hover {
        --button-color: #{$orange};
      }
    }
  }

  /**
  * General content
  */

  &__content {
    &__item {
      position: relative;
      &:not(:last-child) {
        border-bottom: 1px solid rgba($gold, 0.2);
      }
    }
  }

  /**
  * Items content
  * Header type of meal
  */

  &__header-type {
    transition: 0.3s all ease;
    display: flex;

    &__remove {
      --bg-color: #{$orange};

      display: flex;
      align-items: center;
      color: $darkGreen;
      transition: 0.3s all ease;
      cursor: pointer;
      font-size: 1.6rem;
      margin-left: auto;
      padding: 15px 15px 5px 5px;

      &:hover {
        --bg-color: #{$lightOrange};
      }
    }

    &__title {
      padding: 10px;
      display: inline-block;

      font-size: 1.6rem;
      font-weight: 500;
      color: white;
      text-align: center;
      background-color: var(--color);
      cursor: pointer;
      transition: 0.3s all ease;

      /**
      * Meal type variants
      */

      &--breakfast {
        --color: #{$lightGreen};
        &:hover {
          --color: #{$green};
        }
      }

      &--lunch {
        --color: #{$blue};
        &:hover {
          --color: #{rgba($blue, 0.8)};
        }
      }

      &--dinner {
        --color: #{$orange};
        &:hover {
          --color: #{$lightOrange};
        }
      }
    }
  }

  /**
  * Meal description
  */

  &__meal {
    font-size: 1.8rem;
    font-weight: 700;
    font-family: $gloria;
    line-height: 1.2;
    padding: 15px 30px 15px 20px;
  }
}
</style>