"use client"
import { FolderPlus, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbNavigationProps {
  path: { name: string; href: string }[]
  onOpenUploadDialog: () => void
  onOpenNewFolderDialog: () => void
}

export function BreadcrumbNavigation({ path, onOpenUploadDialog, onOpenNewFolderDialog }: BreadcrumbNavigationProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">My Drive</BreadcrumbLink>
          </BreadcrumbItem>

          {path.map((item, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbSeparator />
              {index === path.length - 1 ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onOpenNewFolderDialog}>
          <FolderPlus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
        <Button size="sm" onClick={onOpenUploadDialog}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>
    </div>
  )
}
