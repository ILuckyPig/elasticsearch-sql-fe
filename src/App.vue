<template>
  <n-card class="sql-workspace">
    <n-card class="sql-region">
      <n-card class="sql-item-edit">
        <n-card class="workspace-left"></n-card>
        <n-card class="workspace-right">
          <code-editor v-model="code"></code-editor>
        </n-card>
      </n-card>
      <n-card class="buttons">
        <n-button class="button-item" type="info" @click="onExplain">
          <span>Explain</span>
        </n-button>
        <n-button class="button-item" type="success" @click="onSelect">
          <span>Select</span>
        </n-button>
      </n-card>
    </n-card>
  </n-card>
  <n-divider />
  <ResultTable></ResultTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CodeEditor from './components/sql-editor.vue'
import { NButton } from 'naive-ui'
import ResultTable from './components/result-table.vue'

const code = ref('')

function onExplain() {
  console.log('explain: ', code.value)
}

function onSelect() {
  console.log('select: ', code.value)
}
</script>

<style scoped>
.sql-workspace {
  background-color: #f9fafc;
  border-left: 1px solid #dde2e8;
  border-right: 1px solid #dde2e8;
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* overflow: hidden; */
  /* padding: 0 20px; */
}

.sql-region {
  margin: 10px;
}

.sql-item-edit {
  display: flex;
  height: 62vh;
  font-size: 14px;
  font-family: Menlo-Regular, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", monospace;
  /* flex: 1;
  height: calc(100% - 90px);
  overflow: hidden;
  padding: 0 20px; */
}

.workspace-left {
  /* border-right: none; */
  /* height: calc(100% - 2px); */
  min-width: 440px;
  width: 28%;
}

.workspace-right {
  border: 1px solid #dde2e8;
  flex: 1;
  /* height: calc(100% - 2px); */
  width: 71.9%;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  /* text-align: right; */
  /*padding: 10px 20px;
  min-height: 52px;
  width: 100%; */
}

.button-item {
  /* display: inline-block; */
  /*margin-left: 12px; */
}
</style>