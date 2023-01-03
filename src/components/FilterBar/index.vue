<template>
     <el-card class="filter-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="关键词">
            <el-input
              v-model="formInline.keyWord"
              placeholder="请输入关键词"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sendKeyWord">查询</el-button>
            <el-button @click="clearKeyWord" >重置</el-button>
          </el-form-item>
        </el-form>
     </el-card>
</template>

<script>
export default {
  name:"FilterBar",
  data(){
    return{
      formInline:{
        keyWord:""
      }
    }
  },
  methods:{
    sendKeyWord(){
      this.$emit("getKeyWord",this.formInline.keyWord)
    },
    clearKeyWord(){
      this.formInline.keyWord=""
      this.sendKeyWord()
    }
  }
}
</script>

<style>
.filter-box{
  min-width: 1100px;
  height: 80px;
  margin: 10px 0;
}
</style>