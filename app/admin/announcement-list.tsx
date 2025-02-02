"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Announcement } from "@/types/announcement"
import { updateAnnouncementAction, deleteAnnouncementAction } from "../actions"
import { CopyIcon, CheckIcon } from "lucide-react"

interface AnnouncementListProps {
  announcements: Announcement[]
}

export function AnnouncementList({ announcements }: AnnouncementListProps) {
  const [editId, setEditId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/announcement`
    : "http://localhost:3000/api/announcement"

  function startEdit(announcement: Announcement) {
    setEditId(announcement.id)
    setEditTitle(announcement.title)
    setEditContent(announcement.content)
  }

  async function handleUpdate(id: string) {
    await updateAnnouncementAction(id, {
      title: editTitle,
      content: editContent,
    })
    setEditId(null)
  }

  async function handleDelete(id: string) {
    if (confirm("确定要删除这条公告吗?")) {
      await deleteAnnouncementAction(id)
    }
  }

  async function copyApiUrl(apiPath: string, id: string) {
    const url = `${baseUrl}/${apiPath}`
    await navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (announcements.length === 0) {
    return <div className="text-center text-muted-foreground">暂无公告</div>
  }

  return (
    <div className="grid gap-4">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="border rounded-lg p-4">
          {editId === announcement.id ? (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="edit-title">标题</label>
                <Input id="edit-title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-content">内容</label>
                <Textarea id="edit-content" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleUpdate(announcement.id)}>保存</Button>
                <Button variant="outline" onClick={() => setEditId(null)}>
                  取消
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-2">
              <h3 className="font-semibold">{announcement.title}</h3>
              <p className="text-muted-foreground">{announcement.content}</p>

              {/* API URL 显示和复制按钮 */}
              <div className="flex items-center gap-2 bg-muted p-2 rounded">
                <code className="text-sm flex-1">{`${baseUrl}/${announcement.apiPath}`}</code>
                <Button variant="ghost" size="icon" onClick={() => copyApiUrl(announcement.apiPath, announcement.id)}>
                  {copiedId === announcement.id ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => startEdit(announcement)}>
                  编辑
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(announcement.id)}>
                  删除
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

