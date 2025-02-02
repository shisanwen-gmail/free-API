"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createAnnouncementAction } from "../actions"

export function AnnouncementForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await createAnnouncementAction({ title, content })
    setTitle("")
    setContent("")
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="title">标题</label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <label htmlFor="content">内容</label>
        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <Button type="submit">添加公告</Button>
    </form>
  )
}

