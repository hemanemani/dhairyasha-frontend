"use client"

import { Editor } from "@tinymce/tinymce-react"
import { useRef } from "react"
import { useTheme } from "next-themes"
import { Editor as TinyMCEEditor } from "tinymce";



interface HtmlEditorProps {
  id: string
  initialValue?: string
}


export default function HtmlEditor({
    id,
    initialValue = "<p>Welcome to your admin panel</p>",
    }:HtmlEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const { theme } = useTheme()

  const contentStyle =
    theme === "dark"
      ? "body { background-color: #000; color: #fff; }"
      : "body { background-color: #fff; color: #000; }"


  return (
    <div className="space-y-4">
      <Editor
        id={id}
        apiKey="tvcjnmlz3ns39brdnx2zv4p9a6v4dved23mbc0ump0ivzucd"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist autolink lists link charmap preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
          content_style: contentStyle,
        }}
      />
    </div>
  )
}
