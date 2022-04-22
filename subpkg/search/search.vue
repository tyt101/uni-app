<template>
  <view>
    <view class="search-box">
      <uni-search-bar cancelButton="none" placeholder="请输入搜索内容" @input="input" :radius="100"></uni-search-bar>
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
        keyList:[]
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
        const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.keyWord })
        console.log(res)
        if(res.meta.status!==200) return uni.$showMsg();
        this.keyList = res.message
      }
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
</style>
