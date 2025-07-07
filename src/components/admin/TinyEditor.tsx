import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";

interface TinyEditorProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function TinyEditor({ id, name, value, onChange }: TinyEditorProps) {

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  return (
    <Editor
      id={id}
      value={value}
      apiKey="tvcjnmlz3ns39brdnx2zv4p9a6v4dved23mbc0ump0ivzucd"
      init={{
        plugins: "code",
        toolbar: "code",
        content_style: isDark
      ? `
        body {
          background-color: black;
          color: white;
        }
      `
      : `
        body {
          background-color: white;
          color: black;
        }
      `,
        height: 400,
        setup: (editor:any) => {
          editor.on("init", () => {
            if (name) {
              editor.getElement()?.setAttribute("name", name);
            }
          });
        },
      }}
      onEditorChange={(content) => onChange(content)}
    />
  );
}
