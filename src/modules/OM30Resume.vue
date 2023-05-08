<template>
  <div class="om30-resume-module--resume">
    <h3 class="om30-resume-module--resume__title">{{ data.title }}</h3>
    <div class="items-resume">
      <div
        v-for="(item, index) in data.items"
        :key="`${data.id || data.title}-item-${index}`"
        class="item-resume">
        <span class="item-resume__label">{{ item?.label }}</span>
        <span class="item-resume__value">{{ item?.value }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'om30-resume-module',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
})
</script>
<style lang="scss">
.om30-resume-module--resume {
  &__title {
    font-size: 18px;
    margin-bottom: 20px;
    border-bottom: 1px solid $color-ui-light-gray;
    padding: 10px 0;
    width: 100%;
  }
  & .items-resume {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    @media only screen and (min-width: 560px) {
      grid-template-columns: 1fr 1fr;
      gap: 16px 12px;
    }
    @media only screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 32px 12px;
    }
    & .item-resume {
      &__label {
        display: block;
        font-size: 14px;
        margin-bottom: 5px;
        color: $color-ui-normal-gray;
      }
      &__value {
        font-weight: 600;
        font-size: 16px;
        display: block;
      }
    }
  }
}

</style>
