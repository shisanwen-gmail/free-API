"use server"

import { revalidatePath } from "next/cache"
import { createAnnouncement, updateAnnouncement, deleteAnnouncement } from "@/lib/store"
import type { AnnouncementInput } from "@/types/announcement"

export async function createAnnouncementAction(input: AnnouncementInput) {
  const announcement = createAnnouncement(input)
  revalidatePath("/admin")
  return announcement
}

export async function updateAnnouncementAction(id: string, input: AnnouncementInput) {
  const announcement = updateAnnouncement(id, input)
  revalidatePath("/admin")
  return announcement
}

export async function deleteAnnouncementAction(id: string) {
  const success = deleteAnnouncement(id)
  revalidatePath("/admin")
  return success
}

