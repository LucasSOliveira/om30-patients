<template>
  <OM30MainPage :title="salutation">
    <section class="home-cards container">
      <div
        v-for="(navItem, index) in menuNavigation"
        :key="`home-nav-item-${index}`"
        class="card"
        @keydown.enter="changeRoute(navItem.name)"
        @click="changeRoute(navItem.name)">
        <OM30Icon
          class="card__icon"
          :name="navItem.name.toLowerCase()"
        />
        <span class="card__title">{{ navItem.title || '' }}</span>
      </div>
    </section>
  </OM30MainPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import OM30Icon from '@/components/OM30Icon.vue'
import OM30MainPage from '@/modules/OM30MainPage.vue'

export default defineComponent({
  name: 'home-page',
  components: {
    OM30MainPage,
    OM30Icon
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      user: (state: any) => state.authStore.user
    }),
    salutation(): string {
      const now = new Date()
      const hours = now.getHours()
      let salutation = ''
      const gender = this.user?.gender || ''
      const prefixForUser = this.user?.role.prefixForUser[gender] || ''
      const userName = this.user?.name

      if (hours >= 5 && hours < 12) {
        salutation = 'Bom dia'
      } else if (hours >= 12 && hours < 18) {
        salutation = 'Boa tarde'
      } else {
        salutation = 'Boa noite'
      }
      return `${salutation}, ${prefixForUser} ${userName}!`
    },
    menuNavigation(): { name: string, title: string }[] {
      return this.user.menuNavigation
    }
  },
  methods: {
    changeRoute(route: string) {
      this.$router.push({ name: route })
    }
  }
})
</script>

<style lang="scss">
.home-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media only screen and (min-width: 768px) {
    justify-content: start;
  }
  & .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    width: auto;
    width: 200px;
    height: 180px;
    border: 1px solid $color-ui-light-gray;
    border-radius: 8px;
    margin-right: 16px;
    cursor: pointer;
    &__icon {
      fill: $color-ui-dark-gray;
      width: 46px;
      height: 40px;
    }
    &__title {
      margin-top: 16px;
    }
  }
}
</style>
