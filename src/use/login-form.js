import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from 'vue-router'

export function useLoginForm(){
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting, submitCount} = useForm()

  const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
    'email',
    yup.string()
      .trim()
      .required('Введите email')
      .email('Невалидный email')
  )
  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
    'password',
    yup.string().trim().required('Введите пароль').min(6,'Не менее 6-ти символов')
  )

  const isTooManyAttempts = computed(() => submitCount.value >= 3)

  watch(isTooManyAttempts, value => {
    if(value){
      setTimeout(() => submitCount.value = 0, 3000)
    }
  })

  const onSubmit = handleSubmit(async values => {
    try{
      await store.dispatch('auth/login', values)
      router.push('/')
    }catch (e){

    }

  })

  return {
    email,
    password,
    eError,
    eBlur,
    pError,
    pBlur,
    onSubmit,
    isTooManyAttempts,
    isSubmitting
  }
}