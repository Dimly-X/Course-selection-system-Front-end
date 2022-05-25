<template>
<div>
    <div class="common-table">
        <el-table :data="tableData" height=680px stripe border>
            <el-table-column
                show-overflow-tooltip
                align="center"
                header-align="center"
                v-for="item in tableLabel"
                :key="item.prop"
                :label="item.label"
                :width="item.width"
            >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
            </template>
            </el-table-column>
            <el-table-column
                label="详情"
                align="center"
                header-align="center"
            >
                <template>
                    <el-link type="primary" @click="handleLook">查看</el-link>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                min-width="180"
                align="center"
                header-align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- @current-change是改变页数的时候的回调函数 -->
    </div>
    <div>
    <el-pagination
            class="pager"
            layout="prev, pager, next"
            :total="config.total"
            :current-page.sync="config.page"
            @current-change="changePage"
            page-size="10"

            >
        </el-pagination>
    </div>
    </div>
</template>

<script>
export default {
    name: "CommonTable",
    props: {
        tableData: Array,
        tableLabel: Array,
        config: Object   //分页的配置数据
    },
    data(){
        return {}
    },
    methods: {
        handleEdit(row) {
            this.$emit('edit', row)
        },
        handleDelete(row) {
            this.$emit('del', row)
        },
        handleLook(row) {
            this.$emit('look', row)
        },
        changePage(page) {
            this.$emit('changePage', page)
        }
    }
}
</script>


 <style lang="less" scoped>
    .common-table {
        height: calc(100% - 62px);
        position: relative;
    }
    .pager {
        position: absolute;
        right: 20px;
        bottom: 0;
    }
</style>
