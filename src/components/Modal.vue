<template>
  <transition name="modal-fade">
    <div class="c-modal">
      <div class="c-modal__wrap">
        <span class="c-modal__wrap__icon-close" @click="closeModal">
          <font-awesome-icon icon="times-circle"/>
        </span>

        <header v-if="title" class="c-modal__header">
          <h2 class="c-modal__header__title">{{ title }}</h2>
        </header>

        <main class="c-modal__content">
          <slot>No content</slot>
        </main>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  name: "modal",
  props: ["title"],
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>


<style lang="scss">
.c-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
  padding: 20px;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;

  background-color: rgba($darkGrey, 0.8);

  /**
  * Modal container wrap
  */

  &__wrap {
    position: relative;
    width: 100%;
    max-width: 640px;
    max-height: 70vh;
    display: flex;
    flex-direction: column;

    background-color: white;
    border-radius: 5px;

    &__icon-close {
      position: absolute;
      right: -10px;
      top: -15px;

      color: $darkGreen;
      font-size: 3rem;

      padding: 3px;
      border-radius: 50%;
      background-color: white;
      cursor: pointer;
      transition: 0.3s all ease;

      &:hover {
        color: $orange;
      }
    }
  }

  /**
  * Possible header
  */

  &__header {
    padding: 15px 20px;
    border-bottom: 1px solid $lightGrey;

    &__title {
      font-size: 2rem;
      font-weight: 700;
    }
  }

  /**
  * Content
  */

  &__content {
    overflow: auto;
    padding: 20px;
  }
}

/**
  * Modal animation
  */

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
