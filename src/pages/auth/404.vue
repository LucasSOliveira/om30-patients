<template>
  <div class="error">
    <img src="../../assets/icons/404.svg" alt="Error" />
    <h1>Ops! A página que você buscou não está disponível.</h1>
    <span
      class="back-to-home"
      @keydown.enter="redirectToHome()"
      @click="redirectToHome()">
      Voltar para a home
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'om30-erro-page',
  methods: {
    redirectToHome() {
      this.$router.push({ name: 'Home' })
    }
  }
})
</script>

<style lang="scss">
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  & .back-to-home {
    text-decoration: underline;
    font-weight: 700;
    font-size: 20px;
    cursor: pointer;
    color: $color-brand-primary;
  }
  img {
    width: 130px;
    margin: 0 auto;
  }
}
</style>
