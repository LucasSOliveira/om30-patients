<template>
  <OM30MainPage class="patients-page">
    <section class="container">
      <OM30CardPage>
        <div class="card-header">
          <div class="filter">
            <OM30Input
              id="input-filter"
              icon="search"
              :placeholder="`Pesquise aqui por ${filterBy.label}`"
              :mask="inputFilterMask"
              v-model="filterInput"
              :errorCondition="filterBy?.id === 'cpf' && !!cpfValidator && !!filterInput"
              :errorMessage="cpfValidator"
              @action="searchByFilter()"
            />
            <OM30Select
              id="patients-filter-select"
              class="filter__select"
              v-model="filterBy"
              :options="filterOptions"
              @selected="setFilterby"
            />
          </div>
          <div class="action">
            <OM30Button
              v-if="canCreate"
              class="action__button"
              @click="$router.push({ name: 'CreatePatient' })">
              <OM30Icon
                class="action__button-icon"
                name="add"/>
              <span>Adicionar</span>
            </OM30Button>
          </div>
        </div>
        <OM30Table
          class="card-table"
          :tHeaders="tHeader"
          :loading="loading"
          :t-data="patients">
          <template v-slot="{ row }">
            <td>{{ `${row.name} ${row.lastName }` }}</td>
            <td>{{ row.cpf }}</td>
            <td>{{ row.cns }}</td>
            <td class="table-ations">
              <OM30Icon
                v-if="canEdit"
                class="table-ations__icon"
                @click="editPatient(row)"
                name="edit"/>
              <OM30Icon
                v-if="canDelete"
                @click="deletePatient(row)"
                class="table-ations__icon"
                name="delete"/>
              <OM30Icon
                @click="showMoreData(row)"
                class="table-ations__icon"
                name="user"/>
            </td>
          </template>
        </OM30Table>
        <OM30Paginator
          @previousPage="changePage(searchParams._page - 1)"
          @nextPage="changePage(searchParams._page + 1)"
          @changePage="changePage"
          @changePageSize="changePageSize"
          :totalPages="totalPages"
          :totalItems="totalItems"
          :currentPage="searchParams._page"/>
      </OM30CardPage>
    </section>
  </OM30MainPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Swal from 'sweetalert2'
import { mapState, mapActions } from 'vuex'
import { Patient, SearchParams } from '@/store/patients/patients.types'
import { cpfSchema } from '@/assets/utils/validateFunctionsSchema'
import OM30MainPage from '@/modules/OM30MainPage.vue'
import OM30CardPage from '@/components/OM30CardPage.vue'
import OM30Table from '@/components/OM30Table.vue'
import OM30Input from '@/components/OM30Input.vue'
import OM30Select from '@/components/OM30Select.vue'
import OM30Button from '@/components/OM30Button.vue'
import OM30Icon from '@/components/OM30Icon.vue'
import OM30Paginator from '@/components/OM30Paginator.vue'
// eslint-disable-next-line import/no-cycle
import { getters } from '@/store/auth/auth.store'

