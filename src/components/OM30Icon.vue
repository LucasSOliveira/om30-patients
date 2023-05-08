<template>
  <svg
    :width="icon.width"
    :height="icon.height"
    :viewBox="icon.viewBox"
    xmlns="http://www.w3.org/2000/svg">
      <path :d="icon.path"/>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import icons from '@/assets/icons/icons'

export default defineComponent({
  name: 'om30-icon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    icon() {
      return icons[this.name]
    }
  }
})
</script>
