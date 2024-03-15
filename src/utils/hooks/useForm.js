import { reactive } from 'vue'

export function useForm(formRef, initData) {

  const formData = reactive(initData)
  
  async function validate() {
    await formRef.value?.validate()
  }

  return {
    formData,
    validate
  }
}
