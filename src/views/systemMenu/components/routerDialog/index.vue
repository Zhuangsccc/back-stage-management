<template>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :show-close=false>
        <el-form :model="form" style="width: 90%" size="small" :rules="rules" ref="myForm">
            <el-form-item label="上级" :label-width="formLabelWidth" prop="parentName">
                <el-select v-model="form.parentName" placeholder="请选择" ref="selectTree" style="width: 100%">
                    <el-option :value="form.parentName" :label="form.parentName" hidden />
                    <el-tree :data="treeRoutes" @node-click="handleNodeClick" :props="defaultProps" node-key="id"
                        accordion highlight-current />
                </el-select>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="icon" :label-width="formLabelWidth">
                <el-popover placement="bottom" width="450" trigger="click" @show="popoverShow">
                    <span slot="reference">
                        <el-input suffix-icon="data-icon" v-model="form.icon" placeholder="请输入">
                            <template slot="append"><i :class="form.icon" /></template>
                        </el-input>
                    </span>
                    <div class="iconList">
                        <el-tabs v-model="activeName">
                            <el-tab-pane v-for="(item, index) in iconList" :key="item.label" :name="index + ''"
                                :label="item.label">
                                <i v-for="item in item.list" :key="item" :class="item" @click="setIcon(item)"
                                    style="font-size: 20px"></i>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-popover>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
                <el-select v-model="form.type" placeholder="请选择" style="width: 100%" :disabled="this.typeSelect">
                    <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <span v-show="this.typeSelect" style="color:#f85f73;">PS:该目录下含有其他页面或目录,无法改变类型</span>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth" prop="path" v-if="form.type == '页面'">
                <el-input placeholder="填写地址" v-model="form.path">
                    <template slot="prepend">@/views/</template>
                </el-input>
            </el-form-item>
            <el-form-item label="链接" :label-width="formLabelWidth" prop="path2" v-if="form.type == '外链'">
                <el-input placeholder="填写地址" v-model="form.path2">
                    <template slot="prepend">链接地址</template>
                </el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input-number v-model="form.sort" :min="0" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
                <el-switch v-model="form.state" active-text="正常" inactive-text="禁用">
                </el-switch>
            </el-form-item>
            <el-form-item label="说明" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.desc" rows="5"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeDia">取 消</el-button>
            <el-button @click="changeDia" type="primary">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import icon from "@/icon/icon";
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        dialogFormVisible: {
            type: Boolean,
            default: false
        },
        treeRoutes: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            iconList: [],
            form: {
                //父亲节点名称
                parentName: "",
                //名称
                name: "",
                //图标
                icon: "",
                //类型
                type: "",
                //排序
                sort: 0,
                //地址
                path: "",
                //说明
                desc: "",
                path2: "",
                state: true
            },
            rules: {},
            formLabelWidth: "120px",
            defaultProps: {
                children: "children",
                label: "title",
            },
            //激活的标签页
            activeName: "0",
            typeOptions: [
                {
                    value: "目录",
                    label: "目录",
                },
                {
                    value: "页面",
                    label: "页面",
                },
                {
                    value: "外链",
                    label: "外链",
                },
            ],
            typeSelect: false,
        }
    },
    mounted() {
        this.iconList = icon.iconList
    },
    methods: {
        popoverShow() {
            this.$nextTick(() => {
                this.activeName = "0";
            });
        },
        setIcon(icon) {
            this.$set(this.form, "icon", icon);
        },
        changeDia() {
            this.$emit("changeDia", false)
        },
        handleNodeClick(val) {
            this.form.parentName = val.title;
            this.$refs.selectTree.blur();
        },
    },
    watch: {
        dialogFormVisible() {
            if (this.title == "新增路由") {
                this.form = {
                    //父亲节点名称
                    parentName: "",
                    //名称
                    name: "",
                    //图标
                    icon: "",
                    //类型
                    type: "",
                    //排序
                    sort: 0,
                    //地址
                    path: "",
                    //说明
                    desc: "",
                    path2: "",
                    state: true
                }
            }
        }
    }
}
</script>

<style>

</style>