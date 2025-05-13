import { Search, Grid, List, Filter, FileText, ImageIcon, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/sidebar"
import { Avatar } from "@/components/ui/avatar"

export default function StarredPage() {
  return (
    <div className="flex min-h-screen bg-[#ffffff]">
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <header className="border-b border-[#e5e8eb] bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#637587]" />
              <Input
                type="search"
                placeholder="Search starred files"
                className="w-full rounded-full border-[#e5e8eb] bg-[#f0f2f5] pl-9 text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <Button className="rounded-full bg-[#1a80e5] px-4 text-white hover:bg-[#1a80e5]/90">New</Button>
              <Avatar />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#121417]">Starred</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 border-[#e5e8eb]">
                <Grid className="h-4 w-4 text-[#637587]" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 border-[#e5e8eb]">
                <List className="h-4 w-4 text-[#637587]" />
              </Button>
              <Button variant="outline" size="sm" className="border-[#e5e8eb] text-[#637587]">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="bg-transparent">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#f0f2f5] data-[state=active]:text-[#121417] data-[state=active]:shadow-none"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:bg-[#f0f2f5] data-[state=active]:text-[#121417] data-[state=active]:shadow-none"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="data-[state=active]:bg-[#f0f2f5] data-[state=active]:text-[#121417] data-[state=active]:shadow-none"
              >
                Images
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="data-[state=active]:bg-[#f0f2f5] data-[state=active]:text-[#121417] data-[state=active]:shadow-none"
              >
                Videos
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
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
            ].map((file, index) => (
              <div
                key={index}
                className="group relative flex flex-col rounded-lg border border-[#e5e8eb] p-4 transition-all hover:shadow-md"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-[#f0f2f5]">
                  {file.icon}
                </div>
                <h3 className="font-medium text-[#121417]">{file.name}</h3>
                <p className="text-sm text-[#637587]">
                  {file.date} • {file.size}
                </p>

                <Button variant="ghost" size="icon" className="absolute right-2 top-2 text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                </Button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
