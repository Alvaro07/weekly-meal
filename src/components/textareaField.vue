<template>
  <div class="c-textarea" :class="[extraClass, {'c-textarea--disabled': isDisabled}]">
    <label v-if="label" class="c-textarea__label">{{ label }}</label>
    <textarea
      class="c-textarea__field"
      :placeholder="placeholder"
      @keyup="e => onEventkeyUp(e)"
      @input="handleInput"
      v-model="content"
    />
  </div>
</template>

<script>
import { eventBus } from "../event-bus.js";

export default {
  name: "textareaField",
  props: {
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
    },
    addContent(contentText) {
      this.content = contentText;
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
.c-textarea {
  position: relative;

  /**
  * Disabled state
  */

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }

  /**
  * Textarea element
  */

  &__field {
    width: 100%;
    height: 60px;
    font-size: 1.3rem;
    padding: 10px;
    border: 1px solid $lightGrey;

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

  /**
  * Label element
  */

  &__label {
    padding-bottom: 10px;
    display: block;
  }
}
</style>