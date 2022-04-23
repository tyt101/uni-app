<template>
  <view>
    <view class="search-box">
      <uni-search-bar cancelButton="none" placeholder="请输入搜索内容" @input="input" :radius="100" v-model="keyWord"></uni-search-bar>
    </view>
    
    <view class="sugg-list" v-if="keyList.length!==0">
      <view  class="sugg-item" v-for="search in keyList" :key="search.goods_id" @click="gotoDetail(search.goods_id)">
        <view class="goods-name">
          {{search.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
  
    <view class="history-box" v-else>
      <view class="history-title">
          <text>搜索历史</text>
          <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
      </view>
      <view class="history-list" >
        <uni-tag :text="item" v-for="(item,i) in historyList" :key="i" @click="fastSearch(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        // 搜索关键词
        keyWord:'',
        keyList:[],
        historyList:[],
      };
    },
    methods:{
      input(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.keyWord = e
          this._getSearch();
        },500)
      },
      async _getSearch(){
        if(this.keyWord===''){
          this.keyList = [];return;
          }
          const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.keyWord })
          if(res.meta.status!==200) return uni.$showMsg();
          if(res.message.length===0) return uni.$showMsg('占未找到数据');
          this.keyList = res.message
          this.saveSearchHistory();
      },
      saveSearchHistory(){
        this.historyList.unshift(this.keyWord)
        // 解决关键词去重(有三种方法)
        this.historyList = Array.from(new Set(this.historyList))
        uni.setStorageSync('historyList',JSON.stringify(this.historyList))
      },
      gotoDetail(id){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+id
        })
      },
      fastSearch(item){
       uni.navigateTo({
         url:'/subpkg/good_list/good_list?query='+item
       })
      },
      clearHistory(){
        this.historyList=[];
        uni.clearStorage();
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('historyList')||'[]')
    }
  }
</script>

<style lang="scss">
.search-box{
  background-color: #c00000;
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list{
  .sugg-item{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #efefef;
    .goods-name{
      margin-right: 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.history-box{
  padding: 10px;
  .history-title{
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      border-bottom: 1px solid #efefef;
  }
  .history-list{
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    .uni-tag{
      position: relative;
      background-color: #efefef;
      color: black;
      border: none;
      margin-top: 10px;
      margin-right: 10px;
    }
  }
}
</style>
