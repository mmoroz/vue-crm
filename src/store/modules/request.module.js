import requestAxios from "@/axios/request";
import store from '../index'
export const request = {
  namespaced: true,
  state(){
    return {
      requests:[]
    }
  },
  mutations:{
    setRequests(state, requests){
      state.requests = requests
    },
    addRequest(state, request){
      state.requests.push(request)
    }
  },
  actions:{
    async create({commit,dispatch}, payload){
      try{
        const token = store.getters['auth/token'];
        const {data} = await requestAxios.post(`/requests.json?auth=${token}`, payload)
        commit('addRequest', {...payload,id: data.name})
        dispatch('setMessage',{
          value: "Заявка успешно создана!",
          typeMessage: 'primary'
        },{root:true})
      }catch (e) {
        dispatch('setMessage',{
          value: e.message,
          typeMessage: 'danger'
        },{root:true})
      }
    },
    async load({commit, dispatch}){
      try{
        const token = store.getters['auth/token'];
        const {data} = await requestAxios.get(`/requests.json?auth=${token}`)
        //console.log(data)
        const result = Object.keys(data).map(id => ({...data[id], id}))
        commit('setRequests',result)
      }catch (e) {
        dispatch('setMessage',{
          value: e.message,
          typeMessage: 'danger'
        },{root:true})
      }
    },
    async loadById({commit, dispatch}, id){
      try{
        const token = store.getters['auth/token'];
        const {data} = await requestAxios.get(`/requests/${id}.json?auth=${token}`)
        //console.log(data)
        return data
      }catch (e) {
        dispatch('setMessage',{
          value: e.message,
          typeMessage: 'danger'
        },{root:true})
      }
    },
    async remove({dispatch}, id){
      try{
        const token = store.getters['auth/token'];
        await requestAxios.delete(`/requests/${id}.json?auth=${token}`)
        dispatch('setMessage',{
          value: 'Заявка удалена',
          typeMessage: 'primary'
        },{root:true})
      }catch (e) {
        dispatch('setMessage',{
          value: e.message,
          typeMessage: 'danger'
        },{root:true})
      }
    },
    async update({dispatch}, request){
      try{
        const token = store.getters['auth/token'];
        await requestAxios.put(`/requests/${request.id}.json?auth=${token}`, request)
        dispatch('setMessage',{
          value: 'Статус обновлен',
          typeMessage: 'primary'
        },{root:true})
      }catch (e) {
        dispatch('setMessage',{
          value: e.message,
          typeMessage: 'danger'
        },{root:true})
      }
    }
  },
  getters:{
    requests(state){
      return state.requests
    }
  }
}