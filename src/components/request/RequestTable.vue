<template>
  <div v-if="requests.length === 0"><strong>Данных пока нет</strong></div>
  <table class="table" v-else>
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(r, idx) in requests" :key="r.id">
        <td>{{ idx + 1}}</td>
        <td>{{ r.fio }}</td>
        <td>{{ r.phone }}</td>
        <td>{{ priceFormatter(r.amount) }}</td>
        <td>
          <app-status :type="r.status"></app-status>
        </td>
        <td>
          <router-link v-slot="{navigate}" custom :to="{name:'Request',params:{id:r.id}}">
            <button class="btn" @click="navigate">Открыть</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {priceFormatter} from "@/utils/price-formatter";
import AppStatus  from "@/components/ui/AppStatus"

export default {
  name: "RequestTable",
  props:['requests'],
  setup(){
    return{
      priceFormatter
    }
  },
  components:{AppStatus}
}
</script>

<style scoped>

</style>