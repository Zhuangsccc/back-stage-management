<template>
  <div >
    <FilterBar></FilterBar>
    <el-button type="" @click="test"></el-button>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar"
export default {
  name: "DailyAffairs",
  components:{FilterBar},
  data() {
    return {
      show:false
    };
  },  
  methods: {
    test(){
      const data = {
        name:"admin",
        roles:"ROOT,日常事务,日常事务管理"
      }
      this.$store.dispatch("user/updateTheRoles",data)
    }
  },
};
</script>

<style scoped>
</style>