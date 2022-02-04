<template>
  <app-loader v-if="loading"></app-loader>
  <app-page
      v-else-if="request"
      title="Заявка"
      meta-desc="Список заявок Список заявок"
      meta-key="заявок заявок заявок"
  >
    <p>ФИО: {{ request.fio }}</p>
    <p>Телефон: {{ request.phone }}</p>
    <p>Сумма: {{ priceFormatter(request.amount) }}</p>
    <p>Статус: <app-status :type="request.status"></app-status></p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active" >Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn" v-if="hasChanged" @click="update">Обновить</button>
    <button class="btn danger" @click="remove">Удалить</button>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import {useRoute, useRouter} from "vue-router";
import {ref,onMounted, computed} from "vue";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";
import AppStatus from "@/components/ui/AppStatus";
import {priceFormatter} from "@/utils/price-formatter";
import router from "@/router";

export default {
  name: "Request",
  components:{AppPage, AppLoader, AppStatus},
  setup(){
    const loading = ref(true)
    const route = useRoute()
    const store = useStore()
    const request = ref({})
    const status = ref()
    const router = useRouter()
    const hasChanged = computed(() => request.value.status !== status.value)
    onMounted(async ()=>{
      loading.value = true
      request.value = await store.dispatch('request/loadById', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })
    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      router.push('/')
    }
    const update = async () => {
      request.value.status = status.value
      const data = {...request.value, id: route.params.id}
      await store.dispatch('request/update', data)
    }
    return {
      loading, request, priceFormatter, remove, update, status,hasChanged
    }
  }
}
</script>
