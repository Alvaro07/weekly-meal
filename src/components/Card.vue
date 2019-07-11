<template>
  <div class="c-card">
    <header class="c-card__header">
      <h3 class="c-card__header__day">{{ day }}</h3>
      <span class="c-card__header__add-button" @click.prevent="addMeal">
        <font-awesome-icon icon="plus-square"/>
      </span>
    </header>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    day: {
      validator: value => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].indexOf(value) !== -1,
      required: true
    },
    breakfast: {
      type: "String",
      required: false
    },
    lunch: {
      type: "String",
      required: false
    },
    dinner: {
      type: "String",
      required: false
    }
  },
  methods: {
    addMeal() {
      this.$emit('addMeal')
    }
  },
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
}
</style>