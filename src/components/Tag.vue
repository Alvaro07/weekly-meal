<template>
  <div
    class="c-tag"
    :class="[typeClass, extraClass, {'c-tag--is-active' : isActive}, {'c-tag--small' : small}]"
    @click.prevent="() => onButtonClick(type)"
  >{{ type | capitalize }}</div>
</template>

<script>
export default {
  name: "tag",
  props: {
    type: {
      validator: value => ["breakfast", "lunch", "dinner"].indexOf(value) !== -1,
      required: true
    },
    extraClass: {
      type: String,
      required: false
    },
    small: {
      type: Boolean,
      required: false
    },
    active: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    typeClass() {
      if (this.type === "breakfast") {
        return "c-tag--breakfast";
      } else if (this.type === "lunch") {
        return "c-tag--lunch";
      } else if (this.type === "dinner") {
        return "c-tag--dinner";
      }
    }
  },
  methods: {
    onButtonClick(type) {
      this.$emit("onClick", type);
    },
    selectTag(option) {
      this.isActive = option;
    }
  },
  mounted() {
    if (this.active) this.isActive = true;
  }
};
</script>

<style lang="scss" >
.c-tag {
  --padding-tag: 10px 20px;

  display: inline-block;
  padding: var(--padding-tag);

  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 3px;
  color: white;
  font-weight: 700;
  cursor: pointer;

  &--small {
    --padding-tag: 8px 20px;
  }

  &--breakfast {
    --bg-color: #{rgba($lightGreen, 0.8)};
    &:hover,
    &.c-tag--is-active {
      --bg-color: #{$lightGreen};
    }
  }

  &--lunch {
    --bg-color: #{rgba($blue, 0.8)};
    &:hover,
    &.c-tag--is-active {
      --bg-color: #{$blue};
    }
  }

  &--dinner {
    --bg-color: #{rgba($lightOrange, 0.8)};
    &:hover,
    &.c-tag--is-active {
      --bg-color: #{$lightOrange};
    }
  }
}
</style>