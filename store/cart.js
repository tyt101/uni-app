const moduleCart= {
  namespaced: true,
  state:{
    cart:[]
  },
  mutations:{
    addToCart(state,goods){
      const isInCart = state.cart.find((x)=>{
        return x.goods_id === goods.goods_id
      })
      if(!isInCart){
        state.cart.push(goods)
      }else{
        isInCart.goods_count++;
      }
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    updateGoodsCount(state,goods){
      const findResult = state.cart.find((x)=>x.goods_id===goods.goods_id)
      
      if(findResult){
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    updateGoodsState(state,goods){
      const findResult = state.cart.find(x=>x.goods_state === goods.goods_state)
      if(findResult){
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    updateAllGoodsState(state,newState){
      state.cart.forEach(good=>good.goods_state =newState)
      this.commit('m_cart/saveToStorage')
    },
    
  },
  actions:{
    
  },
  getters:{
    total(state){
      let count = 0;
      state.cart.forEach(good=>{
        count=good.goods_count + count;
      })
      return count
    },
    checkedCount(state){
      return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count,0)
    },
    checkedGoodsAmount(state){
      return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count*item.goods_price, 0).toFixed(2)
    }
  }
}
export default moduleCart