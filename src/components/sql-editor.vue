<template>
  <div ref="editor" class="editor-area"></div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView, ViewUpdate } from '@codemirror/view';
import { sql } from "@codemirror/lang-sql";

export default {
  name: 'code-editor',
  props: {
    modelValue: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editor = ref();
    const code = ref('');
    onMounted(() => {
      new EditorView({
        state: EditorState.create({
          doc: props.modelValue,
          extensions: [
            basicSetup,
            EditorView.lineWrapping,
            sql(),
            EditorView.updateListener.of((view: ViewUpdate) => {
              if (view.docChanged) {
                const inCode = view.state.doc.toString()
                emit('update:modelValue', inCode);
                code.value = inCode;
              }
            }),
            EditorView.theme({
              // 编辑器总体
              "&": {
                color: "var(--bl-editor-color)",
                backgroundColor: "var(--bl-editor-bg-color)",
                fontSize: '16px',
                height: '62vh'
              }
            }, { dark: false })
          ]
        }),
        parent: editor.value
      });
    });
    return {
      editor,
      code
    }
  }
}
</script>