<template>
  <div>
    <el-container>
      <el-header class="my-header">
        <div class="hearder" style="padding-top: 20px">
          <el-row>
            <el-col :span="16"><span style="font-size: 1.5rem">批量权限设置</span></el-col>
            <el-col :span="8"><el-button @click="back" :disabled="this.active == 0">上一步</el-button><el-button
                @click="next" :disabled="this.active == 1">下一步</el-button>
              <el-button type="primary" :disabled="canClick" @click="changeRole">确定</el-button></el-col>
          </el-row>
        </div>
        <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
          <el-step title="菜单权限"></el-step>
          <el-step title="选择角色"></el-step> </el-steps>
      </el-header>
      <el-main style="margin-top: 55px">
        <el-card class="info-card infinite-list-wrapper" style="overflow: auto" v-show="this.active == 0">
          <el-tree :data="data" show-checkbox node-key="title" :props="defaultProps" default-expand-all ref="tree"
            @check-change="checkChange" :default-checked-keys="moRen">
          </el-tree>
        </el-card>
        <el-card class="info-card infinite-list-wrapper" style="overflow: auto" v-show="this.active == 1">
          <el-radio-group v-model="name">
            <el-radio-button v-for="(item, index) in userList" :key="index" :label="item.name"></el-radio-button>
          </el-radio-group>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import store from "@/store"
import { deepClone, noRepeat } from '@/utils';
import { getUserList, updateRoles } from "@/api/user"
export default {
  data() {
    return {
      active: 0,
      data: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      choseNodes: [],
      roleStr: "",
      name: "",
      userList: [],
      moRen:[]
    }
  },
  computed: {
    canClick() {
      return !this.name;
    },
  },
  methods: {
    next() {
      this.active += 1;
    },
    back() {
      this.active -= 1;
    },
    checkChange() {
      this.choseNodes = this.$refs.tree.getCheckedNodes(false, true);
      let tempArr = this.choseNodes
        .map((item) => {
          return item.meta.roles[0];
        })
      tempArr = noRepeat(tempArr)
      this.roleStr = tempArr.join(",");
    },
    async changeRole() {
      let result = await updateRoles(this.name, this.roleStr)
      if (result.code == 200) {
        this.$message({
          message: result.msg,
          type: "success",
        })
        if (this.$route.query.name) {
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000)
        } else if (this.name == store.getters.name) {
          setTimeout(() => {
            this.$router.go(0);
          }, 1000)
        } else {
          this.active = 0;
          this.name = "";
          this.$refs.tree.setCheckedNodes([]);
        }
      } else {
        this.$message({
          message: result.msg,
          type: "error",
        });
      }
    }
  },
  async mounted() {
    this.data = deepClone(store.getters.allRoutes)
    let result = await getUserList()
    this.userList = result.data
    if(this.$route.query.roles){
      this.moRen = this.$route.query.roles
      this.name = this.$route.query.name
    }
  }
}
</script>

<style scoped>
.menu-card-style {
  height: calc(100vh - 210px);
}

.info-card {
  margin: 0 5px;
  height: 800px
}

.infinite-list-wrapper {
  height: calc(100vh - 200px);
}
</style>