export default defineComponent({
  name: 'patients-page',
  components: {
    OM30MainPage,
    OM30CardPage,
    OM30Table,
    OM30Paginator,
    OM30Input,
    OM30Select,
    OM30Button,
    OM30Icon
  },
  data() {
    return {
      filterInput: '',
      patient: { name: '' },
      tHeader: [ 'Nome', 'CPF', 'CNS', '' ],
      loading: false,
      filterBy: { id: 'cpf', label: 'CPF' },
      filterOptions: [ { id: 'name', label: 'Nome' }, { id: 'cpf', label: 'CPF' } ],
      searchParams: {
        _page: 1,
        _limit: 10,
        _sort: 'name',
        _order: 'asc'
      }
    }
  },
  computed: {
    ...mapState({
      patients: (state: any) => state.patientsStore.patients,
      totalItems: (state: any) => state.patientsStore.totalItems,
      totalPages: (state: any) => state.patientsStore.totalPages
    }),
    canCreate(): boolean {
      return getters.hasAction('PATIENTS_CREATE')
    },
    canEdit(): boolean {
      return getters.hasAction('PATIENTS_EDIT')
    },
    canDelete(): boolean {
      return getters.hasAction('PATIENTS_DELETE')
    },
    inputFilterMask() {
      const id: any = this.filterBy?.id

      return id === 'cpf'
        ? '###.###.###-##'
        : 'M'.repeat(15)
    },
    cpfValidator() {
      try {
        cpfSchema.validateSync({
          cpf: this.filterInput
        }, { abortEarly: false })
        return ''
      } catch (error: any) {
        return error.message
      }
    }
  },
  mounted() {
    this.getPatients(this.searchParams)
  },
  unmounted() {
    this.CLEAR_PATIENTS()
  },
  methods: {
    ...mapActions('patientsStore', [ 'GET_PATIENTS', 'SET_PATIENT', 'CLEAR_PATIENTS', 'DELETE_PATIENT' ]),
    searchByFilter(): void {
      if (this.filterInput) {
        const keyFilter = this.filterBy.id

        this.searchParams = { ...this.searchParams, [keyFilter]: this.filterInput }
        this.getPatients(this.searchParams)
      }
    },
    searchParamsClear(): void {
      this.filterInput = ''
      this.searchParams = {
        _page: 1,
        _limit: this.searchParams._limit,
        _sort: 'name',
        _order: 'asc'
      }
    },
    editPatient(patient: any) {
      this.SET_PATIENT(patient)
      this.$router.push({
        name: 'EditPatient',
        params: {
          cpf: patient.cpf
        }
      })
    },
    deletePatient(patient: Patient) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          actions: 'swal-action-delete',
          cancelButton: 'om30-button om30-button--secondary',
          confirmButton: 'om30-button om30-button--default'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Você deseja realmente apagar esse usuário? Essa ação é irreversível!',
        confirmButtonText: 'Deletar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        reverseButtons: true,
        preConfirm: () => {
          Swal.showLoading()

          return this.DELETE_PATIENT(patient)
            .then(() => Swal.fire({
              position: 'center',
              icon: 'success',
              title: `Paciente ${patient.name} excluido com sucesso!`,
              showConfirmButton: false,
              timer: 1500
            }))
            .catch(() => Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao exclir paciente!',
              showConfirmButton: false,
              timer: 1500
            }))
            .finally(() => {
              this.searchParamsClear()
              this.getPatients(this.searchParams)
            })
        }
      })
    },
    showMoreData(patient: Patient) {
      this.SET_PATIENT(patient)
      this.$router.push({
        name: 'PatientData',
        params: {
          cpf: patient.cpf
        }
      })
    },
    setFilterby(value: any) {
      this.filterBy = value
    },
    changePageSize(pageSize: number) {
      this.searchParams._limit = pageSize
      this.changePage(1)
    },
    changePage(page: number) {
      if (page <= this.totalPages && page > 0) {
        this.searchParams._page = page
        this.getPatients(this.searchParams)
      }
    },
    getPatients(searchParams: SearchParams) {
      this.loading = true
      return this.GET_PATIENTS(searchParams)
        .finally(() => {
          this.loading = false
        })
    }
  }
})
</script>

<style lang="scss">
.patients-page {
  & .card-header {
    display: block;
    @media only screen and (min-width: 768px) {
      display: flex;
      justify-content: space-between;
    }
    & .filter {
      display: block;
      @media only screen and (min-width: 768px) {
        display: flex;
      }
      div.om30-input {
        width: 100%;
        @media only screen and (min-width: 768px) {
          width: 200px;
        }
        @media only screen and (min-width: 960px) {
          width: 300px;
        }
      }
      &__select {
        width: 100%;
        margin-top: 8px;
        @media only screen and (min-width: 768px) {
          width: 120px;
          margin-top: 0;
          margin-left: 8px;
        }
      }
    }
    & .action {
      width: 100%;
      margin-top: 18px;
      @media only screen and (min-width: 768px) {
        width: 130px;
        margin: 0;
      }
      &__button-icon {
        fill: $color-ui-white;
        margin-right: 5px;
        width: 20px;
        height: 20px;
      }
      &__button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
    }
  }
  & .card-table {
    margin-top: 56px;
    .table-ations {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      @media only screen and (min-width: 768px) {
        justify-content: flex-end;
      }
      &__icon {
        cursor: pointer;
        fill: $color-ui-dark-gray;
        width: 16px;
        height: 16px;
        margin: 8px;
      }
    }
  }
}
.swal-action-delete {
  display: flex;
  padding: 12px 24px;
  width: 100%;
  flex-wrap: nowrap;
  button {
    max-width: 50%;
    & + button {
      margin-left: 8px;
    }
  }
}
</style>
