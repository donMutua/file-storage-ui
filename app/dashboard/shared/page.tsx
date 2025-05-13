import { Grid, List, Filter, FileText, ImageIcon, FileVideo } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SharedFileCard } from "@/components/shared-file-card"

export default function SharedPage() {
  // Mock data for shared files
  const sharedFiles = [
    {
      name: "Team Project Plan",
      type: "doc",
      date: "Jan 20, 2023",
      size: "2.8 MB",
      sharedBy: "Alex Johnson",
      icon: <FileText className="h-10 w-10 text-blue-500" />,
    },
    {
      name: "Marketing Assets",
      type: "image",
      date: "Jan 18, 2023",
      size: "15.2 MB",
      sharedBy: "Sarah Miller",
      icon: <ImageIcon className="h-10 w-10 text-pink-500" />,
    },
    {
      name: "Product Demo",
      type: "video",
      date: "Jan 15, 2023",
      size: "45.8 MB",
      sharedBy: "David Chen",
      icon: <FileVideo className="h-10 w-10 text-red-500" />,
    },
    {
      name: "Financial Report",
      type: "doc",
      date: "Jan 12, 2023",
      size: "3.4 MB",
      sharedBy: "Emily Wilson",
      icon: <FileText className="h-10 w-10 text-green-500" />,
    },
  ]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111418]">Shared with me</h1>
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
            value="people"
            className="data-[state=active]:bg-[#f0f2f4] data-[state=active]:text-[#111418] data-[state=active]:shadow-none"
          >
            People
          </TabsTrigger>
          <TabsTrigger
            value="links"
            className="data-[state=active]:bg-[#f0f2f4] data-[state=active]:text-[#111418] data-[state=active]:shadow-none"
          >
            Links
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sharedFiles.map((file, index) => (
          <Link key={index} href={`/file-preview/${encodeURIComponent(file.name)}`}>
            <SharedFileCard file={file} />
          </Link>
        ))}
      </div>
    </div>
  )
}
