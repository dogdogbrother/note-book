<template>
  <el-dialog
    title="单词录入"
    :visible.sync="state"
    class="dialog"
    width="400px"
    :before-close="close">
    <el-form 
      hide-required-asterisk
      :model="form" 
      ref="form" 
      :rules="rules" 
      label-width="50px" 
      label-position="left"
      size="small"
    >
      <el-form-item label="单词" prop="key">
        <el-input v-model="form.key" />
      </el-form-item>
      <el-form-item label="解释" prop="dec">
        <el-input v-model="form.dec" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item style="text-align: right;">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">录入</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    wordData: []
  },
  data() {
    return {
      state: false,
      form: {
        key: "",
        dec: "", 
      },
      rules: {
        key: [
          { required: true, message: '请输入单词', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              // 如果已经有了 就不让重复录入
              if (this.wordData.includes(value)) {
                callback(new Error(rule.message))
              } else callback();
            },
            message: '已经录入此单词',
            trigger: 'blur'
          }
        ],
        dec: [{ required: true, message: '请输入单词中文解释', trigger: 'blur' }]
      }
    }
  },
  methods: {
    close() {
      this.state = false
    },
    open() {
      this.state = true
      this.$refs.form.resetFields()
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("update", this.form)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
>>> .el-dialog__body
  padding-bottom 10px
</style>