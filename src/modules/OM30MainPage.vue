<template>
    <main class="om30-main-page-module">
      <section class="module-header container">
        <h1 class="module-header__title">{{ getTitle }}</h1>
      </section>
      <slot
        :class="{'page-container': true}"
      />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'om30-main-page-module',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    getTitle() {
      return this.title || this.$route.meta.title
    }
  }
})
</script>

<style lang="scss">
.om30-main-page-module {
  width: 100%;
  overflow-y: auto;
  margin-top: 30px;
  @media only screen and (min-width: 768px) {
    margin-top: 40px;
  }
  & .module-header {
    margin-bottom: 26px;
    &__title {
      font-size: 24px;
      line-height: 26px;
      width: 100%;
      margin: 0;
      @media only screen and (min-width: 768px) {
        font-size: 26px;
        line-height: 32px;
        text-align: left;
      }
    }
  }
}

</style>
