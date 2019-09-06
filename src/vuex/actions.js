import http from '@/utils/http'

export const register = ({ dispatch }, payload) => {
  http.post('/users', payload)
      .then(response => {
        console.log(response.access_token)
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
      })
}
