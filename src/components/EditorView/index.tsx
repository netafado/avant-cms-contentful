"use client";
import MDEditor from "@uiw/react-md-editor";
export const EditorView = ({ markdown }: { markdown: string }) => {
  return (
    <div className="mt-2">
      <MDEditor.Markdown
        className="bg-clip-text bg-white/5 rounded-sm wmde-markdown wmde-markdown-color"
        source={markdown}
      />
    </div>
  );
};

export default EditorView;
