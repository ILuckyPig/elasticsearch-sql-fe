<template>
    <n-code :code="code" language="json"/>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { NCode } from "naive-ui";

export default defineComponent({
    name: 'result-explain',
    components: { NCode },
    setup() {
        return {
            code: '{"code": 123}'
        }
    }
})
</script>