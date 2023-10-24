<template>
    <highlightjs class="code-view" language="json" :code="jsonCode"></highlightjs>
</template>
  
<script lang="ts">
import 'highlight.js/styles/stackoverflow-light.css';
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";

export default {
    name: 'code-view',
    props: {
        jsonCode: {
            type: String,
            required: true
        }
    },
    components: {
        highlightjs: hljsVuePlugin.component
    }
}
</script>
<style scoped>
.code-view {
    border: 1px solid #dde2e8;
}
</style>