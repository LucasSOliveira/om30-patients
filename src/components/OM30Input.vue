<template>
  <div
    :class="{
      'om30-input': true,
      'om30-input--error': hasErrors,
      'om30-input--disabled': disabled,
    }">
    <label :for="id">
      <span
        v-if="label"
        class="om30-input__label">
        {{ label }}
      </span>
      <input
        ref="input"
        :class="{
          'om30-input__input': true,
          'om30-input__input--error': hasErrors,
          'om30-input__input--disabled': disabled,
        }"
        :id="id"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        v-bind="$attrs"
        v-mask="config"
        v-model="currentValue"
        @keydown.enter="action"
        @input="($event) => inputEvent($event)"
      />
      <OM30Icon om30-input__icon--error
        v-if="icon"
        :class="{
          'om30-input__icon': true,
          'om30-input__icon--error': hasErrors,
          'om30-input__icon--disabled': disabled,
        }"
        :name="icon"
        @click.self="action"
      />
      <span
        v-if="hasErrors"
        class="om30-input__error-message">
        {{ errorMessage }}
      </span>
    </label>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import tokens from '@/assets/directives/masker/tokens'
import mask from '@/assets/directives/masker/masker.directive'
import masker from '@/assets/directives/masker/masker'
import OM30Icon from '@/components/OM30Icon.vue'

export default defineComponent({
  name: 'om30-input',
  directives: { mask },
  components: {
    OM30Icon
  },
  props: {
    value: {},
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'input'
    },
    type: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: 'Error'
    },
    errorCondition: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    mask: {
      type: [ String, Array ],
      required: false,
      default: () => 'N'.repeat(240)
    },
    masked: {
      type: Boolean,
      default: false
    },
    tokens: {
      type: [ Object, String ],
      default: tokens
    }
  },
  data: () => ({
    currentValue: '',
    inputModel: '',
    lastValue: '',
    status: '',
    timeout: 0,
    hasErrors: false
  }),
  computed: {
    config() {
      return {
        mask: this.mask,
        masked: this.masked,
        tokens: this.tokens
      }
    },
    modelValue():string {
      return String(this.$attrs.modelValue)
    }
  },
  watch: {
    modelValue(newValue) {
      if (newValue !== this.lastValue) {
        this.refresh(newValue)
      }
    },
    masked() {
      this.refresh(this.currentValue)
    }
  },
  mounted() {
    this.refresh(this.modelValue)
  },
  methods: {
    inputEvent(event: Event): void {
      const inputElement = event.target as HTMLInputElement
      const inputValue = inputElement.value

      this.refresh(inputValue)
    },
    action(ev: Event): void {
      if (!this.disabled) {
        this.$emit('action', ev)
      }
    },
    refresh(value: string): void {
      this.currentValue = value || ''
      const refreshValue = masker(value, this.mask, this.masked, this.tokens)

      if (refreshValue !== this.lastValue) {
        this.validator()
        this.lastValue = refreshValue
        this.$emit('input', refreshValue)
      }
    },
    validator() {
      this.hasErrors = false
      this.status = 'typing'
      clearTimeout(this.timeout)
      this.timeout = this.invalidTimeout()
    },
    invalidTimeout() {
      return setTimeout(() => {
        this.hasErrors = this.errorCondition
        this.status = this.errorCondition ? 'invalid' : 'valid'
      }, 1000)
    }
  }
})
</script>
<style lang='scss' scoped>
.om30-input {
  font-size: $font-size-paragraph;
  display: block;
  position: relative;
  &--error {
    color: $color-ui-danger;
  }
  &--disabled {
    color: $color-ui-normal-gray;
    cursor: not-allowed;
  }
  &__label {
    display: block;
    margin-bottom: 4px;
    width: 100%;
  }
  &__input {
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
  &__icon {
    position: absolute;
    top: 18px;
    right: 16px;
    fill: $color-ui-dark-gray;
    cursor: pointer;
    &--error {
      fill: $color-ui-danger;
      cursor: default;
    }
    &--disabled {
      fill: $color-ui-normal-gray;
      cursor: not-allowed;
    }
  }
  &__error-message {
    color: $color-ui-danger;
    display: block;
    font-size: 12px;
    font-weight: 500;
    margin-top: 4px;
    position: absolute;
  }
}
</style>
