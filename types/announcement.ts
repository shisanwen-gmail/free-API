export interface Announcement {
  id: string
  title: string
  content: string
  apiPath: string // 新增：每个公告的专属 API 路径
  createdAt: string
  updatedAt: string
}

export interface AnnouncementInput {
  title: string
  content: string
}

