<template>
  <view>
    <myLogin v-if="!token" />
    <myUserInfo v-else />
  </view>
</template>

<script>
  import badgeMix from '@/mixin/tabbar-badge.js'
  import {mapState} from 'vuex'
  import myLogin from '@/components/my-login/my-login.vue'
  import myUserInfo from '@/components/my-userInfo/my-userInfo.vue'
  export default {
    mixins:['badgeMix'],
    data() {
      return {
        
      };
    },
    components:{
      myLogin,
      myUserInfo
    },
    computed:{
      ...mapState('m_user',['token'])
    }
  }
</script>

<style lang="scss">

</style>
