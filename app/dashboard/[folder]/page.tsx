"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import { FileGridView } from "@/components/dashboard/file-grid-view"
import { UploadDialog } from "@/components/dashboard/upload-dialog"
import { BreadcrumbNavigation } from "@/components/dashboard/breadcrumb-navigation"
import { CreateFolderDialog } from "@/components/dashboard/create-folder-dialog"
import { SharingDialog } from "@/components/dashboard/sharing-dialog"

// Mock data that would normally come from the backend
const folderData = {
  documents: {
    name: "Documents",
    files: [
      { id: "doc-1", name: "Resume.pdf", type: "doc", size: "1.2 MB", modified: "Jul 14, 2023", shared: false },
      { id: "doc-2", name: "Contract.docx", type: "doc", size: "0.8 MB", modified: "Jul 10, 2023", shared: true },
      { id: "doc-3", name: "Instructions.pdf", type: "doc", size: "2.4 MB", modified: "Jul 5, 2023", shared: false },
    ],
    folders: [
      { id: "subfolder-1", name: "Work" },
      { id: "subfolder-2", name: "Personal" },
    ],
    path: [{ name: "Documents", href: "/dashboard/documents" }],
  },
  images: {
    name: "Images",
    files: [
      { id: "img-1", name: "Vacation.jpg", type: "image", size: "3.5 MB", modified: "Jun 28, 2023", shared: true },
      { id: "img-2", name: "Screenshot.png", type: "image", size: "0.5 MB", modified: "Jun 25, 2023", shared: false },
      { id: "img-3", name: "Profile.jpg", type: "image", size: "1.1 MB", modified: "Jun 20, 2023", shared: false },
      { id: "img-4", name: "Banner.png", type: "image", size: "2.3 MB", modified: "Jun 18, 2023", shared: true },
    ],
    folders: [
      { id: "subfolder-1", name: "Family" },
      { id: "subfolder-2", name: "Travel" },
      { id: "subfolder-3", name: "Work" },
    ],
    path: [{ name: "Images", href: "/dashboard/images" }],
  },
  videos: {
    name: "Videos",
    files: [
      { id: "vid-1", name: "Presentation.mp4", type: "video", size: "24.2 MB", modified: "Jul 8, 2023", shared: true },
      { id: "vid-2", name: "Tutorial.mp4", type: "video", size: "45.8 MB", modified: "Jun 30, 2023", shared: false },
    ],
    folders: [
      { id: "subfolder-1", name: "Tutorials" },
      { id: "subfolder-2", name: "Recordings" },
    ],
    path: [{ name: "Videos", href: "/dashboard/videos" }],
  },
}

export default function FolderPage() {
  const params = useParams()
  const folderId = params.folder as string

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false)
  const [sharingDialogOpen, setSharingDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState("")

  // Get folder data based on the folderId
  const folder = folderData[folderId as keyof typeof folderData] || {
    name: "Unknown Folder",
    files: [],
    folders: [],
    path: [{ name: folderId, href: `/dashboard/${folderId}` }],
  }

  const handleOpenSharingDialog = (fileName: string) => {
    setSelectedFile(fileName)
    setSharingDialogOpen(true)
  }

  return (
    <div className="container space-y-6 py-6">
      <BreadcrumbNavigation
        path={folder.path}
        onOpenUploadDialog={() => setUploadDialogOpen(true)}
        onOpenNewFolderDialog={() => setNewFolderDialogOpen(true)}
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{folder.name}</h2>
        <FileGridView files={folder.files} folders={folder.folders} />
      </div>

      {/* Dialogs */}
      <UploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} currentFolder={folder.name} />

      <CreateFolderDialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen} currentPath={folder.name} />

      <SharingDialog open={sharingDialogOpen} onOpenChange={setSharingDialogOpen} fileName={selectedFile} />
    </div>
  )
}
