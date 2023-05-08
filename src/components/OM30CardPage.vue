<template>
    <div class="om30-card-page">
      <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'om30-card-page',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss">
.om30-card-page {
  width: 100%;
  padding: 16px;
  border: 1px solid $color-ui-light-gray;
  border-radius: 8px;
  margin-bottom: 32px;
}
</style>
