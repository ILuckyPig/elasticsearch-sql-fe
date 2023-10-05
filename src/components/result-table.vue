<template>
    <n-data-table :columns="columns" :data="data" striped />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import { NDataTable, type DataTableColumns } from 'naive-ui'

type RowData = {
    key: number
    name: string
    age: number
    address: string
}

const createColumns = (): DataTableColumns<RowData> => {
    return [
        {
            title: 'Name',
            key: 'name'
        },
        {
            title: 'Age',
            key: 'age'
        },
        {
            title: 'Address',
            key: 'address'
        }
    ]
}

const createData = (): RowData[] => [
    {
        key: 0,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park'
    },
    {
        key: 1,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
    },
    {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    }
]

export default defineComponent({
    name: 'result-table',
    components: { NDataTable },
    setup() {
        return {
            data: createData(),
            columns: createColumns()
        }
    }
})
</script>