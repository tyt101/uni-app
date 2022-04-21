<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="sl in swiperList" :key="sl.goods_id">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+sl.goods_id">
          <image :src="sl.image_src" alt="" />
        </navigator>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view class="nav-item" v-for="(img,index) in navList" :key="index" @click="navClickHander(img)">
        <image :src="img.image_src" mode="" class="nav-img" />
      </view>
    </view>
    <view class="floor-list">
      <view class="floor-item" v-for="(floor,index) in floorList" :key="index">
        <image :src="floor.floor_title.image_src" class="floor-title" />
        <view class="floor-img-box">
          <navigator class="floor-img-lef" :url="floor.product_list[0].url">
            <image :src="floor.product_list[0].image_src" :style="{width:floor.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
          </navigator>
          <view class="floor-img-rig">
            <navigator :url="pro.url" class="floor-img-rig-item" v-for="(pro,proIndex) in floor.product_list" :key="proIndex" v-if="proIndex!==0">
              <image :src="pro.image_src" :style="{width:pro.image_width+'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[],
        navList:[],
        floorList:[]
      };
    },
    onLoad() {
      this.getSwiperList();
      this.getNavList();
      this.getFloorList();
    },
    methods:{
      async getSwiperList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        console.log(res)
        if(res.meta.status!==200) return uni.$showMsg()
        this.swiperList = res.message
      },
      async getNavList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status!==200) return uni.$showMsg();
        this.navList = res.message
      },
      navClickHander(item){
        if(item.name === '分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      async getFloorList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status!==200) return uni.$showMsg();
        res.message.forEach(floor=>{
          floor.product_list.forEach(prod=>{
            prod.url='/subpkg/good_list/good_list?'+prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      }
    }
  }
</script>

<style lang="scss">
swiper{
  height: 330rpx;
  .swiper-item,
  image{
    width: 100%;
    height: 100%;
  }
}
.nav-list{
    display: flex;
    justify-content: space-around;
    margin: 15x 0;
    .nav-img{
        width: 128rpx;
        height: 140rpx;
    }
}
.floor-title{
  width:100%;
  height: 60rpx;
}
.floor-img-box{
  display: flex;
  .floor-img-rig{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .floor-img-lef{
    padding-left: 10rpx;
  }
}


</style>
