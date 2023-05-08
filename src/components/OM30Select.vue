<template>
  <div class="om30-select">
    <label
      :for="id">
      {{ label }}
      <select
        :id="id"
        :name="name"
        :disabled="disabled"
        class="om30-select__select"
        v-model="currentValue"
        @change="emitValue">
        <option
          v-for="(option, index) in options"
            :key="`${id}-option-${index}`"
            :value="option"
          >
          {{ getOptionLabel(option) }}
        </option>
      </select>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'om30-select',
  props: {
    id: {
      type: String,
      default: 'select-id'
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: {}
    }
  },
  computed: {
    modelValue():any {
      return this.$attrs.modelValue
    }
  },
  mounted() {
    this.currentValue = this.modelValue
  },
  methods: {
    emitValue() {
      this.$emit('selected', this.currentValue)
    },
    getOptionLabel(option: any): string {
      return option.label || option.name || option
    }
  }
})
</script>

<style lang="scss">
.om30-select {
  &__select {
    width: 100%;
    display: block;
    margin-top: 2px;
    border: 2px solid $color-ui-dark-gray;
    border-radius: $border-radius-default;
    outline: 0;
    padding: 8px 16px;
    height: 50px;
    max-height: 50px;
    &--error {
      color: $color-ui-danger;
      border-color: $color-ui-danger;
    }
    &--disabled {
      color: $color-ui-normal-gray;
      border-color: $color-ui-normal-gray;
      cursor: not-allowed;
    }
    &::placeholder {
      color: $color-ui-normal-gray;
    }
  }
}
</style>
