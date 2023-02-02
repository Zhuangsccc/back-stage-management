<template>
    <div>
        <FilterBar></FilterBar>
        <div style="display: flex;">
            <el-card class="info-card infinite-list-wrapper" style="overflow: auto;margin: 0 5px; width: 75%;">
                <el-card class="margin-top" v-for="(item) in tableData" :key="item.id">
                    <el-descriptions :title="item.title" :column="3" size="medium">
                        <template slot="extra">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="item.id + ',1'">通过</el-dropdown-item>
                                    <el-dropdown-item :command="item.id + ',2'">驳回</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                        <el-descriptions-item label="价格">{{ item.price }}</el-descriptions-item>
                        <el-descriptions-item label="时间">{{ item.time }}</el-descriptions-item>
                        <el-descriptions-item label="报送人">{{ item.submitter }}</el-descriptions-item>
                        <el-descriptions-item label="类型">
                            <el-tag size="small">{{ item.type }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="当前审批人">{{ name }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-card>
            <el-card style="width: 25%;">
                <span class="main-right-header">财务信息</span>
                <el-descriptions :column="columnNumber" style="margin-top: 20px;" :labelStyle="labelStyle"
                    :contentStyle="contentStyle">
                    <el-descriptions-item label="未审批条数">{{ total }}</el-descriptions-item>
                    <el-descriptions-item label="最后申报时间">{{
                        tableData.length && tableData[0].time
                    }}</el-descriptions-item>
                    <el-descriptions-item label="当前审批人">{{ name }}</el-descriptions-item>
                </el-descriptions>
            </el-card>
        </div>
        <Pagination v-show="show" @getPageInfo="getPageInfo" :total="total"></Pagination>
    </div>
</template>

<script>
import { getApprovalList, updateFinace } from "@/api/finance"
import store from "@/store"
export default {
    data() {
        return {
            tableData: [],
            show: false,
            total: 0,
            pageIndex: 0,
            pageSize: 10,
            name: store.getters.name,
            columnNumber: 1,
            labelStyle: {
                "font-size": "18px"
            },
            contentStyle: {
                "font-size": "18px"
            },
        }
    },
    mounted() {
        this.initTableData()
        setTimeout(() => {
            this.show = true
        }, 400)
    },
    methods: {
        async getPageInfo(pageIndex, pageSize) {
            this.pageIndex = pageIndex
            this.pageSize = pageSize
            this.initTableData()
        },
        async initTableData() {
            let result = await getApprovalList(this.pageIndex, this.pageSize)
            if (result.code == 200) {
                this.tableData = result.data.tableData
                if (result.data.total) {
                    this.total = result.data.total
                }
            }
        },
        async handleCommand(command) {
            let id = command.split(",")[0]
            let state = command.split(",")[1]
            let data = {
                id,
                state,
                approver: this.name
            }
            let result = await updateFinace(data)
            if (result.code == 200) {
                this.$message({
                    message: state == "1" ? '通过成功' : '已驳回',
                    type: 'success'
                });
                this.initTableData()
            } else {
                this.$message.error(result.msg);
            }
        }
    }
}
</script>

<style>
.info-card {
    margin: 0 5px;
    height: 800px
}

.infinite-list-wrapper {
    height: calc(100vh - 200px);
}

.margin-top {
    margin-top: 10px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.main-right-header {
    font-size: 22px;
    font-weight: 550;
}
</style>