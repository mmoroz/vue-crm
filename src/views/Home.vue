<template>
  <app-loader v-if="loading"/>
  <app-page
      v-else
      title="Список заявок"
      meta-desc="Список заявок Список заявок"
      meta-key="заявок заявок заявок"
  >
    <template #header>
      <button class="btn primary" @click="modal=true">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="close">
        <request-modal-form @created="close" @startCreate="loading=true"></request-modal-form>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import AppPage from "@/components/ui/AppPage";
import RequestTable from "@/components/request/RequestTable";
import AppModal from "@/components/ui/AppModal";
import RequestModalForm from "@/components/request/RequestModalForm";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";
import RequestFilter from "@/components/request/RequestFilter";
export default {
  name: 'Home',
  components:{AppPage, RequestTable, AppModal, RequestModalForm, AppLoader, RequestFilter},
  setup(){
    const modal = ref(false)
    const store = useStore()
    const loading = ref(false)
    const filter = ref({})

    onMounted(async ()=>{
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })

    const requests = computed(() => store.getters['request/requests']
      .filter(request => {
        if(filter.value.name){
          return request.fio.includes(filter.value.name)
        }
        return request
      })
      .filter(request=>{
        if(filter.value.status){
          return filter.value.status === request.status
        }
        return request
      })

    )


    return {
      modal,
      requests,
      loading,
      filter,
      close: () => {
        modal.value = false
        loading.value = false
      }
    }
  }
}
</script>
