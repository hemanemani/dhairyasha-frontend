"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { API_BASE } from "@/constants/api"

type FileUploadProps = {
  fieldName: string;
  onUpload?: (field: string, uploadedUrl: string) => void;
  initialUrl?: string;

}

export function FileUpload({ fieldName, onUpload, initialUrl }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(initialUrl || null)

  const handleUploadToServer = async()=>{

    if(!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file",file)
    
    try {

      const res = await fetch(`${API_BASE}/upload`,{
        method:"POST",
        body:formData,
        mode: 'cors',
      })

      const data = await res.json();

    if (onUpload) {
      onUpload(fieldName,data.url);
    }
    } catch (error) {
          console.error("Upload error", error);
    }finally {
    setUploading(false);
    }

  }

useEffect(() => {
  setPreview(initialUrl || null);
}, [initialUrl]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (uploaded) {
      setFile(uploaded)
      setPreview(URL.createObjectURL(uploaded))
    }
  }

  return (
    <div className="space-y-2 border p-4 rounded-md">
      <Label htmlFor={fieldName}>{fieldName}</Label>
      <Input
        id={fieldName}
        type="file"
        onChange={handleChange}
        disabled={uploading}
      />
      {preview && (
        <>
        <img
          src={preview}
          alt="preview"
          className="h-24 w-auto rounded border"
        />
        <button
          onClick={handleUploadToServer}
          disabled={uploading}
          className="bg-black dark:bg-[#fff] dark:text-black w-[23%] text-white capitalize text-[15px] h-[40px] rounded-sm mt-2 font-inter-semibold cursor-pointer"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        </>
      )}
    </div>
  )
}
