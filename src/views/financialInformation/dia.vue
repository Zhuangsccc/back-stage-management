<template>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="myForm" style="width: 90%;" :rules=rules>
            <el-form-item label="名称:" :label-width="formLabelWidth" prop="title">
                <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="金额:" :label-width="formLabelWidth" prop="price">
                <el-input v-model="form.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型:" :label-width="formLabelWidth" prop="type">
                <el-select v-model="form.type" placeholder="请选择类型" style="width: 100%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间:" :label-width="formLabelWidth" prop="time">
                <el-date-picker v-model="form.time" type="date" placeholder="选择日期" style="width: 100%;"
                    :picker-options="pickerOptions" format="yyyy 年 MM 月 dd 日"  value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="报送人:" :label-width="formLabelWidth" prop="submitter">
                <el-input v-model="form.submitter" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="okHandler">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { addNewFinance } from "@/api/finance"
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        diaForm: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dialogFormVisible: false,
            form: {
                title: "",
                price: "",
                type: "",
                time: "",
                submitter: "",
                state: 0,
                approver: "暂无"
            },
            formLabelWidth: "120px",
            options: [{
                value: '公费',
                label: '公费'
            }, {
                value: '采购',
                label: '采购'
            }, {
                value: '运维',
                label: '运维'
            }, {
                value: '其他',
                label: '其他'
            },],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            rules: {
                title: [{ required: true, message: "请输入名称", trigger: "blur" }],
                type: [{ required: true, message: "请选择类型", trigger: "blur" }],
                price: [{ required: true, message: "请输入价格", trigger: "blur" }],
                time: [{ required: true, message: "请选择时间", trigger: "blur" }],
                submitter: [{ required: true, message: "请输入报送人", trigger: "blur" }],
            }
        }
    },
    methods: {
        async okHandler() {
            if (this.title == "新增财务") {
                let result = await addNewFinance(this.form)
                if (result.code == 200) {
                    this.$emit("update")
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    })
                    this.dialogFormVisible=false
                }
            }
        }
    },
    watch: {
        diaForm: {
            handler(newValue) {
                this.dialogFormVisible = newValue
            }
        },
        dialogFormVisible: {
            handler(newValue) {
                if (!newValue) {
                    this.$emit("changeDia", newValue)
                }
            }
        }
    }
}
</script>

<style>

</style>