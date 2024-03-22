'use client';
import { type Snippet } from '@prisma/client';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import { updateSnippet } from '@/actions';

export default function SnippedEditForm({ snippet }: { snippet: Snippet }) {
  const [code, setCode] = useState<string>(snippet.code);

  function handleEditorChange(value: string = '') {
    setCode(value);
  }

  async function handleSave() {
    updateSnippet({ code, id: snippet.id });
  }

  return (
    <div>
      <button onClick={handleSave}>save</button>
      <Editor
        className="mt-4"
        height="40vh"
        theme="vs-dark"
        language="typescript"
        defaultValue={code}
        onChange={handleEditorChange}
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  );
}
