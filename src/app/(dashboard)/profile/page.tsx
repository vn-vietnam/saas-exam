'use client'

import { AuthCheck } from "@/components/auth-check"

export default function ProfilePage() {
  return (
    <AuthCheck>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>View and edit your profile information here. This page is protected and only visible to authenticated users.</p>
      </div>
    </AuthCheck>
  )
} 