<template>
  <div>
    <NavHeader></NavHeader>
    <main class="dashboard">
      <ul class="dashboard__list">
        <li v-for="(item, index) in board.days" :key="index">
          <Card :day="item.day" @addMeal="() => openModal('modal-add', item.day)"></Card>
        </li>
      </ul>
    </main>

    <Modal v-show="modal.isOpen && modal.name === 'modal-add'" @close="closeModal" title="Add Meal">
      <div>
        <Tag type="breakfast" extraClass="margin-right-10" @onClick="selectTag" ref="breakfast"/>
        <Tag type="lunch" extraClass="margin-right-10" @onClick="selectTag" ref="lunch"/>
        <Tag type="dinner" @onClick="selectTag" ref="dinner"/>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavHeader from "../components/NavHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Tag from "../components/Tag";

export default {
  name: "dashboard",
  components: {
    NavHeader,
    Card,
    Modal,
    Tag
  },
  data() {
    return {
      modal: {
        name: null,
        isOpen: false
      },
      activeTag: null
    };
  },
  methods: {
    openModal(modal, day) {
      this.modal = { name: modal, isOpen: true };
    },
    closeModal() {
      this.modal = { name: null, isOpen: false };
    },
    selectTag(e) {
      if (this.$refs[e].isActive) {
        this.disableTags();
        this.activeTag = null;
      } else {
        this.disableTags();
        this.$refs[e].selectTag(true);
        this.activeTag = e;
      }
    },
    disableTags() {
      this.$refs.breakfast.selectTag(false);
      this.$refs.lunch.selectTag(false);
      this.$refs.dinner.selectTag(false);
    }
  },
  computed: mapState(["board"])
};
</script>

<style lang="scss">
.dashboard {
  --columns: 1;

  max-width: 1280px;
  margin: 0px auto;
  padding: 15px;

  &__list {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(var(--columns), 1fr);

    @include mediaTablet() {
      --columns: 3;
    }

    @include mediaDesktop() {
      --columns: 4;
    }
  }
}
</style>

