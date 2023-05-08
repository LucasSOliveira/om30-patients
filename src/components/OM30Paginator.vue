<template>
  <div class="paginator">
    <div class="action">
      <OM30Icon
        name="arrow"
        v-show="!isFristPage"
        class="action__button action__prev"
        @click="setPreviousPage()"
      />
      <span
        v-for="(page, index) in pages()"
        :key="index"
        :class="{
          'action__pages': true,
          'action__pages--select': page === currentPage
        }"
        @keydown.enter="setPage(page)"
        @click="setPage(page)">
        {{ page }}
      </span>
      <OM30Icon
        v-show="!isLastPage"
        name="arrow"
        class="action__button paginator__next"
        @click="setNextPage()"
      />
    </div>
    <div class="paginator__total-pages">
      <span>{{ `${labelTotalPages}`}}</span>
    </div>
  </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue'
import OM30Icon from './OM30Icon.vue'

export default defineComponent({
  name: 'OM30Paginator',
  components: {
    OM30Icon
  },
  props: {
    totalPages: {
      type: [ Number, String ],
      default: 1
    },
    currentPage: {
      type: [ Number, String ],
      default: 1
    },
    totalItems: {
      type: [ Number, String ],
      default: 1
    }
  },
  data() {
    return {
      pageSizeOptions: [ 5, 10, 20 ],
      pageSize: 10,
      pags: [ 1 ]
    }
  },
  computed: {
    isFristPage() {
      return this.currentPage === 1
    },
    isLastPage() {
      return this.currentPage === this.totalPages
    },
    labelTotalPages() {
      const deal = Number(this.totalPages) <= 1 ? 'página' : 'páginas'

      return `${this.currentPage} de ${this.totalPages} ${deal}`
    }
  },
  watch: {
    currentPage(value) {
      this.$emit('currentPage', value)
    }
  },
  methods: {
    setPreviousPage(): void {
      this.$emit('previous-page')
    },
    setNextPage(): void {
      this.$emit('next-page')
    },
    setPage(page: number): void {
      if (page !== this.currentPage) {
        this.$emit('change-page', page)
      }
    },
    pages(): Array<number> {
      if (!this.currentPage) { return [] }
      const FIRST_PAGE = 1
      const SECOND_PAGE = 2
      const PENULTIMATE_PAGE = Number(this.totalPages) - 1

      if (this.currentPage === FIRST_PAGE) {
        return this.createPages(this.currentPage, this.currentPage + 4)
      }
      if (this.currentPage === SECOND_PAGE) {
        return this.createPages(this.currentPage - 1, this.currentPage + 3)
      }
      if (this.currentPage === this.totalPages) {
        return this.createPages(Number(this.currentPage) - 4, Number(this.currentPage))
      }
      if (this.currentPage === PENULTIMATE_PAGE) {
        return this.createPages(Number(this.currentPage) - 3, this.currentPage + 1)
      }

      return this.createPages(Number(this.currentPage) - 2, Number(this.currentPage) + 2)
    },
    createPages(firstPage: number, lastPage: number): Array<number> {
      const pages = []
      let i = Math.max(firstPage, 1)

      if (lastPage > Number(this.totalPages)) {
        lastPage = Number(this.totalPages)
      }

      while (i <= lastPage) {
        pages.push(i)
        i++
      }
      return pages
    }
  }
})
</script>

  <style lang="scss">
  .paginator {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 26px;
    border: 1px solid #DEDEDE;
    border-radius: 8px;
    flex-direction: column;
    padding: 12px 8px;
    & .action {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;
      &__pages {
        padding: 0 8px;
        cursor: pointer;
        &--select {
          color: $color-brand-primary;
          cursor: default;
        }
      }
      &__button {
        fill: $color-ui-normal-gray;
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
      &__prev {
        transform: rotate(180deg);
      }
    }
    &__total-pages {
      font-size: 14px;
    }
  }
  </style>
