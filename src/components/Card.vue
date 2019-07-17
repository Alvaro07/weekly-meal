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
          <font-awesome-icon
            icon="times"
            class="c-card__header-type__remove"
            @click.prevent="() => removeMeal('breakfast')"
          />
          <span
            class="c-card__header-type__title c-card__header-type__title--breakfast"
            @click.prevent="() => openMeal(data.breakfast, 'breakfast')"
          >Breakfast</span>
        </h3>

        <p class="c-card__meal">{{data.breakfast}}</p>
      </div>
      <div class="c-card__content__item" v-if="data.lunch">
        <h3 class="c-card__header-type">
          <font-awesome-icon
            icon="times"
            class="c-card__header-type__remove"
            @click.prevent="() => removeMeal('lunch')"
          />
          <span
            class="c-card__header-type__title c-card__header-type__title--lunch"
            @click.prevent="() => openMeal(data.lunch, 'lunch')"
          >Lunch</span>
        </h3>
        <p class="c-card__meal">{{data.lunch}}</p>
      </div>
      <div class="c-card__content__item" v-if="data.dinner">
        <h3 class="c-card__header-type">
          <font-awesome-icon
            icon="times"
            class="c-card__header-type__remove"
            @click.prevent="() => removeMeal('dinner')"
          />
          <span
            class="c-card__header-type__title c-card__header-type__title--dinner"
            @click.prevent="() => openMeal(data.dinner, 'dinner')"
          >Dinner</span>
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

  background: rgba($gold, 0.1);
  border: 1px solid rgba($gold, 0.4);
  border-radius: 2px;
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
    padding: 10px;
    background-color: rgba($gold, 0.4);

    &__day {
      text-align: center;
      font-family: $paytone;
      font-size: 1.8rem;
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

  &__content {
    // padding: 10px;

    &__item {
      &:not(:last-child) {
        border-bottom: 1px solid rgba($gold, 0.2);
      }
    }
  }

  /*/ Cabecera de cada comida /*/

  &__header-type {
    display: inline-flex;
    width: 100%;

    align-items: center;
    transition: 0.3s all ease;
    background-color: $beige;
    border-bottom: 1px solid rgba($gold, 0.2);
    padding: 0 10px;

    &__remove {
      --color: #{$darkGreen};

      color: var(--color);
      transition: 0.3s all ease;
      cursor: pointer;
      font-size: 1.6rem;

      &:hover {
        --color: #{$lightOrange};
      }
    }

    &__title {
      padding: 10px 15px;
      flex: 1;

      font-size: 2rem;
      font-weight: 700;
      font-family: $gloria;
      text-shadow: 1px 1px rgba(white, 0.5);
      text-align: center;
      color: var(--color);
      cursor: pointer;

      &--breakfast {
        --color: #{$green};
        &:hover {
          --color: #{$lightGreen};
        }
      }

      &--lunch {
        --color: #{$blue};
        &:hover {
          --color: #{$darkGreen};
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

  &__meal {
    font-size: 1.8rem;
    font-weight: 700;
    font-family: $gloria;
    line-height: 1.2;

    padding: 20px;
  }
}
</style>