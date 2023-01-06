<template>
    <el-dialog :title="title" :visible.sync="dia">
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
                <span v-show="this.typeSelect" style="color:#f85f73;">PS:顶级节点下第一层级需要是目录</span>
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
            <el-button @click="okHandler" type="primary">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import icon from "@/icon/icon";
import { addRoutes } from "@/api/menu"
import {getItemByNameInTree} from "@/utils/routeSet"
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
        },
        tableData: {
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
                //地址
                path: "",
                //说明
                desc: "",
                path2: "",
                state: true
            },
            rules: {
                parentName: [
                    { required: true, message: "请选择上级", trigger: "blur" },
                ],
                name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
                icon: [{ required: true, message: "选择图标", trigger: "change" }],
                type: [{ required: true, message: "请选择类型", trigger: "blur" }],
                path: [
                    { required: true, message: "请输入链接或地址", trigger: "blur" },
                ],
                path2: [
                    { require: true, message: "请输入链接地址", trigger: "blur" },
                    {
                        pattern: /^(https?:|mailto:|tel:)/,
                        message: "请输入符合规则的链接地址,仅支持http网址",
                        trigger: "change",
                    },
                ],
            },
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
            dia: false,
            changeNode:{}
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
        async addToRoutes() {
            const { name, type, icon, state } = this.form
            if (this.form.parentName == "顶级节点") {
                let route = {
                    component: "Layout",
                    meta: {
                        title: name,
                        roles: ["ROOT"],
                        icon,
                    },
                    path: '/' + name,
                    type,
                    state,
                }
                route = JSON.stringify(route)
                let result = await addRoutes(route)
                return new Promise((resolve, reject) => {
                    resolve(result)
                })
            }else{
                
            }
        },
        //点击确认回调
        okHandler() {
            this.$refs.myForm.validate(async (success) => {
                if (success) {
                    const { code } = await this.addToRoutes();
                    if (code == 200) {
                        this.$message({
                            type: "success",
                            message: "操作成功!",
                        });
                    }
                    setTimeout(() => {
                        this.$router.go(0)
                    }, 2000)
                } else {
                    ("error submit!!");
                    return false;
                }
            });
        },
    },
    watch: {
        dialogFormVisible(newValue) {
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
                //移除校验
                this.$nextTick(() => {
                    this.$refs.myForm.clearValidate()
                })
            }
            this.dia = newValue
        },
        dia(newValue) {
            if (!newValue) {
                this.$emit("changeDia", false)
            }
        },
        "form.parentName"(newValue) {
            if (newValue == "顶级节点") {
                this.form.type = "目录"
                this.typeSelect = true
            } else {
                this.typeSelect = false
                this.changeNode = getItemByNameInTree(this.form.parentName,this.tableData)
            }
        }
    }
}
</script>

<style>

</style>