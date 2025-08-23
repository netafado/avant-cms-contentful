"use client";

import "./styles.css";
import MDEditor from "@uiw/react-md-editor";
export const EditorView = ({ markdown }: { markdown: string }) => {
  return (
    <div className="mt-2">
      <MDEditor.Markdown
        className="bg-white rounded-sm wmde-markdown-custom"
        source={markdown}
      />
    </div>
  );
};

export default EditorView;
