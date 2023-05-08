<template>
  <OM30MainPage>
    <section class="container">
      <OM30CardPage>
        <div
          class="patients-form">
          <div
            v-show="stepCurrent === 1"
            class="form-step">
            <OM30Input
            id="patient-name"
            name="patient-name"
            class=""
            :mask="'M'.repeat(15)"
            label="Nome"
            :errorMessage="validate?.name || ''"
            :errorCondition="!!validate?.name"
            placeholder="Lucas"
            v-model="form.name"
          />
          <OM30Input
            id="patient-lastname"
            name="patient-lastname"
            class=""
            label="Sobrenome"
            :mask="'M'.repeat(30)"
            :errorMessage="validate?.lastName || ''"
            :errorCondition="!!validate?.lastName"
            placeholder="Oliveira"
            v-model="form.lastName"
          />
          <OM30Input
            id="patient-cpf"
            name="patient-cpf"
            mask="###.###.###-##"
            class=""
            label="CPF"
            :errorMessage="validate?.cpf || ''"
            :errorCondition="!!validate?.cpf"
            placeholder="133.799.583-52"
            v-model="form.cpf"
          />
          <OM30Input
            name="patient-birthdate"
            id="patient-birthdate"
            class=""
            label="Data de nascimento"
            :errorMessage="validate?.birthDate || ''"
            :errorCondition="!!validate?.birthDate"
            placeholder="31/05/1995"
            mask="##/##/####"
            v-model="form.birthDate"
          />
          <OM30Input
            name="patient-cns"
            id="patient-mothername"
            class=""
            label="CNS"
            mask="### #### #### #####"
            :errorMessage="validate?.cns || ''"
            :errorCondition="!!validate?.cns"
            placeholder="757 6493 2852 0005"
            v-model="form.cns"
          />
          <OM30Input
            name="patient-mothername"
            id="patient-mothername"
            class=""
            label="Nome da mãe"
            :mask="'M'.repeat(30)"
            :errorMessage="validate?.motherName || ''"
            :errorCondition="!!validate?.motherName"
            placeholder="Sandra Santos"
            v-model="form.motherName"
          />
          </div>
          <div
            v-show="stepCurrent === 2"
            class="form-step">
            <OM30Input
              name="patient-zipcode"
              id="patient-zipcode"
              class=""
              label="CEP"
              mask="##.###-###"
              :errorMessage="validate?.zipCode || ''"
              :errorCondition="!!validate?.zipCode"
              placeholder="57.051-120"
              v-model="form.address.zipCode"
            />
            <OM30Input
              name="patient-streetadress"
              id="patient-streetadress"
              class=""
              label="Logradouro"
              :errorMessage="validate?.streetAdress || ''"
              :errorCondition="!!validate?.streetAdress"
              placeholder="Rua Um"
              v-model="form.address.streetAdress"
            />
            <OM30Input
              name="patient-complement"
              id="patient-complement"
              class=""
              label="Complemento"
              placeholder="Green Valley I"
              v-model="form.address.complement"
            />
            <OM30Input
              name="patient-number"
              id="patient-number"
              class=""
              label="Numero"
              :errorMessage="validate?.number || ''"
              :errorCondition="!!validate?.number"
              placeholder="31"
              v-model="form.address.number"
            />
            <OM30Input
              name="patient-neighborhood"
              id="patient-neighborhood"
              class=""
              label="Bairro"
              :errorMessage="validate?.neighborhood || ''"
              :errorCondition="!!validate?.neighborhood"
              placeholder="Brooklyn"
              v-model="form.address.neighborhood"
            />
            <OM30Input
              name="patient-city"
              id="patient-city"
              class=""
              label="Cidade"
              :errorMessage="validate?.city || ''"
              :errorCondition="!!validate?.city"
              placeholder="Maceió"
              v-model="form.address.city"
            />
            <OM30Input
              name="patient-state"
              id="patient-state"
              class=""
              label="Estado"
              :errorMessage="validate?.state || ''"
              :errorCondition="!!validate?.state"
              mask="AA"
              placeholder="AL"
              v-model="form.address.state"
            />
          </div>
          <div v-show="stepCurrent === 3" >
            <div
              v-for="(resumes, index) in dataFormResume"
              :key="`form-step-resumes-${index}`">
              <OM30Resume
                :data="resumes"
              />
            </div>
          </div>
          <div class="form-action">
            <OM30Button
              id="form-action-prev"
              @click="prevFlow()"
              secondary>
              {{ prevButtonName }}
            </OM30Button>
            <OM30Button
              id="form-action-next"
              :disabled="validateFirstStep || validateSecondStep"
              :loading="loading"
              @click="nextFlow()">
              {{ nextButtonName }}
            </OM30Button>
          </div>
        </div>
      </OM30CardPage>
    </section>
  </OM30MainPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OM30MainPage from '@/modules/OM30MainPage.vue'
