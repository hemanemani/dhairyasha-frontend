"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axiosInstance from "@/lib/axios"

type FileUploadProps = {
  fieldName: string;
  onUpload?: (field: string, uploadedUrl: string) => void;
  initialUrl?: string;

}

export function FileUpload({ fieldName, onUpload, initialUrl }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(initialUrl || null)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
  setPreview(initialUrl || null);
}, [initialUrl]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (uploaded) {
      setFile(uploaded)
      setPreview(URL.createObjectURL(uploaded))
      setUploadStatus(null);
    }
  }

  const handleRemoveImage = () => {
    setPreview(null);
    setFile(null);
    setUploadStatus(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };



  const handleUploadToServer = async () => {
    if (!file) return;
    setUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append(fieldName, file);
    formData.append("_method", "PUT");

    try {
      const token = localStorage.getItem("authToken");
      const res = await axiosInstance.post("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      const uploadedUrl = data.data?.[fieldName];

      if (uploadedUrl) {
        setPreview(uploadedUrl);
        setUploadStatus("Uploaded");
        if (onUpload) {
          onUpload(fieldName, uploadedUrl);
        }
      } else {
        setUploadStatus("⚠️ Upload succeeded, but URL not found");
        console.error("Upload succeeded, but URL not found in response");
      }
    } catch (error) {
      setUploadStatus("❌ Upload Failed");
      console.error("Upload error", error);
    } finally {
      setUploading(false);
    }
  };



 

  return (
    <div className="space-y-2 border p-4 rounded-md">
      <Label htmlFor={fieldName}>{fieldName}</Label>
      <Input
        id={fieldName}
        type="file"
        name={fieldName}
        onChange={handleChange}
        disabled={uploading}
      />
      {preview && (
        <div className="mt-4 relative inline-block">
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center z-10"
            title="Remove Image"
          >
            ✖
          </button>
        <img
          src={preview}
          alt="preview"
          className="h-24 w-auto rounded border"
          onClick={handleRemoveImage}
        />
        <button
          onClick={handleUploadToServer}
          disabled={uploading}
          type="button"
          className="bg-black dark:bg-[#fff] dark:text-black px-4 text-white capitalize text-[15px] h-[40px] rounded-sm mt-2 font-inter-semibold cursor-pointer"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {uploadStatus && (
            <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
              {uploadStatus}
            </p>
          )}

        </div>
      )}
    </div>
  )
}
