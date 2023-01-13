<template>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="myForm" style="width: 90%;">
            <el-form-item label="名称:" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="金额:" :label-width="formLabelWidth">
                <el-input v-model="form.price" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
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
                price:"",

            },
            formLabelWidth: "120px"
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