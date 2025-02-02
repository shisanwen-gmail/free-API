import type { Announcement, AnnouncementInput } from "@/types/announcement"

const announcements: Announcement[] = []

// 生成唯一的 API 路径
function generateApiPath(): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export function getAnnouncements(): Announcement[] {
  return announcements
}

export function getAnnouncementByPath(apiPath: string): Announcement | undefined {
  return announcements.find((a) => a.apiPath === apiPath)
}

export function createAnnouncement(input: AnnouncementInput): Announcement {
  const announcement: Announcement = {
    id: Math.random().toString(36).substring(7),
    apiPath: generateApiPath(), // 生成唯一的 API 路径
    title: input.title,
    content: input.content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  announcements.push(announcement)
  return announcement
}

export function updateAnnouncement(id: string, input: AnnouncementInput): Announcement | null {
  const index = announcements.findIndex((a) => a.id === id)
  if (index === -1) return null

  const announcement = {
    ...announcements[index],
    ...input,
    updatedAt: new Date().toISOString(),
  }
  announcements[index] = announcement
  return announcement
}

export function deleteAnnouncement(id: string): boolean {
  const index = announcements.findIndex((a) => a.id === id)
  if (index === -1) return false

  announcements.splice(index, 1)
  return true
}

