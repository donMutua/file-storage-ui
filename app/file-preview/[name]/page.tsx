"use client"

import { useState } from "react"
import { Search, Download, Share2, Star, Printer, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/sidebar"
import { Avatar } from "@/components/ui/avatar"
import { FileSharingDialog } from "@/components/file-sharing-dialog"

export default function FilePreviewPage() {
  const [sharingDialogOpen, setSharingDialogOpen] = useState(false)
  const params = useParams()
  const fileName = decodeURIComponent(params.name as string)

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <header className="border-b border-[#e5e8eb] bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/my-drive" className="text-[#637588] hover:text-[#111418]">
                <X className="h-5 w-5" />
              </Link>
              <h1 className="text-lg font-medium text-[#111418]">{fileName}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#637588]" />
                <Input
                  type="search"
                  placeholder="Search in document"
                  className="w-64 rounded-full border-[#e5e8eb] bg-[#f0f2f4] pl-9 text-sm"
                />
              </div>
              <Button variant="ghost" size="icon" className="text-[#637588]">
                <Star className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#637588]">
                <Download className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#637588]">
                <Printer className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#637588]" onClick={() => setSharingDialogOpen(true)}>
                <Share2 className="h-5 w-5" />
              </Button>
              <Avatar />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center p-6">
          <div className="mb-4 flex w-full max-w-3xl items-center justify-between">
            <Button variant="outline" size="icon" className="h-8 w-8 border-[#e5e8eb]">
              <ChevronLeft className="h-4 w-4 text-[#637588]" />
            </Button>
            <span className="text-sm text-[#637588]">Page 1 of 5</span>
            <Button variant="outline" size="icon" className="h-8 w-8 border-[#e5e8eb]">
              <ChevronRight className="h-4 w-4 text-[#637588]" />
            </Button>
          </div>

          <div className="w-full max-w-3xl rounded-lg border border-[#e5e8eb] bg-white p-8 shadow-sm">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-[#111418]">{fileName}</h1>
              <p className="text-[#637588]">Cloud.io Inc. - 2023</p>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#111418]">Executive Summary</h2>
              <p className="text-[#637588]">
                Cloud.io is a cloud storage and file management platform designed to help individuals and businesses
                securely store, access, and share their digital assets from anywhere in the world.
              </p>

              <h2 className="text-xl font-semibold text-[#111418]">Market Analysis</h2>
              <p className="text-[#637588]">
                The global cloud storage market is projected to grow at a CAGR of 24.3% from 2023 to 2028, reaching a
                market value of $297.5 billion by 2028. This growth is driven by increasing digital transformation
                initiatives, the rising volume of digital data, and the growing adoption of hybrid and multi-cloud
                strategies.
              </p>

              <h2 className="text-xl font-semibold text-[#111418]">Product Overview</h2>
              <p className="text-[#637588]">
                Cloud.io offers a comprehensive suite of cloud storage and file management solutions, including:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4 text-[#637588]">
                <li>Secure file storage with end-to-end encryption</li>
                <li>Real-time collaboration tools</li>
                <li>Advanced file sharing capabilities</li>
                <li>Automated backup and recovery</li>
                <li>Cross-platform compatibility</li>
              </ul>
            </div>
          </div>
        </main>

        <FileSharingDialog open={sharingDialogOpen} onOpenChange={setSharingDialogOpen} fileName={fileName} />
      </div>
    </div>
  )
}
