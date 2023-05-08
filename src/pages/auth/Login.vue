<template>
    <main class="login">
      <section class="login__hero">
        <img src="../../assets/images/Hero.svg" alt="Hero">
      </section>
      <section class="login form-container">
        <div class="login form-content">
          <img
            class="login__logo"
            src="../../assets/images/Logo.svg"
            alt="OM30 Pacientes">
          <h3 class="login__title">Login</h3>
          <form
            @submit.prevent="onSubmit()"
            class="login-form">
            <OM30Input
              id="login-input-email"
              class="login-form__input"
              label="Email"
              name="email"
              :mask="'E'.repeat(30)"
              placeholder="lucas@mail.com"
              :errorMessage="validate?.email || ''"
              :errorCondition="!!validate?.email"
              :disabled="loading"
              v-model="email"
            />
            <OM30Input
              id="login-input-password"
              class="login-form__input"
              label="Senha"
              name="password"
              type="password"
              :mask="'E'.repeat(30)"
              placeholder="****"
              :disabled="loading"
              :errorMessage="validate?.password || ''"
              :errorCondition="!!validate?.password"
              v-model="password"
            />
            <OM30Button
              id="login-submit"
              type="submit"
              :disabled="fieldsWithError"
              :loading="loading">
              Entrar
            </OM30Button>
          </form>
          <span
            v-show="errorMessage"
            class="login__error-message">
            X - {{ errorMessage }}
          </span>
        </div>
      </section>
    </main>
</template>

<script lang="ts">
import * as Yup from 'yup'
import { mapActions } from 'vuex'
import { defineComponent } from 'vue'
import OM30Input from '../../components/OM30Input.vue'
import OM30Button from '../../components/OM30Button.vue'

export default defineComponent({
  name: 'login-page',
  components: {
    OM30Button,
    OM30Input
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      loading: false
    }
  },
  computed: {
    validate() {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('E-mail inválido!')
          .required('E-mail é obrigatório!'),

        password: Yup.string()
          .min(4, 'A senha deve conter 4 caracteres!')
          .required('A senha é obrigatória!')
      })
      try {
        schema.validateSync({
          email: this.email,
          password: this.password
        }, { abortEarly: false })
        return {}
      } catch (error: any) {
        return error.inner.reduce((acc: any, error: any) => {
          acc[error.path] = error.message

          return acc
        }, {})
      }
    },
    fieldsWithError(): boolean {
      return !!this.validate?.password || !!this.validate?.email || !!this.errorMessage
    }
  },
  watch: {
    email(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.errorMessage = ''
      }
    },
    password(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.errorMessage = ''
      }
    }
  },
  methods: {
    ...mapActions('authStore', [ 'LOGIN' ]),
    onSubmit() {
      if (!this.fieldsWithError) {
        const email = this.email
        const password = this.password

        this.loading = true
        this.LOGIN({ email, password })
          .then(() => {
            this.errorMessage = ''
            this.$router.push({ name: 'Home' })
          })
          .catch(error => {
            this.errorMessage = error.response.data.message || error
            this.loading = false
          })
      }
    }
  }
})
</script>

<style lang="scss">
.login {
  display: flex;
  background-color: $color-ui-background-light-green;
  &__hero {
    display: none;
    @media only screen and (min-width: 768px) {
      background-color: $color-ui-background-normal-green;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 40%;
      max-width: 560px;
      padding: 0 26px;
    }
  }
  &.form-container {
    display: flex;
    height: 100vh;
    padding: 0 1rem;
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
  }
  &.form-content {
    display: block;
    width: 100%;
  }
  &__logo {
    margin-bottom: 50px;
    width: 100%;
    max-width: 270px;
  }
  &__title {
    font-size: 24px;
    color: $color-text-primary;
    margin-bottom: 20px;
    &::after {
      content: "";
      width: 50px;
      height: 2px;
      position: relative;
      display: block;
      margin-top: 10px;
      background-color: $color-ui-dark-gray;
    }
  }
  .login-form {
    width: 100%;
    div.login-form__input {
      margin-bottom: 16px;
    }
  }
  &__error-message {
    color: $color-ui-danger;
    display: block;
    font-size: 12px;
    font-weight: 500;
    margin-top: 4px;
    width: 100%;
  }
}
</style>
