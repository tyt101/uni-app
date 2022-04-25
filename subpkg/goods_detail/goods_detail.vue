<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(good,i) in goodDetailList.pics" :key="good.pics_id">
        <image :src="good.pics_big" mode="widthFix" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <view class="good-detail-box">
      <view class="good-detail-price">
        ￥{{goodDetailList.goods_price}}
      </view>
      <view class="good-detail-main">
        <view class="good-detail-name">
          {{goodDetailList.goods_name}}
        </view>
        <view class="good-detail-cecruit">
          <uni-icons type="star" size="20" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="express">
        快递: 免运费
      </view>
    </view>
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goods_id:0,
        goodDetailList:[],
        options:[{
            icon: 'shop',
            text: '店铺'
          },{
            icon: 'cart',
            text: '购物车',
            info: 2
          }
        ],
        buttonGroup: [{
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }
      ]
      };
    },
    onLoad(option) {
      this.goods_id = option.goods_id
      this.getgoodDetail()
    },
    methods:{
      async getgoodDetail(){
        const {goods_id} = this
        const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
        if(res.meta.status !== 200)return uni.$showMsg();
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
        this.goodDetailList = res.message;
      },
      preview(i){
        uni.previewImage({
          current:i,
          urls:this.goodDetailList.pics.map(x => x.pics_big)
        })
      },
      buttonClick(e){
        console.log(e)
      },
      onClick(e){
        console.log(e)
        if(e.content.text === '购物车'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.good-detail-box{
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  .good-detail-price{
    color: #C00000;
    font-size: 20px;
  }
  .good-detail-main{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    .good-detail-name{
      width: 80%;
      padding-right:10px;
      border-right: 1px solid #efefef;
    }
    .good-detail-cecruit{
      width: 20%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .express{
    font-size: 10px;
    color: #cccccc;
  }
}
.goods_nav{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
