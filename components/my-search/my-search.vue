<template>
  <view>
    <view class="my-search-container" :style="{'background-color':bgcolor}" @click="gotoSearch">
      <view class="my-search-box" :style="{'border-radius':bgradius+ 'px'}">
        <uni-icons type="search" size="17"></uni-icons>
        <text class="placeholder">搜索</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      bgcolor:{
        type:String,
        default:'#C00000'
      },
      bgradius:{
        type:Number,
        default:18
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      gotoSearch(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  .my-search-box{
    height: 36px;
    width: 100%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>