import OM30CardPage from '@/components/OM30CardPage.vue'
import OM30Input from '@/components/OM30Input.vue'
import OM30Button from '@/components/OM30Button.vue'
import OM30Resume from '@/modules/OM30Resume.vue'
import { patientSchema } from '@/assets/utils/validateFunctionsSchema'
import { addressKeylabels, patientsDataKeylabels } from '@/assets/utils/keyslabel'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
  name: 'create-patient-page',
  components: {
    OM30MainPage,
    OM30CardPage,
    OM30Input,
    OM30Button,
    OM30Resume
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      stepCurrent: 1,
      zipCodeAutoFill: '',
      loading: false,
      form: {
        id: 0,
        name: '',
        lastName: '',
        motherName: '',
        birthDate: '',
        cpf: '',
        cns: '',
        image: '',
        address: {
          zipCode: '',
          streetAdress: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: ''
        }
      }
    }
  },
  computed: {
    ...mapState({
      patient: (state: any) => state.patientsStore.patient,
      zipCodeData: (state: any) => state.patientsStore.zipCodeData
    }),
    validate() {
      try {
        patientSchema.validateSync({
          name: this.form.name,
          lastName: this.form.lastName,
          motherName: this.form.motherName,
          birthDate: this.form.birthDate,
          cpf: this.form.cpf,
          cns: this.form.cns,
          zipCode: this.form.address.zipCode,
          streetAdress: this.form.address.streetAdress,
          number: this.form.address.number,
          neighborhood: this.form.address.neighborhood,
          city: this.form.address.city,
          state: this.form.address.state
        }, { abortEarly: false })
        return {}
      } catch (error: any) {
        return error.inner.reduce((acc: any, error: any) => {
          acc[error.path] = error.message

          return acc
        }, {})
      }
    },
    validateFirstStep() {
      return this.stepCurrent === 1 && (!!this.validate?.name
      || !!this.validate?.lastName
      || !!this.validate?.motherName
      || !!this.validate?.birthDate
      || !!this.validate?.cpf
      || !!this.validate?.cns)
    },
    validateSecondStep() {
      return this.stepCurrent === 2 && (!!this.validate?.zipCode
      || !!this.validate?.streetAdress
      || !!this.validate?.number
      || !!this.validate?.neighborhood
      || !!this.validate?.city
      || !!this.validate?.state)
    },
    validateZipCode() {
      return this.stepCurrent === 2 && !this.validate?.zipCode
    },
    nextButtonName() {
      return this.stepCurrent === 3 ? 'Concluir' : 'Próximo'
    },
    prevButtonName() {
      return this.stepCurrent === 1 ? 'Cancelar' : 'Voltar'
    },
    dataFormResume() {
      const form: any = this.form
      const address: any = this.form.address
      const formKeysPersonal = Object.keys(form).filter(item => item !== 'address' && item !== 'id')
      const addressKeys = Object.keys(address).filter(item => address[item])
      const personalList = formKeysPersonal.map(item => ({
        label: patientsDataKeylabels[item],
        value: form[item]
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
  },
  mounted() {
    if (this.patient.id) {
      this.setPatientDataInForm()
    }
  },
  unmounted() {
    this.CLEAR_PATIENT()
  },
  watch: {
    validateZipCode(newValue, oldValue) {
      if (newValue && newValue !== oldValue && this.zipCodeAutoFill !== this.form.address.zipCode) {
        this.getAdrressByZipCode()
      }
    }
  },
  methods: {
    ...mapActions('patientsStore', [
      'GET_PATIENTS',
      'CLEAR_PATIENT',
      'GET_ZIPCODE_DATA',
      'REGISTER_PATIENT',
      'EDIT_PATIENT'
    ]),
    setPatientDataInForm() {
      this.form = { ...this.form, ...this.patient }
    },
    getAdrressByZipCode() {
      const zipCode: string = this.form.address.zipCode
      return this.GET_ZIPCODE_DATA(zipCode)
        .then(() => {
          this.zipCodeAutoFill = this.form.address.zipCode
          this.form.address = { ...this.form.address, ...this.zipCodeData }
        })
    },
    prevFlow() {
      if (this.stepCurrent !== 1) {
        this.stepCurrent--
      } else {
        this.$router.push({ name: 'Patients' })
      }
    },
    nextFlow() {
      if (this.stepCurrent === 3 && !this.validateFirstStep && !this.validateSecondStep && !this.form.id) {
        this.registerPatient()
      }
      if (this.stepCurrent === 3 && !this.validateFirstStep && !this.validateSecondStep && this.form.id) {
        this.editPatient()
      }
      if (this.stepCurrent !== 3) {
        this.stepCurrent++
      }
    },
    registerPatient(): Promise<void> {
      this.loading = true
      return this.REGISTER_PATIENT(this.form)
        .then(() => {
          this.$router.push({ name: 'Patients' })
        })
        .finally(() => {
          this.loading = false
        })
    },
    editPatient(): Promise<void> {
      this.loading = true
      return this.EDIT_PATIENT(this.form)
        .then(() => {
          this.$router.push({ name: 'Patients' })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
})
</script>

<style lang="scss">
.patients-form {
  & .form-step {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    @media only screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      gap: 28px 16px;
    }
  }
  & .form-action {
    margin-top: 36px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    @media only screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
