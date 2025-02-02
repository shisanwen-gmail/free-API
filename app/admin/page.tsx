import { getAnnouncements } from "@/lib/store"
import { AnnouncementForm } from "./announcement-form"
import { AnnouncementList } from "./announcement-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  const announcements = getAnnouncements()
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/announcements`
    : "http://localhost:3000/api/announcements"

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API 端点</CardTitle>
            <CardDescription>使用以下 API 端点获取公告数据</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div>
                <h3 className="font-semibold">获取所有公告:</h3>
                <code className="text-sm">{baseUrl}</code>
              </div>
              <div>
                <h3 className="font-semibold">获取单个公告:</h3>
                <code className="text-sm">{baseUrl}/[id]</code>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>添加新公告</CardTitle>
          </CardHeader>
          <CardContent>
            <AnnouncementForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>公告列表</CardTitle>
          </CardHeader>
          <CardContent>
            <AnnouncementList announcements={announcements} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

