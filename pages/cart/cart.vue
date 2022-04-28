<template>
  <view>
    <view class="cart-container" v-if="cart.length!==0">
      <myAddress/>
      <view class="cart-title">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="cart-title-text">购物车</text>
      </view>
      <view v-for="(goods,i) in cart" :key="goods.goods_id" class="goods-item">
        <view class="goods-item-left">
          <radio v-if="showRadio" color="#c00000" :checked="goods.goods_state" @click="radioChangeHandler(goods)"></radio>
          <image :src="goods.goods_small_logo||defaultPic" mode="widthFix" ></image>
        </view>
        <div class="goods-item-right">
          <view class="goods-item-right-name">
            {{goods.goods_name}}
          </view>
          <view class="goods-item-right-bot">
            <span>￥{{goods.goods_price}}</span>
            <uni-number-box :value="goods.goods_count" :min="1" class="goods-item-right-bot-count" @change="numChangeHandler($event,goods)" v-if="showNum"></uni-number-box>
          </view>
        </div>
      </view>
      <mySettle/>
    </view>
    <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixin/tabbar-badge.js'
  import {mapState,mapMutations} from 'vuex'
  import myAddress from '@/components/my-address/my-address.vue'
  import mySettle from '@/components/my-settle/my-settle.vue'
  export default {
    mixins:['badgeMix'],
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        showRadio:true,
        showNum:true
      };
    },
    components:{
      myAddress,
      mySettle
    },
    computed:{
      ...mapState('m_cart',['cart'])
    },
    methods:{
      ...mapMutations('m_cart',['updateGoodsCount','updateGoodsState']),
      numChangeHandler(e,goods){
        console.log(e);
        console.log(goods)
        goods.goods_count = e;
        this.updateGoodsCount(goods)
      },
      radioChangeHandler(goods){
        goods.goods_state = !goods.goods_state
        this.updateGoodsState(goods)
      }
    }
  }
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.goods-item{
  display: flex;
  background-color: white;
  padding: 10px;
  .goods-item-left{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 5px;
    image{
      width: 100px;
      height: 100px;
    }
  }
  .goods-item-right{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-item-right-name{
      font-size: 12px;
    }
    .goods-item-right-bot{
      display: flex;
      justify-content: space-between;
      span{
        color: #C00000;
      }
      .goods-item-right-bot-count{
        align-self: flex-end;
        border: 1px solid rgba(155,155,155,0.3);
      }
    }
  }
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
