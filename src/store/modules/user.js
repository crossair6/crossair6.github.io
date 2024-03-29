// 用户模块
export default {
  namespaced: true,
  state() {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    // 修改用户信息,payload为用户信息对象
    setUser(state, payload) {
      for (const key in payload) {
        state.profile[key] = payload[key]
      }
    }
  },
  getters: {
    testGetter1() {
      return 'testGetter1'
    }
  }
}
