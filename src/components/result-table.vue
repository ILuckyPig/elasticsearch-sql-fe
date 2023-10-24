<template>
    <el-table :header-cell-style="{ background: '#eff2f9' }"
        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe border>
        <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label">
        </el-table-column>
    </el-table>
    <el-pagination class="table-pagination" background layout="->, total, prev, pager, next, sizes" :page-size="pageSize" :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]" :total="total" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
</template>
<script lang="ts">
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { defineComponent, onUpdated, reactive, toRefs } from 'vue';
// TODO page table

export default defineComponent({
    name: 'result-table',
    components: {
        ElTable,
        ElTableColumn,
        ElPagination
    },
    props: {
        tableData: {
            type: Array<Array<string>>,
            required: true
        },
        columns: {
            type: Array<TableColumn>,
            required: true
        }
    },
    setup(props) {
        const state = reactive({
            currentPage: 1,
            pageSize: 10,
            total: 0
        });

        onUpdated(() => {
            state.total = props.tableData.length;
        })

        //改变页码
        function handleCurrentChange(e: number) {
            state.currentPage = e;
        };
        //改变页数限制
        function handleSizeChange(e: number) {
            state.pageSize = e;
        };
        return {
            handleCurrentChange,
            handleSizeChange,
            ...toRefs(state)
        }
    }
})
</script>
<style scoped>
.table-pagination {
    margin-top: 6px;
}
</style>