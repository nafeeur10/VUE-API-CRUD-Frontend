import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      userName: 'Admin',
      userIsLoggedIn: null,
      token: null
    },
    getters: {
        getUserIsLoggedIn(state) {
            return state.userIsLoggedIn
        },
        getUserName(state) {
            return state.userName
        },
        getToken(state) {
            return state.token
        }
    },
    mutations: {
      setUserName (state, payload) {
        state.userName = payload
      },
      setUserIsLoggedIn(state, payload) {
          state.userIsLoggedIn = payload
      },
      setToken(state, payload) {
          state.token = payload
      }
    },
    actions: {
        setUserIsLoggedIn(context) {
            let token = localStorage.getItem('token');
            if(token)
            context.commit("setUserIsLoggedIn", true);
            else
            context.commit("setUserIsLoggedIn", false);
        },
        setUserName(context) {
            let username = localStorage.getItem('user');
            if(username)
            context.commit("setUserName", username);
            else
            context.commit("setUserName", '');
        },
        setToken(context) {
            let token = localStorage.getItem('token');
            if(token)
            context.commit("setToken", token);
            else
            context.commit("setToken", null);
        }
    }
})

export default store