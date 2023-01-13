<template>
    <div>
        <FilterBar></FilterBar>
        <el-card class="info-card infinite-list-wrapper" style="overflow: auto;margin: 0 5px;">
            <el-card class="margin-top" v-for="(item) in tableData" :key="item.id">
                <el-descriptions :title="item.title" :column="3" size="medium">
                    <template slot="extra">
                        <el-button type="primary" size="small">操作</el-button>
                    </template>
                    <el-descriptions-item label="价格">{{ item.price }}</el-descriptions-item>
                    <el-descriptions-item label="时间">{{ item.time }}</el-descriptions-item>
                    <el-descriptions-item label="报送人">{{ item.submitter }}</el-descriptions-item>
                    <el-descriptions-item label="类型">
                        <el-tag size="small">{{ item.type }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="审批人">{{ name }}</el-descriptions-item>
                </el-descriptions>
            </el-card>
        </el-card>
        <Pagination v-show="show" @getPageInfo="getPageInfo" :total="total"></Pagination>
    </div>
</template>

<script>
import FilterBar from "@/components/FilterBar"
import Pagination from "@/components/Pagination"
import { getApprovalList } from "@/api/finance"
import store from "@/store"
export default {
    data() {
        return {
            tableData: [],
            show: false,
            total: 0,
            pageIndex: 0,
            pageSize: 10,
            name: store.getters.name
        }
    },
    components: { FilterBar, Pagination },
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
</style>