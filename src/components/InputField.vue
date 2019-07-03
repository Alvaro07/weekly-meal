<template>
  <div class="c-input" :class="extraClass">
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
export default {
  name: "input-field",
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    },
    extraClass: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      content: this.value
    };
  },
  methods: {
    onEventkeyUp(e) {
      if (this.onKeyUp !== null) this.$emit("onKeyUp", e.target.value);
    },
    handleInput(e) {
      this.$emit("input", this.content);
    }
  }
};
</script>

<style lang="scss">
.c-input {
  position: relative;

  &__field {
    width: 100%;
    height: 32px;

    font-size: 1.3rem;
    padding: 8px 10px;
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