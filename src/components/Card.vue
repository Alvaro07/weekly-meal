<template>
  <div class="c-card" :id="day">
    <header class="c-card__header" @click.prevent="addMeal">
      <h3 class="c-card__header__day">{{ day | capitalize }}</h3>
      <span class="c-card__header__add-button">
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

      <div v-if="loading" class="c-card__loader-wrap">
        <Loader/>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loader from "./Loader";

export default {
  name: "Card",
  components: {
    Loader
  },
  data() {
    return {
      loading: false
    };
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
    },
    activeLoader() {
      this.loading = true;
    },
    removeLoader() {
      this.loading = false;
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
    --button-color: #{$darkGreen};

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: $silver;
    cursor: pointer;

    &:hover {
      .c-card__header__day,
      .c-card__header__add-button {
        --button-color: #{$orange};
      }
    }

    &__day {
      text-align: center;
      font-size: 2.2rem;
      font-weight: 500;
      color: var(--button-color);
      transition: 0.3s all ease;
    }

    &__add-button {
      font-size: 2.1rem;
      color: var(--button-color);
      cursor: pointer;
      transition: 0.3s all ease;
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
      --bg-color: #{rgba($silver, 0.6)};

      display: flex;
      align-items: center;
      color: $darkGreen;
      transition: 0.3s all ease;
      cursor: pointer;
      font-size: 1.6rem;
      margin-left: auto;
      padding: 5px 7px;
      margin-top: 10px;
      margin-right: 10px;
      background-color: var(--bg-color);
      border-radius: 50%;

      &:hover {
        --bg-color: #{rgba($silver, 1)};
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

  /**
  * Loader wrap
  */

  &__loader-wrap {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 42px;
    left: 0;

    width: 100%;
    height: calc(100% - 42px);
    background-color: rgba($beige, 0.5);
  }
}
</style>