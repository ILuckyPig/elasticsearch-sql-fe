<template>
  <div class="sql-editor">
    <codemirror class="code-mirror" :style="{ height: '100%' }" v-model="code" :extenstions="extenstions"
      :autofocus="true" :indent-with-tab="true" :tab-size="2">
    </codemirror>
  </div>
</template>
<script lang="ts">
import { basicSetup } from 'codemirror'
import { defineComponent, onMounted, shallowRef, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { sql } from '@codemirror/lang-sql'

export default defineComponent({
  name: 'sql-editor',
  title: 'sql-editor',
  props: {
    code: {
      type: String,
      required: true
    }
  },
  components: {
    Codemirror
  },
  setup(props) {
    const code = shallowRef(props.code)
    const extenstions = [basicSetup, sql]

    onMounted(() => {
      watch(
        () => props.code,
        (_code) => {
          code.value = _code
        }
      )
    })

    return {
      code,
      extenstions
    }
  }
})
</script>
<style scoped>
.sql-editor {
  width: 100%;
  height: 100%;
  outline: none;
}

.code-mirror {
  width: 100%;
}

.cm-editor {
  outline: none;
}
</style>