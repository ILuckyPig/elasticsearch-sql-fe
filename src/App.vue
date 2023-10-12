<template>
  <div class="sql-workspace">
    <div class="sql-region">
      <div class="sql-item-edit">
        <div class="workspace-left"></div>
        <div class="workspace-right">
          <code-editor v-model="code"></code-editor>
        </div>
      </div>
      <div class="buttons">
        <n-button class="button-item" type="info" @click="onExplainClick">
          <span>Explain</span>
        </n-button>
        <n-button class="button-item" type="success" @click="onSelect">
          <span>Select</span>
        </n-button>
      </div>
    </div>
  </div>
  <n-divider />
  <div>
    <!-- <result-table ref="resultTable"></result-table> -->
    <!-- <result-explain ref="resultExplain"></result-explain> -->
    <n-code class="result-code" v-if="showExplainResult" :code="explainResultCode" language="json"></n-code>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NDivider } from 'naive-ui'
import CodeEditor from './components/sql-editor.vue'
// import ResultTable from './components/result-table.vue'
import { NCode } from 'naive-ui'
import { explain } from './services/api'

const code = ref('')
const showExplainResult = ref(false);
// const resultTable = ref()
const explainResultCode = ref('')

function onExplainClick() {
  const sqlVO: SqlVO = { url: 'http://localhost:9200/', sql: code.value }
  const response = explain('/explain', sqlVO)
  response
    .then(res => {
      console.log(res)
      explainResultCode.value = JSON.stringify(res.data.body, null, 2)
    })
    .catch(err => {
      explainResultCode.value = err
    })
  showExplainResult.value = true
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

.result-code {
  height: 100px;
}
</style>