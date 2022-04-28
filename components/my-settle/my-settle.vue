<template>
  <view class="my-settle-container">
    <label class="radio" @click="changeAllState">
        <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>
  
    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
  
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
</template>

<script>
import {mapGetters,mapMutations,mapState} from 'vuex'
export default{
  data(){
    return {
      
    }
  },
  computed:{
    ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
    ...mapState('m_user',['address','token']),
    isFullCheck(){
      return this.total === this.checkedCount
    }
  },
  methods:{
    ...mapMutations('m_cart',['updateAllGoodsState']),
    changeAllState(){
      this.updateAllGoodsState(!this.isFullCheck)
    },
    settlement(){
      if(!this.token) return uni.$showMsg("请先登录")
      if(!this.checkedCount) return uni.$showMsg("请选择要结算的商品")
      if(!this.address) return uni.$showMsg("请选择地址")
    }
  }
}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>