<template>
  <OM30MainPage class="patient-data">
    <section class="container">
      <OM30CardPage>
        <div
          v-for="(resumes, index) in dataResume"
          :key="`form-step-resumes-${index}`">
          <OM30Resume
            :data="resumes"
          />
        </div>
        <div class="action">
          <OM30Button
            id="data-action-back-to-list"
            class="action__button"
            @click="() => $router.push({ name: 'Patients' })"
            secondary>
            Voltar
          </OM30Button>
        </div>
      </OM30CardPage>
    </section>
  </OM30MainPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OM30Resume from '@/modules/OM30Resume.vue'
import OM30MainPage from '@/modules/OM30MainPage.vue'
import OM30CardPage from '@/components/OM30CardPage.vue'
import OM30Button from '@/components/OM30Button.vue'
import { addressKeylabels, patientsDataKeylabels } from '@/assets/utils/keyslabel'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'om30-patient-data-page-module',
  components: {
    OM30Resume,
    OM30MainPage,
    OM30CardPage,
    OM30Button
  },
  computed: {
    ...mapState({
      patient: (state: any) => state.patientsStore.patient
    }),
    dataResume() {
      const patient: any = this.patient
      const address: any = patient.address
      const patientKeysPersonal = Object.keys(patient).filter(item => item !== 'address' && item !== 'id')
      const addressKeys = Object.keys(address).filter(item => address[item])
      const personalList = patientKeysPersonal.map(item => ({
        label: patientsDataKeylabels[item],
        value: patient[item]
      }))
      const addresslist = addressKeys.map(item => ({
        label: addressKeylabels[item],
        value: address[item]
      }))

      const listDataResume = [
        {
          title: 'Dados Pessoais',
          items: personalList
        },
        {
          title: 'Endereço',
          items: addresslist
        }
      ]
      return listDataResume
    }
  }
})
</script>
<style lang="scss">
.patient-data {
  .action {
    display: flex;
    width: 100%;
    margin-top: 46px;
    @media only screen and (min-width: 768px) {
      justify-content: flex-end;
    }
    &__button {
      width: 100%;
      @media only screen and (min-width: 768px) {
        width: 45%;
      }
    }
  }
}
</style>
