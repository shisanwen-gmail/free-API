import { NextResponse } from "next/server"
import { getAnnouncementByPath } from "@/lib/store"

// GET /api/announcement/[path]
export async function GET(request: Request, { params }: { params: { path: string } }) {
  const announcement = getAnnouncementByPath(params.path)
  if (!announcement) {
    return new NextResponse("Not Found", { status: 404 })
  }
  return NextResponse.json(announcement)
}

