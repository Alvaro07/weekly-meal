<template>
  <a
    v-if="type === 'buttonLink'"
    :href="href"
    class="c-button"
    :class="[{'c-button--small ': small}, {'c-button--disabled ': isDisabled}, variantClass, extraClass, {' c-button--full-width': fullWidth}]"
  >
    <font-awesome-icon v-if="icon" :icon="icon" class="c-button__icon"/>
    <span v-if="text" class="c-button__text">{{ text }}</span>
  </a>

  <button
    v-else
    class="c-button"
    @click.prevent="onButtonClick"
    :class="[{'c-button--small ': small}, {'c-button--disabled ': isDisabled}, variantClass, extraClass, {' c-button--full-width': fullWidth}]"
  >
    <font-awesome-icon v-if="icon" :icon="icon" class="c-button__icon"/>
    <span v-if="text" class="c-button__text">{{ text }}</span>
  </button>
</template>


<script>
export default {
  name: "Button",
  props: {
    text: String,
    type: String,
    href: String,
    icon: String,
    extraClass: String,
    small: Boolean,
    disabled: Boolean,
    variant: String,
    fullWidth: Boolean
  },
  data() {
    return {
      isDisabled: this.disabled
    };
  },
  methods: {
    onButtonClick() {
      this.$emit("onClick");
    },
    activeButton() {
      this.isDisabled = false;
    },
    disabledButton() {
      this.isDisabled = true;
    }
  },
  computed: {
    variantClass() {
      if (this.variant === "orange") {
        return "c-button--orange";
      }
    }
  }
};
</script>

<style lang="scss">
.c-button {
  --bg-color: #{$green};
  --bg-hover-color: #{$lightGreen};
  --border-color: #{$lightGreen};
  --font-color: white;
  --padding-size: 10px 15px;
  --font-text: 1.6rem;
  --icon-size: 2rem;
  --icon-space: 10px;

  display: inline-flex;
  align-items: center;

  cursor: pointer;
  padding: var(--padding-size);
  background-color: var(--bg-color);
  border-radius: 5px;
  border: 1px solid var(--border-color);
  transition: 0.3s all ease;

  font-size: var(--font-text);
  font-weight: 700;
  color: var(--font-color);
  text-decoration: none;

  &:hover {
    --bg-color: var(--bg-hover-color);
  }

  &__icon {
    font-size: var(--icon-size);

    & + .c-button__text {
      margin-left: var(--icon-space);
    }
  }

  /**
  * Modifiers
  */

  &--full-width {
    width: 100%;
    justify-content: center;
  }

  &--small {
    --padding-size: 10px;
    --font-text: 1.4rem;
    --icon-size: 1.6rem;
    --icon-space: 15px;
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
    user-select: none;
  }

  /**
  * Color variants
  */

  &--orange {
    --bg-color: #{$orange};
    --bg-hover-color: #{$lightOrange};
    --border-color: #{$lightOrange};
  }
}
</style>
