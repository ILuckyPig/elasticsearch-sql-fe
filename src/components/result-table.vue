<template>
    <el-table :header-cell-style="{ background: '#eff2f9' }" :data="tableData()" stripe border>
        <el-table-column v-for="column in columns" :column-key="column.prop" :prop="column.prop" :label="column.label">
        </el-table-column>
    </el-table>
    <div>
        <el-pagination background layout="total, prev, pager, next, sizes" :page-size="pageSize" :current-page="page"
            :page-sizes="[10, 20, 50, 100]" :total="total" @current-change="handleCurrentChange"
            @size-change="handleSizeChange"></el-pagination>
    </div>
</template>
<script lang="ts">
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { defineComponent, reactive, toRefs } from 'vue';
// TODO page table

export default defineComponent({
    name: 'result-table',
    components: {
        ElTable,
        ElTableColumn,
        ElPagination
    },
    props: {
        allTableData: {
            type: Array<Array<string>>,
            required: true
        },
        columns: {
            type: Array<string>,
            required: true
        }
    },
    setup(props) {
        const state = reactive({
            page: 1,
            pageSize: 10,
            total: props.allTableData.length
        });
        const tableData = (): Array<Array<string>> => {
            return props
                .allTableData
                // .filter((_item, index) => index < state.page * state.pageSize && index >= state.pageSize * (state.page - 1));
        };
        //改变页码
        function handleCurrentChange(e: number) {
            state.page = e;
        };
        //改变页数限制
        function handleSizeChange(e: number) {
            state.pageSize = e;
        };
        return {
            tableData,
            handleCurrentChange,
            handleSizeChange,
            ...toRefs(state)
        }
    }
})
</script>