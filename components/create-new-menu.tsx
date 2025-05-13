"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { FolderIcon, FileIcon, FolderUp } from "lucide-react"
import { CreateFolderDialog } from "@/components/dashboard/create-folder-dialog"

export function CreateNewMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  const handleCreateFolder = () => {
    setIsOpen(false)
    setCreateFolderDialogOpen(true)
  }

  const handleFileUpload = () => {
    setIsOpen(false)
    fileInputRef.current?.click()
  }

  const handleFolderUpload = () => {
    setIsOpen(false)
    folderInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)

      // Dispatch custom event for file upload
      const event = new CustomEvent("filesUploaded", {
        detail: {
          files: selectedFiles.map((file) => ({
            name: file.name,
            size: formatFileSize(file.size),
          })),
        },
      })
      window.dispatchEvent(event as Event)

      // Reset the input
      e.target.value = ""
    }
  }

  const handleFolderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)

      // Dispatch custom event for file upload
      const event = new CustomEvent("filesUploaded", {
        detail: {
          files: selectedFiles.map((file) => ({
            name: file.name,
            size: formatFileSize(file.size),
            path: file.webkitRelativePath,
          })),
        },
      })
      window.dispatchEvent(event as Event)

      // Reset the input
      e.target.value = ""
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Close dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  // Add event listener for clicks outside dropdown
  useState(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        className="rounded-xl bg-[#1980e6] px-4 text-white hover:bg-[#1980e6]/90"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus className="mr-2 h-4 w-4" />
        New
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="py-1">
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100"
              onClick={handleCreateFolder}
            >
              <FolderIcon className="h-5 w-5 text-[#5F6368]" />
              <span>New folder</span>
              <span className="ml-auto text-xs text-gray-500">^C then F</span>
            </button>
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100"
              onClick={handleFileUpload}
            >
              <FileIcon className="h-5 w-5 text-[#5F6368]" />
              <span>File upload</span>
              <span className="ml-auto text-xs text-gray-500">^C then U</span>
            </button>
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100"
              onClick={handleFolderUpload}
            >
              <FolderUp className="h-5 w-5 text-[#5F6368]" />
              <span>Folder upload</span>
              <span className="ml-auto text-xs text-gray-500">^C then I</span>
            </button>
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileInputChange} />
      <input
        type="file"
        ref={folderInputRef}
        className="hidden"
        webkitdirectory=""
        directory=""
        multiple
        onChange={handleFolderInputChange}
      />

      {createFolderDialogOpen && (
        <CreateFolderDialog
          open={createFolderDialogOpen}
          onOpenChange={setCreateFolderDialogOpen}
          currentPath="My Drive"
        />
      )}
    </div>
  )
}
