<template>
  <div>
    <div>
      <FilterBar @getKeyWord="getKeyWord"></FilterBar>
      <el-card class="info-card infinite-list-wrapper" style="overflow: auto">
        <el-button type="primary" @click="addNew">新建</el-button>
        <el-button  @click="reInit">刷新</el-button>
        <el-table
          class="el-table-style"
          :data="
            tableData.filter(
              (data) =>
                !keyword ||
                data.name.toLowerCase().includes(keyword.toLowerCase())
            )
          "
          style="width: 100%"
          :default-sort="{ prop: 'time', order: 'descending' }"
        >
          <el-table-column label="序号" type="index" align="center" width="80">
          </el-table-column>
          <el-table-column label="收费名称" prop="entry_name" align="center">
          </el-table-column>
          <el-table-column
            label="价格"
            prop="price"
            align="center"
            width="200"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="时间"
            prop="creation_time"
            align="center"
            sortable
          >
          </el-table-column>
          <el-table-column label="描述" prop="desc" align="center">
          </el-table-column>
          <el-table-column label="收款码" align="center">
            <template slot-scope="{ row }">
              <img v-show="row.image_url" class="finan-img" :src="row.image_url" alt="" />
              <img v-show="!row.image_url" :src="moren_img" class="finan-img">
                </img>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-link
                type="danger"
                :underline="false"
                style="margin-left: 10px"
                @click="goDelete(row)"
                >删除</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <Pagination
        v-show="show"
        @getPageInfo="getPageInfo"
        :total="total"
      ></Pagination>
    </div>
    <el-dialog title="新建财务收费" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: 90%" :rules="rules" ref="myForm">
        <el-form-item
          label="收费名称"
          :label-width="formLabelWidth"
          prop="entry_name"
        >
          <el-input v-model="form.entry_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="desc">
          <el-input v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款码" :label-width="formLabelWidth" prop="image_url">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action="https://wxapi.zsc.world/api/upload/avatar"
            :auto-upload="false"
            :show-file-list="false"
            :data="data"
            :on-change="handleAvatarSuccess"
            :on-success="onSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="okHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getFinancialCharges,addNewCharges,deleteCharges } from "@/api/finance";
import {getMoment} from "@/utils/index"
import {nanoid} from "nanoid"
export default {
  data() {
    var moren_img = require("@/assets/暂无图片.png")
    return {
      moren_img,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      keyword: "",
      show: false,
      total: 0,
      pageIndex: 0,
      pageSize: 10,
      tableData: [],
      form: {
        id:0,
        entry_name:"",
        price:'',
        is_pay:0,
        creation_time:'',
        desc:"",
        image_url:''
      },
      rules: {
        entry_name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        desc:[{ required: true, message: "请输入描述", trigger: "blur" }]
      },
      imageUrl: '',
      data:{id:null,type:""},
    };
  },
  methods: {
    getKeyWord(e) {
      this.keyword = e;
    },
    async getPageInfo(pageIndex, pageSize) {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.initTableData();
    },
    async initTableData() {
      let result = await getFinancialCharges(this.pageIndex, this.pageSize);
      if (result.code == 200) {
        this.tableData = result.data.tableData;
        if (result.data.total) {
          this.total = result.data.total;
        }
        return new Promise((resolve, reject) => {
          resolve(result.code)
        })
      }
    },
    goDelete(row) {},
    okHandler() {
        let id = nanoid()
        this.data.id=id
        this.data.type="财务收费"
        this.form.creation_time = getMoment(new Date());
        this.form.id = id
        this.$refs.upload.submit();
        this.initTableData()
    },
    addNew() {
      this.dialogFormVisible = true;
    },
    handleAvatarSuccess(file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
       async onSuccess(res,file){
        this.form.image_url = res.data.img_url
        let result = await addNewCharges(this.form)
        if(result.code==200){
            this.$message({
            message: result.msg,
            type: 'success'
        });
        this.dialogFormVisible=false
        }else{
          this.$message.error(result.msg);
        }
      },
      async  reInit(){
      const code = await this.initTableData()
      if(code==200){
        this.$message({
          message:'刷新成功！',
          type:"success"
        })
      }
    },
      goDelete(row){
        this.$confirm("此操作将永久删除该条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await deleteCharges(row.id);
          const { code, msg } = result;
          if (code == 200) {
            this.$message({
              type: "success",
              message: result.msg,
            });
            this.initTableData();
          } else {
            this.$message.error(msg);
            this.tableData=[]
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      }
  },
  mounted() {
    this.initTableData();
    setTimeout(() => {
      this.show = true;
    }, 400);
  },
};
</script>

<style>
.info-card {
  margin: 0 5px;
  height: 800px;
}

.infinite-list-wrapper {
  height: calc(100vh - 200px);
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .finan-img{
    height: 120px;
  }
</style>