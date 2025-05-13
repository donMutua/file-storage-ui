import { Grid, List, Filter, FileText, ImageIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarredFileCard } from "@/components/starred-file-card"

export default function StarredPage() {
  // Mock data for starred files
  const starredFiles = [
    {
      name: "Important Project",
      type: "doc",
      date: "Jan 25, 2023",
      size: "4.2 MB",
      icon: <FileText className="h-10 w-10 text-blue-500" />,
    },
    {
      name: "Client Presentation",
      type: "doc",
      date: "Jan 22, 2023",
      size: "8.7 MB",
      icon: <FileText className="h-10 w-10 text-purple-500" />,
    },
    {
      name: "Product Mockups",
      type: "image",
      date: "Jan 20, 2023",
      size: "12.5 MB",
      icon: <ImageIcon className="h-10 w-10 text-pink-500" />,
    },
    {
      name: "Annual Report",
      type: "doc",
      date: "Jan 18, 2023",
      size: "5.1 MB",
      icon: <FileText className="h-10 w-10 text-green-500" />,
    },
  ]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111418]">Starred</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 border-[#e5e8eb]">
            <Grid className="h-4 w-4 text-[#637588]" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 border-[#e5e8eb]">
            <List className="h-4 w-4 text-[#637588]" />
          </Button>
          <Button variant="outline" size="sm" className="border-[#e5e8eb] text-[#637588]">
            <Filter className="mr-2 h-4 w-4" /> Filter
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
            value="images"
            className="data-[state=active]:bg-[#f0f2f4] data-[state=active]:text-[#111418] data-[state=active]:shadow-none"
          >
            Images
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="data-[state=active]:bg-[#f0f2f4] data-[state=active]:text-[#111418] data-[state=active]:shadow-none"
          >
            Videos
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {starredFiles.map((file, index) => (
          <Link key={index} href={`/file-preview/${encodeURIComponent(file.name)}`}>
            <StarredFileCard file={file} />
          </Link>
        ))}
      </div>
    </div>
  )
}
