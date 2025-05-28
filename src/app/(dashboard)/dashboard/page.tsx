'use client'

import { AuthCheck } from "@/components/auth-check"

export default function DashboardPage() {
  return (
    <AuthCheck>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard! This page is protected and only visible to authenticated users.</p>
      </div>
    </AuthCheck>
  )
}
