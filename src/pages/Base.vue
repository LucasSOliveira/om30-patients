<template>
  <div class="base">
    <header :class="{ 'header': true, 'header--open': navigationOpen }">
      <div class="main">
        <img
          class="header__logo"
          src="../assets/images/Logo.svg"
          alt="OM30 Pacientes"
          @keydown.enter="changeRoute('Home')"
          @click="changeRoute('Home')">
        <div class="menu-hamburger">
          <label for="header-menu-hamburger">
            <input v-model="navigationOpen" id="header-menu-hamburger" type="checkbox">
            <div>
              <span></span>
            </div>
          </label>
        </div>
      </div>
      <nav
        :class="{
          'navigation': true,
          'navigation--open': navigationOpen
        }">
        <ul>
          <li @click="changeRoute('Home')" @keydown.enter="changeRoute('Home')">
            <OM30Icon name="home" />
            <span>
              Home
            </span>
          </li>
          <li
            v-for="(navItem, index) in menuNavigation"
            :key="`navItem-${index}`"
            @keydown.enter="changeRoute(navItem.name)"
            @click="changeRoute(navItem.name)">
            <OM30Icon :name="navItem.name.toLowerCase()" />
            <span>
              {{ navItem.title || '' }}
            </span>
          </li>
        </ul>
        <ul>
          <li>
            <OM30Icon name="user" />
            <span>{{ `${user.role.prefixForUser[user.gender]} ${user.name}` }}</span>
          </li>
          <li @keydown.enter="logout()" @click="logout()">
            <OM30Icon name="logout" />
            <span>Sair</span>
          </li>
        </ul>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import OM30Icon from '@/components/OM30Icon.vue'

export default defineComponent({
  name: 'base-application',
  components: {
    OM30Icon
  },
  data() {
    return {
      navigationOpen: false
    }
  },
  computed: {
    ...mapState({
      user: (state: any) => state.authStore.user
    }),
    menuNavigation(): { name: string, title: string }[] {
      return this.user.menuNavigation
    }
  },
  methods: {
    ...mapActions('authStore', [ 'CLEAR_USER' ]),
    logout() {
      this.CLEAR_USER()
      this.$router.push({ name: 'Login' })
    },
    changeRoute(route: string) {
      this.navigationOpen = false
      this.$router.push({ name: route })
    }
  }
})
</script>

<style lang="scss">
.base {
  height: 100vh;
  @media only screen and (min-width: 768px) {
    display: flex;
  }
  .header {
    z-index: 99;
    width: 100vw;
    top: 0;
    position: relative;
    padding: 0 16px;
    height: 60px;
    border-bottom: 1px solid $color-ui-light-gray;
    transition: 0.5s ease-in-out;
    background-color: $color-ui-background-light-green;
    @media only screen and (min-width: 768px) {
      height: 100vh;
      width: 15%;
      min-width: 160px;
      border-right: 1px solid $color-ui-light-gray;
      padding: 16px;
    }
    &--open {
      @media only screen and (max-width: 768px) {
        position: fixed;
        height: 100vh;
      }
    }
    &__logo {
      height: 40px;
      width: 110px;
      @media only screen and (min-width: 768px) {
        height: 60px;
        width: 140px;

      }
    }
    & .main {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    & .menu-hamburger {
      @media only screen and (min-width: 768px) {
        display: none;
      }

      div {
        display: block;
        width: 25px;
        height: 25px;
      }

      span {
        position: relative;
        background: $color-ui-dark-gray;
        display: block;
        width: 25px;
        height: 3px;
        top: 50%;
        transition: 0.5s ease-in-out;

        &::before,
        &::after {
          background: $color-ui-dark-gray;
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          transition: 0.5s ease-in-out;
        }

        &::before {
          top: -10px;
        }

        &::after {
          bottom: -10px;
        }
      }

      label input {
        display: none;

        &:checked+div span {
          border-radius: 2px;
          transform: rotate(45deg);
          height: 4.8px;
        }

        &:checked+div span::before {
          border-radius: 2px;
          transform: rotate(90deg);
          top: 0;
        }

        &:checked+div span::after {
          border-radius: 2px;
          transform: rotate(90deg);
          bottom: 0;
        }
      }
    }
  }
  .navigation {
    margin-top: 50px;
    height: calc(100% - 126px);
    overflow-x: auto;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    @media only screen and (min-width: 768px) {
      display: flex;
    }
    &--open {
      display: flex;
    }
    ul {
      display: flex;
      flex-direction: column;
      color: $color-ui-dark-gray;
      li {
        display: flex;
        align-items: center;
        cursor: pointer;

        &+li {
          margin-top: 12px;
        }
      }
      span {
        line-height: 30px;
        margin-left: 8px;
      }
      svg {
        width: 20px;
        height: 20px;
        fill: $color-ui-dark-gray;

        &--active {
          fill: $color-brand-primary;
        }
      }
    }
  }
}
</style>
