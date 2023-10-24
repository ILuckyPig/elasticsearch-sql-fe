<template>
  <div class="sql-workspace">
    <div class="sql-region">
      <div class="sql-item-edit">
        <div class="workspace-left"></div>
        <div class="workspace-right">
          <code-editor :model-value="code"></code-editor>
        </div>
      </div>
      <div class="buttons">
        <el-button type="primary" @click="onExplain(); loseFocus($event)">Explain</el-button>
        <el-button type="success" @click="onSelect(); loseFocus($event)">Select</el-button>
      </div>
    </div>
    <el-divider />
    <div v-show="showStatus == ResultShowStatus.SELECT">
      <result-table :table-data="data" :columns="columns"></result-table>
    </div>
    <!-- <el-table v-show="showStatus == ResultShowStatus.SELECT" :header-cell-style="{background:'#eff2f9'}" :data="data" stripe border>
      <el-table-column v-for="column in columns" :column-key="column.prop" :prop="column.prop" :label="column.label">
      </el-table-column>
    </el-table> -->
    <code-view v-show="showStatus == ResultShowStatus.EXPLAIN" :json-code="explainResult"></code-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { explain, query } from './services/api';
import { ElDivider, ElButton } from 'element-plus';
import { ResultShowStatus } from './services/result-show-status';
import CodeEditor from './components/sql-editor.vue';
import CodeView from "./components/code-view.vue";
import ResultTable from './components/result-table.vue';

const code = ref('');
const showStatus = ref(ResultShowStatus.HIDE);
const explainResult = ref('');
const columns = ref(Array<TableColumn>(0));
const data = ref(Array<Array<string>>(0));

function onExplain() {
  const sqlVO: SqlVO = { url: 'http://localhost:9200/', sql: code.value };
  const response = explain('/explain', sqlVO);
  response
    .then(res => {
      console.log(res);
      explainResult.value = JSON.stringify(res.data.body, null, 2);
    })
    .catch(err => {
      explainResult.value = err;
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

function loseFocus(event: Event) {
  let target = event.target;
  if (target instanceof Element) {
    if (target.nodeName == 'SPAN' || target.nodeName == 'I') {
      target = target.parentNode;
    }
    (target as HTMLElement).blur();
  }
}
</script>

<style scoped>
.sql-workspace {
  /* background-color: #f9fafc; */
  /* border-left: 1px solid #dde2e8; */
  /* border-right: 1px solid #dde2e8; */
  display: flex;
  flex-direction: column;
  padding: 10px;
  /* height: 100vh; */
}

.sql-region {
  padding: 10px;
  border: 1px solid #dde2e8;
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