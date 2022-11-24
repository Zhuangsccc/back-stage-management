<template>
  <el-card>
    <div >
      <el-button type="primary" style="float: left; margin-right: 30px;">添加学生</el-button>
      <FilterBar></FilterBar>
    </div>
    <div style="min-width: 1100px;">
      <el-table :data="tableData" style="width: 100%;" >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="学生姓名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="辅导员">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="学生ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="电话号码">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="家庭地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="学院专业">
                <span>{{ props.row.major }}</span>
              </el-form-item>
              <el-form-item label="学生宿舍">
                <span>{{ props.row.hotel }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="学生ID" prop="id" > </el-table-column>
        <el-table-column label="学生姓名" prop="name"> </el-table-column>
        <el-table-column label="学院班级" prop="major"> </el-table-column>
        <el-table-column label="辅导员" prop="shop" width="100px"> </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="{ row, index }">
                  <el-link type="primary" :underline="false">编辑</el-link>
                  <el-link
                    type="danger"
                    :underline="false"
                    style="margin-left: 10px"
                    >删除</el-link
                  >
                </template>
           </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="10"
        layout=" prev, pager, next, jumper"
        :total="400"
        align="center">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "王晓波",
          phone: "18558977471",
          major: "新工科学院数据科学与大数据技术",
          address: "福建省泉州市惠安县东桥镇东埭仔",
          shop: "林欢",
          shopId: "10333",
          hotel:"凤达学生公寓D521"
        },
        {
          id: "12987123",
          name: "张博凯",
          phone: "18558977471",
          major: "新工科学院数据科学与大数据技术",
          address: "上海市普陀区真北路",
          shop: "林欢",
          shopId: "10333",
          hotel:"凤达学生公寓D521"
        },
        {
          id: "12987125",
          name: "庄思超",
          phone: "18558977471",
          major: "新工科学院数据科学与大数据技术",
          address: "上海市普陀区真北路",
          shop: "林欢",
          shopId: "10333",
          hotel:"凤达学生公寓D521"
        },
        {
          id: "12987126",
          name: "王朝臻",
          phone: "18558977471",
          major: "土木学院土木工程",
          address: "上海市普陀区真北路",
          shop: "林欢 ",
          shopId: "10333",
          hotel:"凤达学生公寓D521"
        },
        {
          id: "12987122",
          name: "王晓波",
          phone: "18558977471",
          major: "新工科学院数据科学与大数据技术",
          address: "福建省泉州市惠安县东桥镇东棣子",
          shop: "林欢",
          shopId: "10333",
          hotel:"凤达学生公寓D521"
        },
        {
          id: "12987122",
          name: "王晓波",
          phone: "18558977471",
          major: "新工科学院数据科学与大数据技术",
          address: "福建省泉州市惠安县东桥镇东棣子",
          shop: "林欢",
          shopId: "10333",
          hotel:"凤达学生公寓D521"
        },
        {
          id: "12987122",
          name: "王晓波",
          phone: "18558977471",
          major: "新工科学院数据科学与大数据技术",
          address: "福建省泉州市惠安县东桥镇东棣子",
          shop: "林欢",
          shopId: "10333",
          hotel:"凤达学生公寓D521"
        },
        {
          id: "12987122",
          name: "王晓波",
          phone: "18558977471",
          major: "新工科学院数据科学与大数据技术",
          address: "福建省泉州市惠安县东桥镇东棣子",
          shop: "林欢",
          shopId: "10333",
          hotel:"凤达学生公寓D521"
        },
        {
          id: "12987122",
          name: "王晓波",
          phone: "18558977471",
          major: "新工科学院数据科学与大数据技术",
          address: "福建省泉州市惠安县东桥镇东棣子",
          shop: "林欢",
          shopId: "10333",
          hotel:"凤达学生公寓D521"
        },
        {
          id: "12987122",
          name: "王晓波",
          phone: "18558977471",
          major: "新工科学院数据科学与大数据技术",
          address: "福建省泉州市惠安县东桥镇东棣子",
          shop: "林欢",
          shopId: "10333",
          hotel:"凤达学生公寓D521"
        }, {
          id: "12987122",
          name: "王晓波",
          phone: "18558977471",
          major: "新工科学院数据科学与大数据技术",
          address: "福建省泉州市惠安县东桥镇东棣子",
          shop: "林欢",
          shopId: "10333",
          hotel:"凤达学生公寓D521"
        },
      ],
    };
  },
  methods: {
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>