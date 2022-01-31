import axios from 'axios'
import {error} from '../../utils/error'
const TOKEN_KEY = 'jwt-token'
export const auth = {
  namespaced: true,
  state(){
    return {
      token: localStorage.getItem(TOKEN_KEY)
    }
  },
  mutations:{
    setToken(state, token){
      state.token = token
      localStorage.setItem(TOKEN_KEY,token)
    },
    logout(state){
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions:{
    async login({ commit, dispatch }, payload){
      try{
        //console.log(payload, process.env.VUE_APP_FB_KEY)
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {...payload, returnSecureToken: true})
        //console.log(data)
        commit('setToken', data.idToken)
        commit('clearMessage', null, {root:true})
      }catch (e){
        dispatch('setMessage',{
          value: error(e.response.data.error.message),
          typeMessage: 'danger'
        },{root:true})
        console.log(error(e.response.data.error.message))
        throw new Error(e)
      }
    }
  },
  getters:{
    token(state){
      return state.token
    },
    isAuthenticated(state){
      return !!state.token
    }
  }
}
