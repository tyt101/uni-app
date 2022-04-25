<template>
  <view>
    <view class="goods-list">
      <view class="good-item" v-for="good in goodList" :key="good.goods_id" @click="gotoDetail(good.goods_id)">
        <view class="good-item-left">
          <image :src="good.goods_small_logo||defaultPic" mode="widthFix"></image>
        </view>
        <view class="good-item-right">
          <view class="good-item-right-title">
            {{good.goods_name}}
          </view>
          <view class="good-item-right-price">
            {{good.goods_price}}
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
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        queryObj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goodList:[],
        total:0
      };
    },
    onLoad(option){
      this.queryObj.query = option.query||'';
      this.queryObj.cid = option.cid||'';
      this.getGoodsList()
    },
    methods:{
      async getGoodsList(){
        const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        if(res.meta.status!==200) return uni.$showMsg();
        this.total = res.message.total;
        this.goodList = [...this.goodList,...res.message.goods];
        if(res.message.goods.length>0){
          this.queryObj.pagenum++;
        }
      },
      gotoDetail(id){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+id
        })
      }
    },
    onReachBottom() {
      const page = this.total/this.queryObj.pagesize;
      const pagedis = this.queryObj.pagenum-page;
      if(this.total<=this.goodList.length)
      {
        uni.$showMsg("已经到底了")
        return;
      }
      if(this.queryObj.pagenum<page)
      {
          this.getGoodsList()
      }
      else if(pagedis<1&&pagedis>0){
        this.queryObj.pagesize = Math.ceil((1-pagedis)*10);
        this.getGoodsList()
      }
    },
    onPullDownRefresh(){
      this.queryObj.pagenum = 1;
      this.queryObj.pagesize = 10;
      this.total = 0;
      this.goodList = [];
      this.getGoodsList();
    }
  }
</script>

<style lang="scss">
.goods-list{
  background-color: white;
  .good-item{
    display: flex;
    height: 100px;
    border-bottom: 1px solid #efefef;
    margin-top: 10px ;
    .good-item-left{
      image{
        width: 100px;
      }
      margin-right: 20px;
    }
    .good-item-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .good-item-right-title{
        font-size: 12px;
        align-self: flex-start;
      }
      .good-item-right-price{
        color: red;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
