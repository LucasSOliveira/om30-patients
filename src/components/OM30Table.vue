<template>
  <div class="om30-table">
    <table class="table">
      <thead class="thead">
        <tr>
          <th
            v-for="(header, index) in tHeaders"
            :key="`om30-table-th-${index}`"
            class="th">
            <div class="th__content">
              {{ header }}
            </div>
          </th>
        </tr>
      </thead>
      <template v-if="loading">
        <tbody class="tbody">
        <tr
          v-for="(lines, tIndex) in Array(5)"
          :key="tIndex"
          class="trow">
          <td
            v-for="(header, index) in tHeaders"
            :key="index"
            class="tdata">
            <span class="tdata--loading">{{ header ? `${'M'.repeat(10)}:` : '' }}</span>
          </td>
        </tr>
      </tbody>
      <tbody class="tbody-mobile">
        <div
            v-for="(lines, tIndex) in Array(5)"
            :key="`om30-table-mobile-tr-${tIndex}`"
            class="tbody-mobile-container">
          <div class="mobile-th">
            <span
              v-for="(header, index) in tHeaders"
              :key="`om30-table-mobile-th-${index}`">
              {{ header ? `${header}:` : '' }}
            </span>
          </div>
          <div class="mobile-tr-content">
            <div
              v-for="(header, index) in tHeaders"
              :key="`om30-table-mobile-td-loading-${index}`"
              class="mobile-tr mobile-tr--loading">
              {{ header ? `${'M'.repeat(10)}:` : '' }}
            </div>
          </div>
        </div>
      </tbody>
      </template>
      <template v-else>
        <tbody class="tbody">
          <tr
            v-for="(lines, tIndex) in tData"
            :key="tIndex"
            class="trow">
              <slot
                :row="lines"
                :index="tIndex">
                  <td
                    v-for="(line, index) in lines"
                    :key="index"
                    class="tdata">
                    {{ line }}
                  </td>
              </slot>
          </tr>
        </tbody>
        <tbody class="tbody-mobile">
          <div
              v-for="(lines, tIndex) in tData"
              :key="`om30-table-mobile-tr-${tIndex}`"
              class="tbody-mobile-container">
            <div class="mobile-th">
              <span
              v-for="(header, index) in tHeaders"
              :key="`om30-table-mobile-th-${index}`">
                {{ header ? `${header}:` : '' }}
              </span>
            </div>
            <div class="mobile-tr-content">
              <div class="mobile-tr">
                <slot :row="lines" :index="tIndex"></slot>
              </div>
            </div>
          </div>
        </tbody>
      </template>
    </table>
    <div class="om30-table-nodata" v-if="!loading && !tData.length">
      <h2>{{ errorMessage }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'om30-table',
  props: {
    tHeaders: {
      type: Array,
      default: () => []
    },
    tData: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: 'Dados não encontrados'
    }
  }
})
</script>

<style lang="scss">
.om30-table {
  width: 100%;
  overflow-x: auto;
  min-height: 475px;
  .table {
    border-collapse: separate;
    height: 100%;
    width: 100%;
    & .thead {
      height: 100%;
      & .th {
        position: sticky;
        text-align: left;
        color: $color-text-secondary;
        display: none;
        font-size: 12px;
        @media only screen and (min-width: 768px) {
          display: table-cell;
        }
        @media only screen and (min-width: 960px) {
          font-size: 14px;
        }
        &__content {
          display: flex;
          align-items: center;
          padding: 12px 6px 12px 0;
        }
      }
    }
    & .tbody {
      height: 100%;
      display: none;
      @media only screen and (min-width: 768px) {
        display: table-row-group;
      }
      & .trow {
        min-height: 70px;
        & td {
          padding: 12px 6px 12px 0;
          text-align: left;
          border-top: solid 1px $color-ui-dark-gray;
          & .tdata--loading {
            width: 100%;
            margin: 8px 0;
            line-height: 26px;
            color: transparent;
            border-radius: $border-radius-light;
            animation: pulse-bg 1s infinite;
          }
          @media only screen and (min-width: 768px) {
            font-size: 14px;
          }
          @media only screen and (min-width: 960px) {
            font-size: 16px;
          }
        }
      }
    }
    & .tbody-mobile {
      @media only screen and (min-width: 768px) {
        display: none;
      }
      & .tbody-mobile-container {
        display: flex;
        width: 100%;
        border: 1px solid $color-ui-light-gray;
        border-radius: 8px;
        padding: 8px 10px;
        margin-bottom: 8px;
        & .mobile-th {
          display: flex;
          flex-direction: column;
          span {
            font-size: 14px;
            line-height: 20px;
            color: $color-text-secondary;
            padding: 8px 0;
          }
        }
        & .mobile-tr-content {
          margin-left: 6px;
          & .mobile-tr  {
            &--loading {
              width: 100%;
              margin: 8px 0;
              line-height: 26px;
              color: transparent;
              border-radius: $border-radius-light;
              animation: pulse-bg 1s infinite;
            }
            display: flex;
            flex-direction: column;
            td {
              font-size: 16px;
              line-height: 20px;
              padding: 8px 0;
            }
          }
        }
      }
    }
  }
}
.om30-table-nodata {
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes pulse-bg {
  0% {
    background-color: #ddd;
  }
  50% {
    background-color: #d0d0d0;
  }
  100% {
    background-color: #ddd;
  }
}
</style>
