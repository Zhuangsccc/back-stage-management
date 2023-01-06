<template>
  <div>
    <FilterBar @getKeyWord="getKeyWord"></FilterBar>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar"
export default {
    name:"FinancialInformation",
    components:{FilterBar},
    data(){
      return {
        keyword:""
      }
    },
    methods:{
      getKeyWord(e){
        this.keyword = e
      }
    }
}
</script>

<style>

</style>