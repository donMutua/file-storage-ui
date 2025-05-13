"use client"

import { useState } from "react"
import { X, Plus, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SharingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileName: string
}

// Permission options
const permissionOptions = [
  { value: "view", label: "View", description: "Can view and download" },
  { value: "comment", label: "Comment", description: "Can view and comment" },
  { value: "edit", label: "Edit", description: "Can view, edit, and comment" },
]

// Mock user data for People tabs
const sharedWith = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    permission: "edit",
    avatar: "SJ",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    permission: "view",
    avatar: "MC",
  },
]

export function SharingDialog({ open, onOpenChange, fileName }: SharingDialogProps) {
  const [email, setEmail] = useState("")
  const [permission, setPermission] = useState("view")
  const [message, setMessage] = useState("")
  const [emailError, setEmailError] = useState("")

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleAddEmail = () => {
    if (!email) {
      setEmailError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email")
      return
    }

    // In a real application, you would add the email to a list
    // For now, we'll just clear the input
    setEmail("")
    setEmailError("")
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
                      className={cn(emailError && "border-red-500")}
                    />
                    {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
                  </div>

                  <Select value={permission} onValueChange={setPermission}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Permission" />
                    </SelectTrigger>
                    <SelectContent>
                      {permissionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button onClick={handleAddEmail} className="shrink-0">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            {sharedWith.length > 0 && (
              <div className="space-y-2 rounded-md border p-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">People with access</h3>
                </div>
                <div className="divide-y">
                  {sharedWith.map((user) => (
                    <div key={user.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select defaultValue={user.permission}>
                          <SelectTrigger className="h-8 w-24">
                            <SelectValue placeholder="Permission" />
                          </SelectTrigger>
                          <SelectContent>
                            {permissionOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
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
            )}
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Anyone with the link</Label>
                <Badge variant="outline" className="text-green-500 border-green-500">
                  Active
                </Badge>
              </div>

              <div className="flex gap-2">
                <Select defaultValue="view">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Permission" />
                  </SelectTrigger>
                  <SelectContent>
                    {permissionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span>{option.label}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 rounded-md border p-2">
                <Input
                  readOnly
                  value="https://cloudvault.example.com/s/a1b2c3d4e5f6g7h8i9j0"
                  className="border-0 bg-transparent"
                />
                <Button variant="outline" size="sm" className="shrink-0">
                  Copy
                </Button>
              </div>

              <div className="flex items-start gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-2 text-yellow-800 dark:border-yellow-500/30 dark:bg-yellow-950/50 dark:text-yellow-500">
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
