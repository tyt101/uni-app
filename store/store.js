import Vue from 'vue'
import vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'
Vue.use(vuex)
const store =  new vuex.Store({
  modules:{
    m_cart:moduleCart,
    m_user:moduleUser
  }
})
export default store