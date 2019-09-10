import http from '@/utils/http'
import localforage from 'localforage'
import { isEmpty } from 'lodash'

export const register = ({ dispatch }, payload) => {
  http.post('/users', payload)
      .then(response => {
        dispatch('setToken', response.access_token)

        return Promise.resolve()
      })
      .then(() => {
        dispatch('loadUser')
      })
}

export const setUser = ({ commit }, user) => {
  // Commit the mutations
  commit('SET_USER', user)

  Promise.resolve(user) // keep promise chain
}

export const setToken = ({ commit }, token) => {
  // Commit the mutations
  commit('SET_TOKEN', token)

  return Promise.resolve(token) // keep promise chain
}

export const loadUser = ({ dispatch }) => {
  http.get('/user')
      .then(user => {
        dispatch('setUser', user)
      })
      .catch(() => {
        // 退出登录
        console.log('获取当前用户失败了')
        logout()
      })
}

export const login = ({ dispatch }, payload) => {
  http.post('/authorizations', payload)
      .then(response => {
        dispatch('setToken', response.access_token)

        return Promise.resolve()
      })
      .then(() => {
        dispatch('loadUser')
      })
}

export const logout = ({ dispatch }) => {
  return localforage
    .removeItem('cha-vue-store-token')
    .then(dispatch('setToken', null))
    .then(dispatch('setUser', {}))
}


