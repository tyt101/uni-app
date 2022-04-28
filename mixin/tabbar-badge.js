import {mapGetters} from 'vuex'

export default{
  components:{
    ...mapGetters('m_cart',['total'])
  },
  onShow() {
    this.setBadge();
  },
  methods:{
    setBadge() {
        // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
        uni.setTabBarBadge({
           index: 2, // 索引
           text: this.total + '' // 注意：text 的值必须是字符串，不能是数字
        })
     }
  },
  watch:{
    total(){
      this.setBadge()
    }
  }
}