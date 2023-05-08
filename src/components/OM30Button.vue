<template>
  <button
    :id="id"
    :disabled="disabled || loading"
    :class="{
      'om30-button om30-button--default': true,
      'om30-button--secondary': secondary,
      'om30-button--loading': loading,
      'om30-button--disabled': disabled
    }">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'om30-button',
  props: {
    id: {
      type: String,
      default: 'button-id'
    },
    secondary: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">

.om30-button  {
  position: relative;
  cursor: pointer;
  border: none;
  border-radius: $border-radius-default;
  font-size: $font-size-default;
  padding: 8px;
  transition-property: background, transform, opacity, color;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.15, 0, 0.25, 1);
  width: 100%;
  height: 50px;
  &:focus { outline: none; }
  &--default {
    color: $color-ui-white;
    background: $color-brand-primary;
    &:enabled {
      &:hover {
        background: lighten($color-brand-primary, 5);
        transition-duration: 0.06s;
      }
      &:active,
      &:focus {
        background: darken($color-brand-primary, 5);
      }
    }
  }
  &--secondary {
    color: $color-text-primary;
    background: $color-ui-white;
    box-shadow: none;
    border: 2px solid $color-ui-dark-gray;
    &:enabled {
      &:hover {
        background: rgba($color-brand-primary, .06);
      }
      &:focus,
      &:active {
        background: rgba($color-brand-primary, .24);
      }
    }
  }
  &--loading {
    opacity: 0.5;
    cursor: not-allowed;
    color: transparent;
    &::after {
      content: ' ';
      border-width: 2px;
      border-style: solid;
      border-color: $color-ui-white;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      height: 1rem;
      width: 1rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      border-radius: 999px;
      animation: rotateLoading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }
  }
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

@keyframes rotateLoading {
  0% {
    transform: translate3d(-50%, -50%, 0) rotate(0);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}
</style>
