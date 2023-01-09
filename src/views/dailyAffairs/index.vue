<template>
  <div >
    <FilterBar></FilterBar>
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
  mounted(){
  },
  methods: {
  
  },
};
</script>

<style scoped>
</style>