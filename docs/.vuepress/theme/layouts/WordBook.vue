<template>
  <div class="wrap">
    <div class="word-exam">
      <span class="word" v-if="wordData.length">
        {{wordData[wordIndex].key}}
      </span>
      <el-button v-else type="primary" size="mini">尚无生词,去录入</el-button>
      <div class="word-btns">
        <el-button type="text" @click="remember" :disabled="cardLock">认识</el-button>
        <el-button type="text" :disabled="cardLock">不认识</el-button>
        <el-button type="text" :disabled="cardLock">已掌握</el-button>
        <el-button type="text" :disabled="cardLock">删除</el-button>
      </div>
    </div>
    <el-card class="box-card" v-if="cardLock">
      <div slot="header" class="card-header">
        <span>{{wordData[wordIndex].key}}</span>
        <el-button type="text" style="padding: 3px 0" @click="confirmWord">确定</el-button>
      </div>
      <div v-html="wordData[wordIndex].dec">
        
      </div>
    </el-card>
    <div class="operate">
      <el-button type="primary" size="mini" @click="entering">录入生词</el-button>
      <el-button type="success" size="mini">查看熟词</el-button>
      <el-button type="info" size="mini">使用说明</el-button>
      <el-button type="warning" size="mini">返回主页</el-button>
    </div>
    <EnteringDialog 
      ref="enteringDialog" 
      :wordData="wordData"
      @update="addUpdate"
    />
  </div>
</template>

<script>
import EnteringDialog from './components/EnteringDialog.vue'
export default {
  components: { EnteringDialog },
  created() {
    const wordData = localStorage.getItem("wordData")
    this.wordData = wordData ? JSON.parse(wordData) : []
  },
  computed: {
    getCurrentWord() {
      return this.wordData[this.wordIndex] || {}
    }
  },
  data() {
    return {
      wordData: [],
      wordIndex: 0,
      cardLock: false,  // 当单词卡片存在时,锁定单词的认识/删除等按钮
      action: 1,  // 枚举,作为临时变量记录动作,1=记住,2=忘记,3=掌握
    }
  },
  methods: {
    entering() {
      this.$refs.enteringDialog.open()
    },
    formatWord(obj) {
      return {
        ...obj,
        recognize: 0,
        forget: 0,
        conR: 0,  // continuous-recognize 意思是连续记住的意思
        conF: 0,  // 连续忘记
      }
    },
    addUpdate(obj) {
      this.wordData.push(obj)
      localStorage.setItem("wordData", JSON.stringify(this.wordData))
    },
    // 认识此单词
    remember() {
      this.cardLock = true
      this.action = 1
    },
    // 确定认识或不认识或掌握此单词
    confirmWord() {
      this.cardLock = false
      const word = this.wordData[this.wordIndex]
      switch(this.action) {
        case 1:
          word.recognize += 1
          word.conR += 1
          word.conF = 0
          break;
        case 2:
          word.forget += 1
          word.conF += 1
          word.conR = 0
          break;
        case 3:
          word.recognize = 0
          word.forget = 0
          word.conF = 0
          word.conR = 0
          // this
          break;
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrap
  padding 10px
  display flex
  justify-content space-between

.word-exam 
  .word
    font-size: 22px
    font-weight bold

.operate
  display: flex
  flex-direction: column
  > *
    margin: 0 0 10px 0

.box-card 
  width: 400px
  .card-header
    display: flex
    justify-content: space-between
    span
      font-size: 20px
      font-weight: bold

</style>