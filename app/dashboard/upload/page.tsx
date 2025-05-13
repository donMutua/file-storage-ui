import { Upload, X, FileText, File } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  // Mock data for uploading files
  const uploadingFiles = [
    {
      name: "project-planning.pptx",
      size: "17.4 MB",
      progress: 100,
      date: "May 12",
    },
    {
      name: "quarterly-report.docx",
      size: "5.2 MB",
      progress: 100,
      date: "May 10",
    },
    {
      name: "marketing-assets.zip",
      size: "42.8 MB",
      progress: 65,
      date: "May 12",
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111418] mb-2">Upload files</h1>
        <p className="text-[#637588]">Drag files here or use the New button</p>
      </div>

      <div className="mb-8 rounded-lg border-2 border-dashed border-[#e5e8eb] p-10">
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="mb-4 h-12 w-12 text-[#637588]" />
          <h2 className="mb-2 text-xl font-semibold text-[#111418]">Drag and drop your files here</h2>
          <p className="mb-4 text-[#637588]">or</p>
          <Button className="rounded-xl bg-[#1980e6] px-4 text-white hover:bg-[#1980e6]/90">Browse files</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#111418]">Recent</h2>

        {uploadingFiles.map((file, index) => (
          <div key={index} className="flex items-start gap-4 rounded-lg border border-[#e5e8eb] p-4 hover:bg-[#f0f2f4]">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#f0f2f4]">
              {file.name.endsWith(".pptx") ? (
                <FileText className="h-6 w-6 text-orange-500" />
              ) : file.name.endsWith(".docx") ? (
                <FileText className="h-6 w-6 text-blue-500" />
              ) : (
                <File className="h-6 w-6 text-green-500" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#111418]">{file.name}</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#637588]">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-1">
                <div className="flex items-center justify-between text-xs text-[#637588]">
                  <span>
                    {file.size} • {file.date}
                  </span>
                  <span>{file.progress === 100 ? "Complete" : `${file.progress}%`}</span>
                </div>
                <Progress
                  value={file.progress}
                  className="mt-1 h-1 bg-[#e5e8eb]"
                  indicatorClassName={file.progress === 100 ? "bg-green-500" : "bg-[#1980e6]"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
