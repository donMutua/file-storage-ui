"use client"

import { useState } from "react"
import { X, Plus, Info, Copy, LinkIcon, Mail, Globe, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FileSharingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileName: string
}

export function FileSharingDialog({ open, onOpenChange, fileName }: FileSharingDialogProps) {
  const [email, setEmail] = useState("")
  const [permission, setPermission] = useState("view")
  const [emailError, setEmailError] = useState("")

  const handleAddEmail = () => {
    if (!email) {
      setEmailError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email")
      return
    }

    // In a real app, you would add the email to a list
    setEmail("")
    setEmailError("")
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share "{fileName}"</DialogTitle>
          <DialogDescription>Invite people to view or edit this file</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="people">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="link">Get link</TabsTrigger>
          </TabsList>

          <TabsContent value="people" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setEmailError("")
                      }}
                      className={emailError ? "border-red-500" : ""}
                    />
                    {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
                  </div>

                  <Select value={permission} onValueChange={setPermission}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Permission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">View</SelectItem>
                      <SelectItem value="comment">Comment</SelectItem>
                      <SelectItem value="edit">Edit</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button onClick={handleAddEmail} className="shrink-0">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2 rounded-md border p-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">People with access</h3>
              </div>
              <div className="divide-y">
                {[
                  { name: "Sarah Johnson", email: "sarah@example.com", permission: "edit", avatar: "SJ" },
                  { name: "Michael Chen", email: "michael@example.com", permission: "view", avatar: "MC" },
                ].map((user) => (
                  <div key={user.email} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1980e6] text-sm font-medium text-white">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-[#637588]">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue={user.permission}>
                        <SelectTrigger className="h-8 w-24">
                          <SelectValue placeholder="Permission" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">View</SelectItem>
                          <SelectItem value="comment">Comment</SelectItem>
                          <SelectItem value="edit">Edit</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove user</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-[#637588]" />
                  <Label>Anyone with the link</Label>
                </div>
                <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">Active</div>
              </div>

              <Select defaultValue="view">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Permission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <div>
                        <p className="font-medium">Anyone with the link can view</p>
                        <p className="text-xs text-[#637588]">Anyone who has the link can view this file</p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="edit">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <div>
                        <p className="font-medium">Anyone with the link can edit</p>
                        <p className="text-xs text-[#637588]">Anyone who has the link can edit this file</p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="restricted">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <div>
                        <p className="font-medium">Restricted</p>
                        <p className="text-xs text-[#637588]">Only people you share with can access</p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 rounded-md border p-2">
                <Input readOnly value="https://cloud.io/s/a1b2c3d4e5f6g7h8i9j0" className="border-0 bg-transparent" />
                <Button variant="outline" size="sm" className="shrink-0">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>

              <div className="flex items-start gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-2 text-yellow-800">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-xs">
                  Anyone with this link can access this file according to the permission settings you choose.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Share</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
