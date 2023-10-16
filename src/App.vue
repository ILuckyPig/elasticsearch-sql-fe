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
        <el-button type="primary" @click="onExplain(); loseFocus($event)">Explain</el-button>
        <el-button type="success" @click="onSelect(); loseFocus($event)">Select</el-button>
      </div>
    </div>
    <el-divider />
    <el-table v-show="showStatus == ResultShowStatus.SELECT" :data="data" stripe border>
      <el-table-column v-for="column in columns" :column-key="column.prop" :prop="column.prop" :label="column.label">
      </el-table-column>
    </el-table>
    <div v-show="showStatus == ResultShowStatus.EXPLAIN">123123123124</div>
  </div>

  <!-- <n-code class="result-code" v-if="showExplainResult" :code="explainResultCode" language="json"></n-code> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { explain, query } from './services/api';
import { ElDivider, ElButton, ElTable, ElTableColumn } from 'element-plus';
import CodeEditor from './components/sql-editor.vue';
import { ResultShowStatus } from './services/result-show-status';

const code = ref('');
const showStatus = ref(ResultShowStatus.HIDE);
// const resultTable = ref();
const explainResultCode = ref('');
const columns = ref();
const data = ref();

function onExplain() {
  const sqlVO: SqlVO = { url: 'http://localhost:9200/', sql: code.value };
  const response = explain('/explain', sqlVO);
  response
    .then(res => {
      console.log(res);
      explainResultCode.value = JSON.stringify(res.data.body, null, 2);
    })
    .catch(err => {
      explainResultCode.value = err;
    })
  showStatus.value = ResultShowStatus.EXPLAIN;
}

function onSelect() {
  const sqlVO: SqlVO = { url: 'http://localhost:9200/', sql: code.value };
  const response = query('/query', sqlVO);
  response
    .then(res => {
      console.log(res);
      columns.value = res.data.columns;
      data.value = res.data.tableData;
    })
    .catch(err => {
      console.log(err);
    })
  showStatus.value = ResultShowStatus.SELECT;
}

function loseFocus(event) {
  let target = event.target;
  if (target.nodeName == 'SPAN' || target.nodeName == 'I') {
    target = event.target.parentNode;
  }
  target.blur();
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
}

.sql-region {
  margin: 10px;
}

.sql-item-edit {
  display: flex;
  height: 62vh;
  font-size: 14px;
  font-family: Menlo-Regular, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", monospace;
}

.workspace-left {
  min-width: 440px;
  width: 28%;
}

.workspace-right {
  border: 1px solid #dde2e8;
  flex: 1;
  width: 71.9%;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>