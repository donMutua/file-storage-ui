import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface StarredFileCardProps {
  file: {
    name: string
    type: string
    date: string
    size: string
    icon: ReactNode
  }
}

export function StarredFileCard({ file }: StarredFileCardProps) {
  return (
    <div className="group relative flex flex-col rounded-lg border border-[#e5e8eb] p-4 transition-all hover:shadow-md">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-[#f0f2f4]">{file.icon}</div>
      <h3 className="font-medium text-[#111418]">{file.name}</h3>
      <p className="text-sm text-[#637588]">
        {file.date} • {file.size}
      </p>

      <Button variant="ghost" size="icon" className="absolute right-2 top-2 text-yellow-400">
        <Star className="h-5 w-5 fill-current" />
      </Button>
    </div>
  )
}
