"use client"

import { useState } from "react"
import {
  FileText,
  ImageIcon,
  Film,
  FileArchive,
  File,
  MoreVertical,
  Grid,
  List,
  Download,
  Trash,
  UserPlus,
  Pencil,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define file types and their icons
const fileTypeIcons = {
  doc: FileText,
  image: ImageIcon,
  video: Film,
  archive: FileArchive,
  other: File,
}

interface FileItem {
  id: string
  name: string
  type: keyof typeof fileTypeIcons
  size: string
  modified: string
  shared: boolean
}

interface FileGridProps {
  files: FileItem[]
  folders: { id: string; name: string }[]
}

export function FileGridView({ files, folders }: FileGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("name")

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const isSelected = (id: string) => selectedItems.includes(id)

  // Function to get the appropriate icon for a file type
  const FileIcon = ({ type }: { type: keyof typeof fileTypeIcons }) => {
    const IconComponent = fileTypeIcons[type]
    return <IconComponent className="h-5 w-5" />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="modified">Last modified</SelectItem>
              <SelectItem value="size">Size</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="size-8"
          >
            <Grid className="size-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="size-8"
          >
            <List className="size-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-4 py-2">
          <span className="text-sm font-medium">{selectedItems.length} selected</span>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline">
              <Download className="mr-2 size-4" />
              Download
            </Button>
            <Button size="sm" variant="outline" className="text-red-500">
              <Trash className="mr-2 size-4" />
              Delete
            </Button>
            <Button size="sm" variant="outline">
              <UserPlus className="mr-2 size-4" />
              Share
            </Button>
          </div>
        </div>
      )}

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={cn(
                "group relative flex flex-col items-center rounded-lg border p-4 transition-colors",
                isSelected(folder.id) && "border-primary bg-primary/10",
              )}
              onClick={() => toggleItemSelection(folder.id)}
            >
              <div className="mb-2 rounded-md bg-primary/10 p-2 text-primary">
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
              </div>
              <span className="text-center text-sm font-medium truncate w-full">{folder.name}</span>
              <div className="absolute right-2 top-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 h-7 w-7"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="mr-2 size-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="mr-2 size-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      <Trash className="mr-2 size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {files.map((file) => (
            <div
              key={file.id}
              className={cn(
                "group relative flex flex-col items-center rounded-lg border p-4 transition-colors",
                isSelected(file.id) && "border-primary bg-primary/10",
              )}
              onClick={() => toggleItemSelection(file.id)}
            >
              <div className="mb-2 rounded-md bg-muted p-2">
                <FileIcon type={file.type} />
              </div>
              <span className="text-center text-sm font-medium truncate w-full">{file.name}</span>
              <span className="text-xs text-muted-foreground">{file.size}</span>
              {file.shared && (
                <div className="absolute left-2 top-2">
                  <UserPlus className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
              <div className="absolute right-2 top-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 h-7 w-7"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 size-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 size-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="mr-2 size-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      <Trash className="mr-2 size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border">
          <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-2 text-xs font-medium text-muted-foreground">
            <div className="col-span-6">Name</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className={cn(
                  "group grid grid-cols-12 items-center gap-4 p-2 hover:bg-muted/50",
                  isSelected(folder.id) && "bg-primary/10",
                )}
                onClick={() => toggleItemSelection(folder.id)}
              >
                <div className="col-span-6 flex items-center gap-2">
                  <div className="shrink-0 text-primary">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">{folder.name}</span>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">-</div>
                <div className="col-span-2 text-sm text-muted-foreground">-</div>
                <div className="col-span-2 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 h-7 w-7"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 size-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 size-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
            {files.map((file) => (
              <div
                key={file.id}
                className={cn(
                  "group grid grid-cols-12 items-center gap-4 p-2 hover:bg-muted/50",
                  isSelected(file.id) && "bg-primary/10",
                )}
                onClick={() => toggleItemSelection(file.id)}
              >
                <div className="col-span-6 flex items-center gap-2">
                  <div className="shrink-0">
                    <FileIcon type={file.type} />
                  </div>
                  <span className="font-medium">{file.name}</span>
                  {file.shared && <UserPlus className="ml-1 h-3.5 w-3.5 text-muted-foreground" />}
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">{file.modified}</div>
                <div className="col-span-2 text-sm text-muted-foreground">{file.size}</div>
                <div className="col-span-2 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 h-7 w-7"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="mr-2 size-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 size-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 size-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
