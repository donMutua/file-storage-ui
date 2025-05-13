import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileCard } from "@/components/file-card"
import { FolderCard } from "@/components/folder-card"

export default function MyDrivePage() {
  // Mock data for folders
  const folders = [
    { id: "folder-1", name: "Documents" },
    { id: "folder-2", name: "Images" },
    { id: "folder-3", name: "Videos" },
    { id: "folder-4", name: "Projects" },
    { id: "folder-5", name: "Backups" },
  ]

  // Mock data for files
  const files = [
    {
      name: "Business Plan.docx",
      type: "doc",
      date: "Jan 20, 2023",
      size: "2.8 MB",
    },
    {
      name: "UI Design Spec.pdf",
      type: "pdf",
      date: "Jan 20, 2023",
      size: "2.8 MB",
    },
    {
      name: "UX Research Report.docx",
      type: "doc",
      date: "Jan 20, 2023",
      size: "2.8 MB",
    },
    {
      name: "Product Requirements.docx",
      type: "doc",
      date: "Jan 20, 2023",
      size: "2.8 MB",
    },
    {
      name: "Mobile App Wireframes.png",
      type: "image",
      date: "Jan 20, 2023",
      size: "2.8 MB",
    },
    {
      name: "Product Demo.mp4",
      type: "video",
      date: "Jan 20, 2023",
      size: "24.5 MB",
    },
    {
      name: "Customer Survey.form",
      type: "form",
      date: "Jan 20, 2023",
      size: "1.2 MB",
    },
    {
      name: "Sales Data.xlsx",
      type: "sheet",
      date: "Jan 20, 2023",
      size: "3.5 MB",
    },
  ]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111418]">My Drive</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-[#e5e8eb] text-[#637588]">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5H21V7H3V5ZM3 11H21V13H3V11ZM3 17H21V19H3V17Z" fill="currentColor" />
            </svg>
            List
          </Button>
          <Button variant="outline" size="sm" className="border-[#e5e8eb] text-[#637588]">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 3V9H9V3H3ZM7 7H5V5H7V7ZM3 11V17H9V11H3ZM7 15H5V13H7V15ZM11 3V9H17V3H11ZM15 7H13V5H15V7ZM11 11V17H17V11H11ZM15 15H13V13H15V15Z"
                fill="currentColor"
              />
            </svg>
            Grid
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-transparent">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[#f0f2f4] data-[state=active]:text-[#111418] data-[state=active]:shadow-none"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="data-[state=active]:bg-[#f0f2f4] data-[state=active]:text-[#111418] data-[state=active]:shadow-none"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger
            value="spreadsheets"
            className="data-[state=active]:bg-[#f0f2f4] data-[state=active]:text-[#111418] data-[state=active]:shadow-none"
          >
            Spreadsheets
          </TabsTrigger>
          <TabsTrigger
            value="presentations"
            className="data-[state=active]:bg-[#f0f2f4] data-[state=active]:text-[#111418] data-[state=active]:shadow-none"
          >
            Presentations
          </TabsTrigger>
          <TabsTrigger
            value="images"
            className="data-[state=active]:bg-[#f0f2f4] data-[state=active]:text-[#111418] data-[state=active]:shadow-none"
          >
            Images
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {folders.map((folder) => (
          <Link key={folder.id} href={`/dashboard/folder/${folder.id}`}>
            <FolderCard folder={folder} />
          </Link>
        ))}

        {files.map((file, index) => (
          <Link key={index} href={`/file-preview/${encodeURIComponent(file.name)}`}>
            <FileCard file={file} />
          </Link>
        ))}
      </div>
    </div>
  )
}
