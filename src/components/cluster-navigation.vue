<template>
    <el-dropdown trigger="click" class="cluster-navigation-selector">
        <el-button type="primary" class="cluster-navigation-selector-button">
            数据源: {{ clusterName }}
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>10.18.52.49</el-dropdown-item>
                <el-dropdown-item>10.18.52.5</el-dropdown-item>
                <el-dropdown-item>10.18.68.120</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts">
import { ElButton, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { defineComponent, onUpdated, ref } from 'vue';

export default defineComponent({
    name: 'cluster-navigation',
    components: {
        ElButton,
        ElDropdown,
        ElDropdownMenu,
        ElDropdownItem
    },
    setup() {
        const clusterName = ref('');
        onUpdated(() => {
            console.log('clusterName: ' + clusterName.value);
        });
        return {
            clusterName
        }
    },
})
</script>
<style scoped>
.cluster-navigation-selector {
    width: 100%;
    text-align: left;
}

.cluster-navigation-selector-button {
    width: 100%;
    text-align: left;
}
</style>