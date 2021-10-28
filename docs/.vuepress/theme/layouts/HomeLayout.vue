<template>
  <div class="wrap">
    <div class="adorn" />
    <div class="content">
      <div class="position-trigon"/>
      <div class="blog-info">
        <div class="website-info">
          <h1>gunsliner</h1>
          <p>一些笔记用于复制粘贴  一些记录日常所得  一些知识积累  一些分享  一些备忘</p>
          <p>人在北京 混混日子</p>
        </div>
        <ul class="blog-list">
          <li v-for="item in nav" :key="item.text">
            <a :href="getHtmlUrl(item.link)" v-if="item.link">{{item.text}}</a>
            <span v-else>{{item.text}}</span>
            <ul v-if="item.items">
              <li v-for="subItem in item.items" :key="subItem.text">
                <a :href="getHtmlUrl(subItem.link)" v-if="subItem.link">{{subItem.text}}</a>
              </li>
            </ul>
          </li>
        </ul>
        <div class="user-info">
          <div class="user-avatar" />
          <div class="info">
            <p>
              <span>Wechat</span>
              <span>tsdhr1</span>
            </p>
            <p>
              <span>Github</span>
              <span>dogdogbrother</span>
            </p>
            <p>
              <span>QQ</span>
              <span>476410344</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: []
    }
  },
  created() {
    this.nav = this.$themeConfig.nav
    console.log(this.$themeConfig.nav);
  },
  methods: {
    getHtmlUrl(link) {
      console.log(link);
      return link.replace(".md", ".html")
    }
  }
}
</script>

<style lang="stylus" scoped>
ul 
  margin 0
  padding 0
  list-style none

@media screen and (min-width:1000px)
  .wrap
    height 100vh
    overflow hidden
    display: flex
    .adorn
      width 72%
      height 100%
      background-image url(../../public/img/home-bg.jpeg)
      background-size cover
      background-position center center
  .content
    width 28%
    height 100%
    position relative  
    padding 45px 15px 20px 15px
    box-sizing: border-box
    .position-trigon
      background-color #fff
      position absolute
      left -55px
      width 50%
      height 120%
      z-index 10
      top -10%
      transform rotate(5deg)

.blog-info
  position relative  
  z-index 11
  height: 100%
  display flex
  flex-direction: column
  justify-content space-between
  .blog-info
    height: 100%
  .website-info
    h1
      border-bottom none
      margin 0 0 20px 0
    p
      font-size 14px
      line-height: 1.5
      color #6a8bad

  .blog-list
    flex 1
    padding 20px 0
    > li
      margin-bottom: 5px
    span
      font-size: 15px
      font-weight: bold
    ul 
      padding-left 20px

  .user-info 
    display: flex
    height: 80px
    margin: 0 auto
    position relative
    left -15px
    .user-avatar
      background-image url(../../public/img/avatar.png)
      background-size: cover
      width 80px
      height: 80px
      border-radius: 50%
    .info 
      padding 3px 0
      margin-left: 20px
      display: flex
      flex-direction: column
      justify-content space-around
      p
        margin: 0
        font-size: 13px
        font-weight: bold
      

</style>