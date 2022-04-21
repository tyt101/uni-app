<template>
  <view>
    <view class="scroll-view-container">
      <scroll-view scroll-y="true" class="left-scroll" :style="{height:wxh+'px'}">
        <view :class="['left-scroll-view-item',index===active?'active':'']" v-for="(cate,index) in categaryList" @click="activeItem(index)">{{cate.cat_name}}</view>
      </scroll-view>
      <scroll-view scroll-y="true" class="right-scroll" :style="{height:wxh+'px'}">
        <view class="cate-lv2"  v-for="cate in cateLevel2" :key="cateLevel2.cat_id">
          <view class="cate-lv2-title">
            /{{cate.cat_name}}/
          </view>
          <view class="cate-lv3">
            <view class="cate-lv3-img"  v-for="(lv3,i) in cate.children" :key="lv3.cat_id" @click="gotoGoodsList(lv3.cat_id?lv3.cat_id:'')">
              <image :src="lv3.cat_icon" mode="widthFix" />
              <text>{{lv3.cat_name}}</text>
              <text>{{lv3.cat_id}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wxh:0,
        categaryList:[],
        active:0,
        cateLevel2:[],
        // 重置顶部偏差，现在scroll-view已经有这个功能了，以前没有的时候需考虑，则需要设置一个scroll-top在切换tab的时候动态在1和0之间变换
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync();
      this.wxh = sysInfo.windowHeight
      this.getCategaryList()
    },
    methods:{
      async getCategaryList(){
        const {data:res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status!==200) return uni.$showMsg()
        this.categaryList = res.message
        this.cateLevel2 = res.message[0].children
      },
      activeItem(index){
        this.active = index
        // 这里其实也可以通过重新调用getCategaryList，但是这样效率比较低，因为要重新发请求
        this.cateLevel2 = this.categaryList[index].children
      },
      gotoGoodsList(id) {
        console.log(id)
        uni.navigateTo({
          url: '/subpkg/good_list/good_list?cid=' + id
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container{
  display: flex; 
  .left-scroll{
    width: 120px;
    .left-scroll-view-item{
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &.active{
        position: relative;
        background-color: #FFFFFF;
        &:before{
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #C00000;
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -15px;
        }
      }
    }
  }
  .right-scroll{
    background-color: #FFFFFF;
    .cate-lv2-title{
      text-align: center;
      height: 30px;
      line-height: 30px;
      padding: 15px;
      font-size: 12px;
      font-weight: bold;
    }
    .cate-lv3{
      display: flex;
      flex-wrap: wrap;
      .cate-lv3-img{
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        image{
          width: 60px;
          height: 60px;
        }
      }
    }
  }
}
</style>
