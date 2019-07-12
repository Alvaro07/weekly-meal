<template>
  <div class="c-input" :class="[extraClass, {'c-input--disabled': isDisabled}]">
    <label v-if="label" class="c-input__label">{{ label }}</label>
    <input
      class="c-input__field"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @keyup="e => onEventkeyUp(e)"
      @input="handleInput"
      v-model="content"
    >
    <span class="c-input__animate-border"></span>
  </div>
</template>

<script>
import { eventBus } from "../event-bus.js";

export default {
  name: "input-field",
  props: {
    type: String,
    value: String,
    extraClass: String,
    label: String,
    placeholder: String,
    disabled: Boolean
  },
  data() {
    return {
      content: this.value,
      isDisabled: this.disabled ? true : false
    };
  },
  methods: {
    onEventkeyUp(e) {
      if (this.onKeyUp !== null) this.$emit("onKeyUp", e.target.value);
    },
    handleInput(e) {
      this.$emit("input", this.content);
    },
    disable() {
      this.isDisabled = true;
    },
    activate() {
      this.isDisabled = false;
    }
  },
  updated() {
    eventBus.$on("resetField", () => {
      this.content = null;
    });
  }
};
</script>

<style lang="scss">
.c-input {
  position: relative;

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }

  &__field {
    width: 100%;
    height: 32px;

    font-size: 1.3rem;
    padding: 8px 0px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid $grey;

    &::placeholder {
      color: $grey;
    }

    &:focus {
      outline: none;

      & + .c-input__animate-border {
        width: 100%;
      }
    }
  }

  &__animate-border {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    display: block;
    background-color: $lightOrange;
    transition: 0.2s all ease;
  }
}
</style>