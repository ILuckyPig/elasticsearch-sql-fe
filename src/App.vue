<template>
  <div class="sql-workspace">
    <div class="sql-region">
      <div class="sql-item-edit">
        <div class="workspace-left"></div>
        <div class="workspace-right">
          <SqlEditor ref="sqlEditorRef" :code="code"/>
        </div>
      </div>
      <div class="buttons">
        <button class="button-item" @click="onExplain">
          <span>Explain</span>
        </button>
        <button class="button-item" @click="onSelect">
          <span>Select</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SqlEditor from './components/SqlEditor.vue';

const code = ref('')
const sqlEditorRef = ref();

function onExplain() {
  console.log('explain: ', sqlEditorRef.value.code)
}

function onSelect() {
  console.log('select: ', sqlEditorRef.value)
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