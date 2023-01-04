import { login, logout, getInfo,getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES:(state,roles)=>{
    state.roles = roles
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     // const { data } = response
    //     // commit('SET_TOKEN', data.token)
    //     // setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
    const { username, password } = userInfo
    let res = await login({ username: username, password: password })
    if(res.code==200){
      commit('SET_TOKEN', res.token)
      commit('SET_NAME', username)
      setToken(res.token)
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { username} = data

        commit('SET_NAME', username)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  async getUserRoles({commit,state}){
    let result = await getUserInfo(state.name)
    commit("SET_ROLES",result.data.roles)
  },
  // user logout
  logout({ commit, state }) {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

